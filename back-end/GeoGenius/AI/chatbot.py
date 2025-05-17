from flask import Flask, request, jsonify
from flask import send_from_directory
from gpt4all import GPT4All
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


model_path = os.path.expanduser(r"C:\Users\Patriarch\AppData\Local\nomic.ai\GPT4All\Meta-Llama-3-8B-Instruct.Q4_0.gguf")
model = GPT4All(model_path)

@app.route('/api/chat', methods=['POST'])
def chat():
    question = request.json.get('question', '')
    print(f"Received question: {question}")

    prompt = f"""
You are an expert about North Macedonian geography and culture. Be concise and clear. If unsure, say you don't know.

Question: {question}
Answer:"""

    try:
        response = model.generate(prompt, max_tokens=100)
        print(f"Generated response: {response}")
        return jsonify({"answer": response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"answer": "Sorry, I couldn't generate a response."}), 500
@app.route('/api/meals', methods=['POST'])
def suggest_meals():
    # This prompt is fixed, no user input needed
    prompt = """
Suggest meals for today in this format:
Breakfast: ...
Snack: ...
Lunch: ...
Dinner: ...
Dessert: ...
"""

    try:
        output = model.generate(prompt, max_tokens=300)
        print(f"Meal suggestions raw output:\n{output}")
        lines = output.strip().split("\n")
        suggestions = {}

        for line in lines:
            if ":" in line:
                key, val = line.split(":", 1)
                suggestions[key.strip()] = val.strip()

        return jsonify(suggestions)
    except Exception as e:
        print(f"Meal suggestion error: {e}")
        return jsonify({"error": "Could not generate meal suggestions."}),500

if __name__ == '__main__':
    app.run(port=5000)