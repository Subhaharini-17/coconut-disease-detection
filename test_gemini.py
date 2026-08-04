# # from google import genai
# # import os
# # from dotenv import load_dotenv

# # load_dotenv()

# # client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# # for model in client.models.list():
# #     print(model.name)
# import os
# import traceback
# from dotenv import load_dotenv
# from google import genai

# load_dotenv()

# client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# try:
#     response = client.models.generate_content(
#         model="gemini-2.0-flash",
#         contents="Say hello in one sentence."
#     )
#     print("SUCCESS:")
#     print(response.text)
# except Exception as e:
#     print("FULL ERROR TRACEBACK:")
#     traceback.print_exc()
from ai_service import get_ai_recommendation

result = get_ai_recommendation("WCLWD_Yellowing", "Moderate stage")
print(result)