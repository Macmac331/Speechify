import pandas as pd
import numpy as np
import sklearn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

import re
import nltk
from nltk.util import pr
stemmer = nltk.SnowballStemmer("english")
from nltk.corpus import stopwords
import string
from sklearn.metrics import accuracy_score
from joblib import dump

stopwords = stopwords.words("english")

#Importing Data
df = pd.read_csv("C:\\Users\\bauti\\Desktop\\Speechify\\speechify-be\\analyzer\\Model\\twitter_data.csv")

#Transforming Data
df['labels'] = df['class'].map({0 : "Hate Speech" , 1 : "Offensive Language", 2 : "No Hate and offensive speech"})

df = df[['tweet','labels']]


#Cleaning using regex
def data_cleaning(text, stopwords):
    text = str(text).lower()
    text = re.sub(r'\[.*?\]', '', text)  # Remove square brackets and their contents
    text = re.sub(r'https?://\S+', '', text)  # Remove URLs
    text = re.sub(r'<.*?>', '', text)  # Remove HTML tags
    text = re.sub(r'[%s]' % re.escape(string.punctuation), '', text)  # Remove punctuation
    text = re.sub(r'\n', '', text)  # Remove newline characters
    text = re.sub(r'\w*\d\w*', '', text)  # Remove words containing numbers
    text = ' '.join([word for word in text.split() if word.lower() not in stopwords])  # Remove stopwords
    return text

df["tweet"] = df["tweet"].apply(data_cleaning, stopwords=stopwords)


#X and Y labels for prediction
x = np.array(df["tweet"])
y = np.array(df["labels"])

cv = CountVectorizer()
x = cv.fit_transform(x)

X_train, X_test, y_train, y_test = train_test_split(x,y,test_size = 0.3, random_state=42)
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)


test_data = "you are a slut"
df= cv.transform([test_data]).toarray()
print(clf.predict(df))

y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)

try:
    dump(clf, 'decision_tree_classifier.joblib')
    dump(cv, 'count_vectorizer.joblib')
    print("Model saved successfully.")
except Exception as e:
    print("Error:", e)