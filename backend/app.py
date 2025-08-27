from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
CORS(app, resources={r"/api/*": {"origins": FRONTEND_URL}})
openai.api_key = os.getenv('OPENAI_API_KEY')

GENRES = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Horror", "Thriller", "Historical Fiction", "Western", "Noir/Crime"]
THEMES = ["Comedy", "Tragedy", "Coming of Age", "Redemption", "Betrayal", "Sacrifice", "Discovery", "Revenge", "Transformation", "Survival"]
WEIRDNESS_LEVELS = [1, 2, 3, 4, 5]

@app.route('/api/options')
def get_options():
    return jsonify({
        "genres": GENRES, 
        "themes": THEMES,
        "weirdnessLevels": WEIRDNESS_LEVELS
    })

@app.route('/api/generate', methods=['POST'])
def generate_story():
    data = request.json
    genre = data.get('genre')
    theme = data.get('theme')
    weirdness = data.get('weirdness', 3)  # Default to middle value
    
    if not genre or not theme:
        return jsonify({"error": "Genre and theme required"}), 400
    
    try:
        # Map weirdness level to creativity parameters
        temperature_map = {1: 0.5, 2: 0.6, 3: 0.7, 4: 0.8, 5: 0.9}
        max_tokens_map = {1: 100, 2: 120, 3: 150, 4: 180, 5: 200}

        prompt = f"Create a one-paragraph story prompt with {genre} genre and {theme} theme."

        # Add weirdness instruction to prompt
        if weirdness >= 4:
            prompt += " Make it unusual and experimental."
        elif weirdness <= 2:
            prompt += " Keep it mainstream and conventional."
        
        client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative writing assistant that generates compelling story prompts."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=max_tokens_map.get(weirdness, 150),
            temperature=temperature_map.get(weirdness, 0.7)
        )
        
        story_prompt = response.choices[0].message.content.strip()
        return jsonify({"prompt": story_prompt})
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5008)