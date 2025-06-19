from flask import Flask
from flask_cors import CORS
from app.routes.wordbank_routes import wordbank_blueprint
from app.routes.practice_routes import practice_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app, origins=['https://sentence-streak-rzo6.vercel.app/'])

    app.register_blueprint(wordbank_blueprint, url_prefix="/wordbank")
    app.register_blueprint(practice_blueprint, url_prefix="/practice")

    return app