# import os
# from recommendations import LOCAL_RECOMMENDATIONS
# from dotenv import load_dotenv
# from google import genai

# load_dotenv()

# client = genai.Client(
#     api_key=os.getenv("GEMINI_API_KEY")
# )


# def build_prompt(disease, severity):

#     return f"""
# You are an agricultural expert specializing in coconut diseases.

# Disease:
# {disease}

# Severity:
# {severity}

# Provide practical recommendations for farmers.

# Respond in Markdown using the following headings:

# ## Cause

# ## Immediate Action

# ## Organic Treatment

# ## Chemical Treatment

# ## Prevention

# ## Monitoring Advice

# Keep the response below 250 words.
# """


# # def get_ai_recommendation(disease, severity):

# #     prompt = build_prompt(disease, severity)

# #     try:

# #         response = client.models.generate_content(
# #             model="gemini-3.5-flash",
# #             contents=prompt
# #         )

# #         return response.text

# #     except Exception as e:

# #         return f"Error generating recommendation: {str(e)}"

# def get_ai_recommendation(disease, severity):

#     prompt = build_prompt(
#         disease,
#         severity
#     )

#     try:

#         response = client.models.generate_content(
#             model="gemini-2.0-flash",
#             contents=prompt
#         )

#         return response.text

#     except Exception as e:

#         print("Gemini Error:", e)

#         # Fallback
#         if disease in LOCAL_RECOMMENDATIONS:

#             return (
#                 "⚠️ **AI service is currently unavailable.**\n\n"
#                 "Showing expert recommendations stored locally.\n\n"
#                 + LOCAL_RECOMMENDATIONS[disease]["recommendation"]
#             )

#         return (
#             "AI recommendation unavailable and no local recommendation exists."
#         )

import os
from recommendations import LOCAL_RECOMMENDATIONS
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)


def build_prompt(disease, severity):
    return f"""
You are an agricultural expert specializing in coconut diseases.

Disease:
{disease}

Severity:
{severity}

Provide practical recommendations for farmers.

Respond in Markdown using the following headings:

## Cause

## Immediate Action

## Organic Treatment

## Chemical Treatment

## Prevention

## Monitoring Advice

Keep the response below 250 words.
"""


def get_ai_recommendation(disease, severity):
    prompt = build_prompt(disease, severity)

    try:
        response = client.chat.completions.create(
            model="google/gemma-4-26b-a4b-it:free",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content

    except Exception as e:
        print("OpenRouter Error:", e)

        # Fallback
        if disease in LOCAL_RECOMMENDATIONS:
            return (
                "⚠️ **AI service is currently unavailable.**\n\n"
                "Showing expert recommendations stored locally.\n\n"
                + LOCAL_RECOMMENDATIONS[disease]["recommendation"]
            )

        return (
            "AI recommendation unavailable and no local recommendation exists."
        )