import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
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

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        return f"Error generating recommendation: {str(e)}"