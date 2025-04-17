from flask import Flask
from flask_cors import CORS
from app.routes.wordbank_routes import wordbank_blueprint

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(wordbank_blueprint, url_prefix="/wordbank")

    return app