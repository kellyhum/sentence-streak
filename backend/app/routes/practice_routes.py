from flask import Blueprint, request, jsonify
from app.services.practice_services import get_random_word_service, check_sentence_service

practice_blueprint = Blueprint("practice", __name__)

@practice_blueprint.route("/getRandomWord", methods=["GET"])
def get_random_word_route():
    return get_random_word_service()

@practice_blueprint.route("/checkSentence", methods=["POST"])
def check_sentence_route():
    data = request.get_json()

    print(data)

    randomWord = data.get('randomWord')
    inputSentence = data.get('inputSentence')

    return check_sentence_service(randomWord, inputSentence)
        