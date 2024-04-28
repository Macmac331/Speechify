import math
from transformers import T5ForConditionalGeneration, T5Tokenizer

class Summarizer:
    @staticmethod
    def transcriptSummarizer(text):
        # Getting words count
        words_count = text.split()
        total_words = len(words_count)

        min_length = max(math.ceil(total_words * 0.3), total_words // 10)
        max_length = max(math.ceil(total_words * 0.6), total_words * 5 // 10)

        model_name = "t5-base"
        model = T5ForConditionalGeneration.from_pretrained(model_name)
        tokenizer = T5Tokenizer.from_pretrained(model_name)

        input_text = "summarize: " + text

        input_ids = tokenizer.encode(input_text, return_tensors="pt")
        outputs = model.generate(input_ids, max_length=max_length, min_length=min_length, num_beams=4, early_stopping=True)
        
        summary_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return summary_text
