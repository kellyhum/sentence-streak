from app.utils.firebase import db
from flask import jsonify

def add_word_service(chinWord, pinyin, meaning, lvl):
    data = {
        "word": chinWord,
        "pinyin": pinyin,
        "meaning": meaning,
        "lvl": lvl
    }

    try:
        db.collection('wordbank').add(data)
        return jsonify({
            "status": "success",
            "msg": f'{chinWord} added to database'
        })

    except Exception as error:
        return jsonify(error.message)
    
def get_words_service():
    docs = db.collection('wordbank').stream()
    words = []

    for doc in docs:
        doc_as_dict = doc.to_dict()
        doc_as_dict['id'] = doc.id
        words.append(doc_as_dict)

    return jsonify(words)

def delete_word_service(doc_id):
    try:
        db.collection('wordbank').document(doc_id).delete()
        return jsonify({
            "status": "success",
            "msg": "word deleted"
        })
    except Exception as error:
        return jsonify(error.message)