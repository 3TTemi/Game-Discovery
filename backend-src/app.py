import os
from dotenv import load_dotenv
from openai import OpenAI 
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

load_dotenv()

app = Flask(__name__)

CORS(app, supports_credentials=True)


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
    update_text = query_open_ai(game_name)
    return jsonify({'update_text': update_text})

def query_open_ai(name): 
    completion = client.chat.completions.create(
    messages=[
        {"role": "user", "content": """Summarize the latest update for this game in one setence. Begin with the date of the update, followed by a colon, then followed by the summary 
         The name of the game is """ + name}
    ],
    model="gpt-3.5-turbo",
)
    return completion.choices[0].message.content; 


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8000, debug=True)

