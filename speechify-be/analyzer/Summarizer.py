import google.generativeai as genai
import os
from dotenv import load_dotenv


#Sumaar
class Summarizer:
    def transcript_summarizer(transcript):
        safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_NONE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_NONE"
        },
        ]
        genai.configure(
            api_key=os.getenv('API_KEY')
        )
        model = genai.GenerativeModel('gemini-pro', safety_settings= safety_settings)
        chat = model.start_chat()

        prompt = "Summarize maximum of 3 sentences:  " + transcript
        response = chat.send_message(prompt)

        return response.text
