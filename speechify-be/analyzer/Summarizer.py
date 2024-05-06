import google.generativeai as genai
import os
from dotenv import load_dotenv



class Summarizer:

    def transcript_summarizer(transcript):

        genai.configure(
            api_key=os.getenv('API_KEY')
        )
        model = genai.GenerativeModel('gemini-pro')
        chat = model.start_chat(history=[])

        prompt = "Summarize: " + transcript
        response = chat.send_message(prompt)

        return response.text
