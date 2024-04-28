from gramformer import Gramformer
from nltk import sent_tokenize
import string

gramformer = Gramformer()

def GrammarChecker(paragraph):
    translator = str.maketrans('-', ' ')
    sentences = sent_tokenize(paragraph)
    results = []
    for sentence in sentences:
        new_sentence = sentence.lower().translate(translator).strip()
        
        corrected_sentence_set = gramformer.correct(new_sentence)
        corrected_sentence = next(iter(corrected_sentence_set)).lower().translate(translator).strip()
        
        result = (corrected_sentence == new_sentence)
        results.append((result,new_sentence, corrected_sentence ))

    return results



def CalculateClarity(paragraph):
    score = GrammarChecker(paragraph)
    max_score = 10
    incorrect_phrases = sum(1 for result, _, _ in score if not result)
    deduction = 0.2 * incorrect_phrases
    grammar_score = max_score - deduction
    return round(grammar_score, 1)


def GetWrongGrammar(paragraph):
    results = GrammarChecker(paragraph)
    wrong_sentences = {}
    for result, original_sent, corrected_sent in results:
        if not result:
            wrong_sentences[corrected_sent] = original_sent
    return wrong_sentences

def HighlightWrongWord(paragraph):
    sents = GetWrongGrammar(paragraph)
    highlighted_pairs = {}
    for corrected_sent, original_sent in sents.items():
        corrected_words = corrected_sent.split()
        original_words = original_sent.split()
        
        for corrected_word, original_word in zip(corrected_words, original_words):
            if corrected_word.replace(" ", "") == original_word:

                highlighted_pairs[corrected_word] = original_word
    return highlighted_pairs



paragraph = "Iam Effective time management and task prioritization are crucial skills for maximizing productivity and achieving goals. One strategy involves utilizing techniques such as the Eisenhower Matrix to categorize tasks based on urgency and importance. Creating to-do lists helps organize tasks by priority, making it easier to focus on what matters most. Time blocking involves allocating specific time slots for different activities, ensuring that important tasks receive dedicated attention. Setting clear goals provides direction and motivation, guiding task prioritization. Leveraging technology, such as task management apps, helps organize tasks and track progress efficiently. Delegating tasks to others when possible frees up time for high-priority activities. Additionally, taking regular breaks prevents burnout and maintains productivity. Regularly reviewing priorities and adjusting plans as needed ensures flexibility and adaptability in responding to changes. By implementing these strategies, individuals can optimize their time and accomplish tasks effectively."

results = CalculateClarity(paragraph)
grammar = GetWrongGrammar(paragraph)
words = HighlightWrongWord(paragraph)
print(results)
print(grammar)
print(words)
