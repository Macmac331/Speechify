from flask import Blueprint, request, jsonify, g
from service.TranscriptionService import Transcript
from analyzer.Summarizer import Summarizer

transcription_controller = Blueprint("transcription_controller", __name__ )

TRANSCRIPTION_API_BASE_URL = '/api/v1/transcribe/'
transcript_service = Transcript()
summarizer_service = Summarizer()

@transcription_controller.route(TRANSCRIPTION_API_BASE_URL + 'add', methods =['POST'])
def add_transcribed_text():
    transcript = request.get_json()
    return transcript_service.add_transcribed_text(transcript)

@transcription_controller.route(TRANSCRIPTION_API_BASE_URL + "get-summary", methods=['GET'])
def get_summarized_transcript():
    return transcript_service.get_summary()

@transcription_controller.route(TRANSCRIPTION_API_BASE_URL + 'get-hate-speech', methods=['GET'])
def get_hate_speech_count():
    return transcript_service.get_hate_speech_count()
