from flask import jsonify
from service import TranscriptionService
from analyzer import GrammarChecker
import json
from analyzer import SpeechScore, GrammarChecker
from auth.authRequest import token_required
transcript_service = TranscriptionService.Transcript

class Analyzer:

    @token_required
    def get_complexity_score(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            complexity_score = SpeechScore.CalculateComplexity(transcript)
            return  jsonify({'complexity_score' : complexity_score}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    @token_required
    def get_clarity_score(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            clarity_score = GrammarChecker.CalculateClarity(transcript)
            return jsonify({"clarity_score" : clarity_score}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @token_required
    def get_scores(self):
        try:
            topics = transcript_service.transcript_storage.get('category')
            transcript = transcript_service.transcript_storage.get('transcript')
            clarity_score = GrammarChecker.CalculateClarity(transcript)
            complexity_score = SpeechScore.CalculateComplexity(transcript)
            relevance_score = SpeechScore.calculateRelevance(transcript, topics)
            scores = {
                "complexity" : complexity_score,
                "clarity" : clarity_score,
                "relevance" : relevance_score
            }
            return jsonify({scores}), 200
        except Exception as e:
            return jsonify({"error: " : str(e)}), 500

    def get_relevance_score(self):
        transcript = transcript_service.transcript_storage.get('transcript')
        topics = transcript_service.transcript_storage.get('category')
        score = SpeechScore.calculateRelevance(transcript,topics)
        try:
            return jsonify({"score: " : score}), 201
        except Exception as e:
            return jsonify({"error:": str(e)}), 500
