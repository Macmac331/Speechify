from flask import jsonify
from analyzer import Summarizer as sm
from analyzer import HateSpeech as hsp
from auth.authRequest import token_required
class Transcript:

    transcript_storage = {}
    category_storage = {}
    
    def add_transcribed_text(self, data):
        try:
            transcript = data.get('transcript')
            category = data.get('category')
            print(transcript)
            print(category)
            self.category_storage['category'] = category
            self.transcript_storage['transcript'] = transcript 
            return jsonify({"message": "Transcribed text received successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

        
    @token_required
    def get_hate_speech_count(self):
        try:
            transcript = self.transcript_storage.get('transcript')
            counts, sentences = hsp.HateSpeechClass.hate_speech_counter(transcript)
            print(transcript)
            if counts:
                result = {

                    "hate_speech_sentences": sentences[0],
                    "offensive_language_sentences": sentences[1],
                }
                return jsonify(result), 200
            else:
                return jsonify({"error": "An error occurred while processing the transcript."}), 500
        except Exception as e:
            return jsonify({"error": "An error occurred while processing the transcript."}), 500
        

    @token_required
    def get_summary(self):
        try:
            transcript = self.transcript_storage.get('transcript')
            summary = sm.Summarizer.transcript_summarizer(transcript)
            return jsonify({"summary" : summary }), 200
        except Exception as e:
            return jsonify({"error" : str(e)}), 500