from gramformer import Gramformer
from nltk import sent_tokenize
import string

gramformer = Gramformer()

#Sentence comparison
def grammar_checker(paragraph):
    translator = str.maketrans('-', ' ')
    remove_punct_translator = str.maketrans('', '', string.punctuation)

    sentences = sent_tokenize(paragraph)

    original_sentences = []
    corrected_sentences = []

    for sentence in sentences:
        new_sentence = sentence.lower().translate(translator).translate(remove_punct_translator).strip()

        corrected_sentence_set = gramformer.correct(new_sentence)
        corrected_sentence = next(iter(corrected_sentence_set)).lower().translate(translator).translate(remove_punct_translator).strip()
        
        if corrected_sentence != new_sentence:
            original_sentences.append(new_sentence)
            corrected_sentences.append(corrected_sentence)
            
    return {
        "sentence" : original_sentences,
        "corrected_sentence" : corrected_sentences
    }

#calculate grammar
def calculate_clarity(paragraph):
    score = grammar_checker(paragraph)
    max_score = 10
    incorrect_phrases = sum(1 for original_sentence, corrected_sentence in zip(score["sentence"], score["corrected_sentence"]) if original_sentence != corrected_sentence)
    deduction = 0.2 * incorrect_phrases
    grammar_score = max_score - deduction
    return round(grammar_score, 1)
