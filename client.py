import streamlit as st
import requests
import base64

# --------------------------------------------
# Page Configuration
# --------------------------------------------
st.set_page_config(
    page_title="Coconut Disease Detection AI",
    page_icon="🥥",
    layout="wide"
)

st.title("🥥 Coconut Disease Detection AI")
st.markdown(
    "Upload a coconut leaf image to detect the disease, estimate severity, "
    "generate an explainability heatmap, and receive AI-powered treatment recommendations."
)

# --------------------------------------------
# File Upload
# --------------------------------------------
uploaded_file = st.file_uploader(
    "Upload Coconut Leaf Image",
    type=["jpg", "jpeg", "png"]
)

if uploaded_file:

    left, right = st.columns([1, 1])

    with left:
        st.subheader("📷 Uploaded Image")
        st.image(uploaded_file, use_container_width=True)

    if st.button("🔍 Analyze Leaf", use_container_width=True):

        files = {
            "file": (
                uploaded_file.name,
                uploaded_file.getvalue(),
                uploaded_file.type
            )
        }

        # --------------------------------------------
        # Prediction API
        # --------------------------------------------
        try:

            with st.spinner("Running disease detection..."):

                response = requests.post(
                    "https://coconut-disease-detection-1.onrender.com/predict",
                    files=files
                )

            if response.status_code != 200:
                st.error("Prediction failed.")
                st.stop()

            result = response.json()

        except Exception as e:
            st.error(f"Unable to connect to FastAPI.\n\n{e}")
            st.stop()

        disease = result["disease"]
        severity = result["severity"]
        confidence = result["confidence"]
        heatmap = result["heatmap_image_base64"]

        # --------------------------------------------
        # Prediction Results
        # --------------------------------------------
        with right:

            st.subheader("🩺 Prediction Result")

            c1, c2, c3 = st.columns(3)

            c1.metric("Disease", disease)
            c2.metric("Severity", severity)
            c3.metric("Confidence", f"{confidence*100:.2f}%")

            st.progress(confidence)

            st.subheader("🔥 Grad-CAM Heatmap")

            heatmap_bytes = base64.b64decode(heatmap)

            st.image(
                heatmap_bytes,
                caption="Model Attention",
                use_container_width=True
            )

        # --------------------------------------------
        # Recommendation API
        # --------------------------------------------
        try:

            with st.spinner("Generating AI recommendation..."):

                ai_response = requests.post(
                    "https://coconut-disease-detection-1.onrender.com/recommend",
                    json={
                        "disease": disease,
                        "severity": severity
                    }
                )

            if ai_response.status_code != 200:
                st.warning("Recommendation service unavailable.")
                st.stop()

            recommendation = ai_response.json()

        except Exception as e:
            st.warning(f"Recommendation service error:\n\n{e}")
            st.stop()

        # --------------------------------------------
        # Recommendation Section
        # --------------------------------------------
        st.divider()

        st.subheader("🌱 AI Recommendation")

        st.markdown(recommendation["recommendation"])

        st.success("Analysis Completed Successfully ✅")

