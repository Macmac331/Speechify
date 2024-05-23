from flask import jsonify, make_response
from service import TranscriptionService
from analyzer import GrammarChecker
import json
from analyzer import SpeechScore, GrammarChecker
from auth.authRequest import token_required

transcript_service = TranscriptionService.Transcript
transcript = transcript_service.transcript_storage.get('transcript')
class Analyzer:


    @token_required
    def get_complexity_score(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            complexity_score = SpeechScore.calculate_complexity(transcript)
            return  jsonify({'complexity_score' : complexity_score}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    @token_required
    def get_clarity_score(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            clarity_score = GrammarChecker.calculate_clarity(transcript)
            return jsonify({"clarity_score" : clarity_score}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @token_required
    def get_scores(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            storedTopics = transcript_service.category_storage.get('category')
            if storedTopics is None or storedTopics == "":
                generatedTopics = SpeechScore.extract_topic(transcript)
                relevance_score = SpeechScore.calculate_relevance(transcript, generatedTopics)
            else:
                relevance_score = SpeechScore.calculate_relevance(transcript, storedTopics)

            clarity_score = GrammarChecker.calculate_clarity(transcript)
            complexity_score = SpeechScore.calculate_complexity(transcript)
            sentiment_score = SpeechScore.sentiment_score(transcript)

            scores = {
                "complexity" : complexity_score,
                "clarity" : clarity_score,
                "relevance" : relevance_score,
                "language" : 0,
                "sentiment" : sentiment_score,
            }
            return jsonify(scores), 200
        except Exception as e:
            return jsonify({"error: " : str(e)}), 500

    def get_wrong_grammar(self):
        try:    
            transcript = transcript_service.transcript_storage.get('transcript')
            if transcript is None:
                return jsonify({"message" : "No transcript found "}),200
            wrong_grammar = GrammarChecker.grammar_checker(transcript)
            return jsonify(wrong_grammar),200
        except Exception as e:
            return jsonify({"error" : str(e)}), 500
        
    def get_relevance_score(self):
        try:
            topics = transcript_service.transcript_storage.get('category')
            transcript = transcript_service.transcript_storage.get('transcript')
            
            if topics is None:
                extracted_topics = SpeechScore.extract_topic(transcript)
                score = SpeechScore.calculate_relevance(transcript,extracted_topics)
            else:
                score = SpeechScore.calculate_relevance(transcript, topics)

            return jsonify({"score" : score}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
    def get_topic(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            topics = SpeechScore.extract_topic(transcript)
            topic = SpeechScore.preprocess_topics(topics)
            return jsonify({"topic" : topic}), 200
        except Exception as e:
            return jsonify({"error" : str(e)}), 500
        
    def get_sentiment_scores(self):
        try:
            transcript = transcript_service.transcript_storage.get('transcript')
            score = SpeechScore.sentiment_score(transcript)
            return jsonify({"sentiment_score" : score}), 200
        except Exception as e:
            return jsonify({"error" : str(e)}), 500