# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import io

# app = FastAPI()

# # Load the trained model once, when the server starts
# model = tf.keras.models.load_model("coconut_model.keras")

# class_names = [
#     'CCI_Caterpillars',
#     'CCI_Leaflets',
#     'Healthy_Leaves',
#     'WCLWD_DryingofLeaflets',
#     'WCLWD_Flaccidity',
#     'WCLWD_Yellowing'
# ]

# @app.get("/")
# def root():
#     return {"message": "Coconut disease prediction API is running"}

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # Read the uploaded image bytes
#     contents = await file.read()
#     img = Image.open(io.BytesIO(contents)).convert("RGB")
#     img = img.resize((224, 224))

#     img_array = np.array(img, dtype=np.float32)
#     img_array = np.expand_dims(img_array, axis=0)

#     # Run prediction
#     predictions = model.predict(img_array)
#     pred_index = int(np.argmax(predictions[0]))
#     confidence = float(np.max(predictions[0]))

#     return JSONResponse({
#         "disease": class_names[pred_index],
#         "confidence": round(confidence, 4)
#     })

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from ai_service import get_ai_recommendation

import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import io
import base64

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://coconut-disease-detection-theta.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RecommendationRequest(BaseModel):
    disease: str
    severity: str
# ---------------------------------------------------------
# Load model once at startup (not per-request)
# ---------------------------------------------------------
# model = tf.keras.models.load_model("coconut_model.keras")
print("Loading coconut disease model...", flush=True)

model = tf.keras.models.load_model("coconut_model.keras")

print("Coconut disease model loaded successfully!", flush=True)

class_names = [
    'CCI_Caterpillars',
    'CCI_Leaflets',
    'Healthy_Leaves',
    'WCLWD_DryingofLeaflets',
    'WCLWD_Flaccidity',
    'WCLWD_Yellowing'
]

severity_map = {
    "WCLWD_Flaccidity": "Early stage",
    "WCLWD_Yellowing": "Moderate stage",
    "WCLWD_DryingofLeaflets": "Advanced stage",
    "CCI_Leaflets": "Moderate infestation",
    "CCI_Caterpillars": "Active infestation",
    "Healthy_Leaves": "No disease detected"
}

preprocess_input = tf.keras.applications.mobilenet_v2.preprocess_input


# ---------------------------------------------------------
# CCI pixel-based severity (evidence-calibrated thresholds)
# ---------------------------------------------------------
def calculate_cci_severity(img_rgb):
    img_resized = cv2.resize(img_rgb, (300, 300))
    hsv = cv2.cvtColor(img_resized, cv2.COLOR_RGB2HSV)

    sat_mask = cv2.inRange(hsv[:, :, 1], 60, 255)  # exclude background
    leaf_pixel_count = np.sum(sat_mask > 0)

    if leaf_pixel_count < 100:
        return 0.0

    damage_mask = cv2.inRange(hsv[:, :, 0], 4, 18)  # evidence-based damage zone
    damage_mask = cv2.bitwise_and(damage_mask, damage_mask, mask=sat_mask)

    damaged_pixel_count = np.sum(damage_mask > 0)
    severity_percent = (damaged_pixel_count / leaf_pixel_count) * 100
    return round(severity_percent, 1)


def get_severity(pred_class, img_rgb):
    if pred_class in ["CCI_Leaflets", "CCI_Caterpillars"]:
        value = calculate_cci_severity(img_rgb)
        return f"{value}% leaf damage"
    else:
        return severity_map[pred_class]


# ---------------------------------------------------------
# Grad-CAM (explainability heatmap)
# ---------------------------------------------------------
def make_gradcam_heatmap(img_array, model, base_layer_name="mobilenetv2_1.00_224", last_conv_layer_name="out_relu"):
    base_model = model.get_layer(base_layer_name)
    last_conv_layer = base_model.get_layer(last_conv_layer_name)

    base_grad_model = tf.keras.models.Model(
        inputs=base_model.input,
        outputs=[last_conv_layer.output, base_model.output]
    )

    preprocessed = preprocess_input(img_array)

    with tf.GradientTape() as tape:
        conv_outputs, base_output = base_grad_model(preprocessed)
        x = model.get_layer("global_average_pooling2d")(base_output)
        x = model.get_layer("dropout")(x)
        predictions = model.get_layer("dense")(x)
        pred_index = tf.argmax(predictions[0])
        class_channel = predictions[:, pred_index]

    grads = tape.gradient(class_channel, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / (tf.math.reduce_max(heatmap) + 1e-8)

    return heatmap.numpy()


def generate_heatmap_overlay_base64(img_rgb_224, heatmap):
    heatmap_resized = cv2.resize(heatmap, (224, 224))
    heatmap_colored = np.uint8(255 * heatmap_resized)
    heatmap_colored = cv2.applyColorMap(heatmap_colored, cv2.COLORMAP_JET)
    heatmap_colored = cv2.cvtColor(heatmap_colored, cv2.COLOR_BGR2RGB)

    overlay = cv2.addWeighted(img_rgb_224, 0.6, heatmap_colored, 0.4, 0)

    overlay_img = Image.fromarray(overlay)
    buffer = io.BytesIO()
    overlay_img.save(buffer, format="PNG")
    encoded = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return encoded


# ---------------------------------------------------------
# Routes
# ---------------------------------------------------------
@app.get("/")
def root():
    return {"message": "Coconut disease prediction API is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img_224 = img.resize((224, 224))

    img_rgb_224 = np.array(img_224, dtype=np.uint8)
    img_array = np.expand_dims(img_rgb_224.astype(np.float32), axis=0)

    # Classification
    predictions = model.predict(img_array)
    pred_index = int(np.argmax(predictions[0]))
    pred_class = class_names[pred_index]
    confidence = float(np.max(predictions[0]))

    # Severity (routes to CCI% or WCLWD stage automatically)
    severity = get_severity(pred_class, img_rgb_224)

    # Grad-CAM heatmap
    heatmap = make_gradcam_heatmap(img_array, model)
    heatmap_base64 = generate_heatmap_overlay_base64(img_rgb_224, heatmap)

    return JSONResponse({
        "disease": pred_class,
        "confidence": round(confidence, 4),
        "severity": severity,
        "heatmap_image_base64": heatmap_base64
    })

# ---------------------------------------------------------
# AI Recommendation Endpoint
# ---------------------------------------------------------
@app.post("/recommend")
async def recommend(request: RecommendationRequest):

    recommendation = get_ai_recommendation(
        request.disease,
        request.severity
    )

    return JSONResponse({
        "recommendation": recommendation
    })