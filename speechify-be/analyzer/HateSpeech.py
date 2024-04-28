import nltk
from nltk import sent_tokenize
from joblib import load
import os
from sklearn.feature_extraction.text import CountVectorizer

class HateSpeechClass:
    @staticmethod
    def hateSpeechCounter(text):
        try:
            model_path = "C:\\Users\\bauti\\Desktop\\Speechify\\speechify-be\\analyzer\\Model\\decision_tree_classifier.joblib"
            model = load(model_path)
            
            cv_path = "C:\\Users\\bauti\\Desktop\\Speechify\\speechify-be\\analyzer\\Model\\count_vectorizer.joblib"
            cv = load(cv_path)
            
            sentences = sent_tokenize(text)
            print(sentences)

            hate_speech_count = 0
            offensive_language_count = 0
            no_hate_offensive_count = 0
            
            hate_speech_sentences = []
            offensive_language_sentences = []
            no_hate_offensive_sentences = []

            for sentence in sentences:
                sentence_features = cv.transform([sentence]).toarray()
                predicted_label = model.predict(sentence_features)[0]
                
                if predicted_label == "Hate Speech":
                    hate_speech_count += 1
                    hate_speech_sentences.append(sentence)
                elif predicted_label == "Offensive Language":
                    offensive_language_count += 1
                    offensive_language_sentences.append(sentence)
                elif predicted_label == "No Hate and offensive speech":
                    no_hate_offensive_count += 1
                    no_hate_offensive_sentences.append(sentence)
                    
            print(hate_speech_count, offensive_language_count, no_hate_offensive_count)
            return (hate_speech_count, offensive_language_count, no_hate_offensive_count), (hate_speech_sentences, offensive_language_sentences, no_hate_offensive_sentences)
        
        except Exception as e:
            print("Error:", e)
            return None
