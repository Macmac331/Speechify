from gramformer import Gramformer
from nltk import sent_tokenize
import string

gramformer = Gramformer()

def grammar_checker(paragraph):
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



def calculate_clarity(paragraph):
    score = grammar_checker(paragraph)
    max_score = 10
    incorrect_phrases = sum(1 for result, _, _ in score if not result)
    deduction = 0.2 * incorrect_phrases
    grammar_score = max_score - deduction
    return round(grammar_score, 1)

def get_wrong_grammar(paragraph):
    results = grammar_checker(paragraph)
    wrong_sentences = {'sentence': [], 'corrected_sentences': []}
    for result, original_sent, corrected_sent in results:
        if not result:
            wrong_sentences['sentence'].append(original_sent)
            wrong_sentences['corrected_sentences'].append(corrected_sent)
    return wrong_sentences


paragraph = "Iam Effective time management and task prioritization are crucial skills for maximizing productivity and achieving goals. One strategy involves utilizing techniques such as the Eisenhower Matrix to categorize tasks based on urgency and importance. Creating to-do lists helps organize tasks by priority, making it easier to focus on what matters most. Time blocking involves allocating specific time slots for different activities, ensuring that important tasks receive dedicated attention. Setting clear goals provides direction and motivation, guiding task prioritization. Leveraging technology, such as task management apps, helps organize tasks and track progress efficiently. Delegating tasks to others when possible frees up time for high-priority activities. Additionally, taking regular breaks prevents burnout and maintains productivity. Regularly reviewing priorities and adjusting plans as needed ensures flexibility and adaptability in responding to changes. By implementing these strategies, individuals can optimize their time and accomplish tasks effectively."

results = calculate_clarity(paragraph)
grammar = get_wrong_grammar(paragraph)
print(results)
print(grammar)
