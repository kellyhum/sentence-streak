from app.utils.firebase import db
from flask import jsonify
import random
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

def get_random_word_service():
    docs = db.collection('wordbank').stream()
    doc_ids = []

    for doc in docs:
        doc_ids.append(doc.id)

    chosen_one = random.choice(doc_ids)

    try:
        full_doc_data = db.collection('wordbank').document(chosen_one).get()
        full_doc = full_doc_data.to_dict()
        full_doc['id'] = full_doc_data.id

        return jsonify({
            "status": "success",
            "word": full_doc
            })
    except Exception as e:
        return jsonify({"status": "failed", "msg": str(e)})
    
def check_sentence_service(randomWord, inputSentence):
    # check if the word makes sense in the context

    groq_key = os.getenv('GROQ_API_KEY')

    client = Groq(
        api_key=groq_key,
    )

    chat_completion = client.chat.completions.create(
        messages = [
            {
                "role": "system",
                "content": "you are a chinese language instructor who checks grammar"
            },
            {
                "role": "user",
                "content": f"""
                given this word and input sentence, 
                check the grammar to see if the word makes sense in the context.
                respond with 'Grammatically correct!' if it's grammatically correct, and 'Not correct' if it's not. 
                if it's not correct, give a one to two sentence explanation as to why it's incorrect, 
                and provide a fixed version of the sentence, 
                keeping it as close to the original sentence as possible. 
                Use English for the explanation, but you can give examples in Chinese if needed.
                Any Chinese examples in your answer should be in Traditional Chinese unless the user input is in Simplified Chinese.
                your word: {randomWord} and your sentence: {inputSentence}"""
            }
        ],
        model="llama-3.3-70b-versatile",
        stream=False
    )
    return chat_completion.choices[0].message.content
    