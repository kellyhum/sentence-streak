import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
from dotenv import load_dotenv

load_dotenv()

fb_path = os.getenv('FIREBASE_CRED')

cred = credentials.Certificate(fb_path)
app = firebase_admin.initialize_app(cred)

db = firestore.client()