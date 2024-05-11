import nltk
import nltk
import math
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.models import LdaModel
from gensim.corpora import Dictionary
from nltk.corpus import cmudict
import google.generativeai as genai
import os
import re

d = cmudict.dict()
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))
model = genai.GenerativeModel('gemini-pro')
genai.configure(
    api_key=os.getenv('API_KEY')
)

def calculate_complexity(paragraph): 
    complexity_score = 0.39 * calculate_asl(paragraph) + 11.8 * calculate_asw(paragraph) - 15.59

    min_score = 1
    max_score = 18
    new_min = 1
    new_max = 10
    mapped_score = map_grade_to_scale(complexity_score, min_score, max_score, new_min, new_max)
    mapped_score = max(0, min(mapped_score, 10))

    return mapped_score

def map_grade_to_scale(score, min, max, newMin, newMax):
    mapped_grade = ((score - min) * (newMax - newMin) / (max - min)) + newMin
    mapped_grade_rounded = round(mapped_grade, 1)

    return mapped_grade_rounded

def calculate_asl(paragraph):
    words = word_tokenize(paragraph)
    sentences = sent_tokenize(paragraph)

    total_words = len(words)
    total_sentences = len(sentences)

    if(total_sentences == 0 and total_words == 0):
        return 0
    else:
        return total_words/total_sentences
        

def calculate_asw(paragraph):
    words = word_tokenize(paragraph)
    total_words = len(words)
        
    if total_words == 0:
        return 0
    else:
        total_syllable = sum(syllable_count(word) for word in words)
        return total_syllable / total_words
    

def syllable_count(word):
    word = ''.join(filter(lambda char: char.isalpha() or char == "-", word.lower()))
    
    if not word:
        return 0
    
    if word not in d:
        return 1
    return max([len(list(y for y in x if y[-1].isdigit())) for x in d[word]])

def count_syllable_in_paragraph(paragraph):
    words = word_tokenize(paragraph)
    total_syllables = 0
    for word in words:
        syllables_in_word = syllable_count(word)
        total_syllables += syllables_in_word
    return total_syllables

def preprocess_text(transcript):
    tokens = word_tokenize(transcript)
    tokens = [token for token in tokens if token.isalnum()]
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return tokens

def preprocess_topics(topics):
    if topics is None:
        print(topics)
        return "No Topics"

    else:
        tokens = topics.split('\n')
        tokens = topics.split('/')
        tokens = [re.sub(r'[\*\d]+', '', token).strip("- ").strip() for token in tokens if token.strip("- ").strip()]
        print(tokens)
        return tokens


def calculate_relevance(transcript, topics):

    processed_topic = preprocess_topics(topics)
    print(processed_topic)
    processed_transcript = preprocess_text(transcript)
    
    tfidf_vect = TfidfVectorizer(tokenizer=preprocess_text, token_pattern=None)
    tfidf_matrix = tfidf_vect.fit_transform([transcript])

    vocabulary = tfidf_vect.vocabulary_
    word_weights_topics = {}

    for topic in processed_topic:
        dictionary = Dictionary([processed_transcript])
        corpus = [dictionary.doc2bow(processed_transcript)]
        lda_model = LdaModel(corpus, id2word=dictionary, num_topics=len(processed_topic))

        topic_distribution = lda_model.get_document_topics(corpus)[0]
        word_weight_topic = {}

        for word in vocabulary:
            word_index = vocabulary[word]
            tfidf_score = tfidf_matrix[0, word_index]
            try:
                prob = next(prob for topic_id, prob in topic_distribution if topic_id == 0)
            except StopIteration:
                prob = 0
            word_weight_topic[word] = tfidf_score * prob

        word_weights_topics[topic] = word_weight_topic

    word_highest_scores = {}

    for word in vocabulary:
        highest_score = max(word_weights_topics[topic][word] for topic in processed_topic)
        word_highest_scores[word] = highest_score + 0.02

    relevance_score = sum(word_highest_scores.values())
    
    return math.ceil(relevance_score)

def extract_topic(transcript):
    chat = model.start_chat()
    req = "Extract four one-word topic for: " + transcript
    res = chat.send_message(req)

    return res.text



