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
import string

d = cmudict.dict()
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def CalculateComplexity(paragraph): 
    complexity_score = 0.39 * CalculateASL(paragraph) + 11.8 * CalculateASW(paragraph) - 15.59

    min_score = 1
    max_score = 10

    normalized_score = min_score + (complexity_score - min_score) * (max_score - min_score) / (max_score - min_score)
        
    return max(1, normalized_score)

def CalculateASL(paragraph):
    words = word_tokenize(paragraph)
    sentences = sent_tokenize(paragraph)

    total_words = len(words)
    total_sentences = len(sentences)

    if(total_sentences == 0 and total_words == 0):
        return 0
    else:
        return total_words/total_sentences
        

def CalculateASW(paragraph):
    words = word_tokenize(paragraph)
    total_words = len(words)
        
    if total_words == 0:
        return 0
    else:
        total_syllable = sum(SyllableCount(word) for word in words)
        return total_syllable / total_words
    

def SyllableCount(word):
    word = ''.join(filter(lambda char: char.isalpha() or char == "-", word.lower()))
    
    if not word:
        return 0
    
    if word not in d:
        return 1
    return max([len(list(y for y in x if y[-1].isdigit())) for x in d[word]])

def CountSyllablesInParagraph(paragraph):
    words = word_tokenize(paragraph)
    total_syllables = 0
    for word in words:
        syllables_in_word = SyllableCount(word)
        total_syllables += syllables_in_word
    return total_syllables

def preprocess_text(transcript):
    tokens = word_tokenize(transcript)
    tokens = [token for token in tokens if token.isalnum()]
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return tokens

def preprocess_topics(topics):
    if topics is None:
        return "No Topics"
    else:
        tokens = topics.split('/')
        return tokens

def calculateRelevance(transcript, topics):
    processed_topic = preprocess_topics(topics)
    processed_transcript = preprocess_text(transcript)
    
    tfidf_vect = TfidfVectorizer(tokenizer=preprocess_text)
    tfidf_matrix = tfidf_vect.fit_transform([transcript])

    vocabulary = tfidf_vect.vocabulary_
    word_weights_topics = {}

    for topic in processed_topic:
        dictionary = Dictionary([processed_transcript])
        corpus = [dictionary.doc2bow(processed_transcript)]
        lda_model = LdaModel(corpus, id2word=dictionary, num_topics=1)

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
