from flask import Blueprint, request
from app.services.wordbank_services import add_word_service, get_words_service, delete_word_service

wordbank_blueprint = Blueprint("wordbank", __name__)

@wordbank_blueprint.route("/add", methods=["POST"])
def add_word_route():
    data = request.get_json()

    chinWord = data.get('chinWord')
    pinyin = data.get('pinyin')
    meaning = data.get('meaning')
    hsk = data.get('hsk')

    return add_word_service(chinWord, pinyin, meaning, hsk)

@wordbank_blueprint.route("/getWords", methods=["GET"])
def get_words_route():
    return get_words_service()

@wordbank_blueprint.route("/delete/<doc_id>", methods=["DELETE"])
def delete_word_route(doc_id):
    return delete_word_service(doc_id)
