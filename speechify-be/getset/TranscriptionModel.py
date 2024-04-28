class Transcribe:
    def __init__(self, transcript=None):
        self.__transcript = transcript

    def get_text(self):
        return self.__transcript
    
    def set_text(self, transcript):
        self.__transcript = transcript
