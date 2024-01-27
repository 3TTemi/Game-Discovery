import os
from db import db 
from db import Game
from db import SummaryFlag
from dotenv import load_dotenv
from openai import OpenAI 
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

load_dotenv()

app = Flask(__name__)
db_filename = "games.db"

#setup config 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

CORS(app, supports_credentials=True)

# initialize app 
db.init_app(app)
with app.app_context():
    db.create_all()


RAWG_API_URL = 'https://api.rawg.io/api/games'
RAWG_API_KEY = 'e353d84b4ad64b5db3cf1812551de28c'

client = OpenAI()

@app.route('/games', methods=['GET'])
def get_games():
    response = requests.get(RAWG_API_URL, params={'key': RAWG_API_KEY})        
    if response.ok:
        data = response.json(); 
        # for game in data['results']: 
        #     game['update_text'] = query_open_ai(game['name'])
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data from RAWG API'}), 500
    
@app.route('/game-updates/<game_name>', methods=['GET'])
def get_game_update(game_name):
    message = """Summarize the latest update for this game in one setence. Begin with the date of the update, followed by a colon, then followed by the summary 
         The name of the game is """
    update_text = query_open_ai(game_name, message)
    return jsonify({'update_text': update_text})

def query_open_ai(name, message): 
    completion = client.chat.completions.create(
    messages=[
        {"role": "user", "content": message + name}
    ],
    model="gpt-3.5-turbo",
)
    return completion.choices[0].message.content; 

@app.route('/game-summary/<game_name>', methods=['GET'])
def get_game_summary(game_name):
    initSummary()
    game = Game.query.filter_by(name=game_name).first()
    return jsonify({'summary_text': game.summary})

def initSummary(): 
    summary_flag = SummaryFlag.query.first()
    if summary_flag is None:

        # One time operation 
        message = """Summarize this game in a maximum of two sentences. Begin the summary with the name of the game 
        followed by the word is, and then the summary. The name of the game is"""

        response = requests.get(RAWG_API_URL, params={'key': RAWG_API_KEY})        
        if response.ok:
            data = response.json(); 
            print("response good")
        else:
            print("response bad")
            return jsonify({'error': 'Failed to fetch data from RAWG API'}), 500
        
        for game in data['results']: 
            print("response test")
            game_db = Game(
                name = game['name'],
                summary = query_open_ai(game['name'], message)
            )
            db.session.add(game_db)
        
        # Set Flag to done 
        summary_flag = SummaryFlag(is_summary_done=True)
        db.session.add(summary_flag)
        db.session.commit()


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

