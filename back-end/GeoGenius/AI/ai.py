import os
import re
import gc
from flask import Flask, request, jsonify
from flask_cors import CORS
#from llama_cpp import Llama
from gpt4all import GPT4All

# ===== Setup =====
os.environ["TOKENIZERS_PARALLELISM"] = "false"

model_path = os.path.expanduser(r"C:\Users\Patriarch\AppData\Local\nomic.ai\GPT4All\Meta-Llama-3-8B-Instruct.Q4_0.gguf")
llm = GPT4All(model_path)

# ===== Flask setup =====
app = Flask(__name__)
CORS(app, supports_credentials=True)

# ===== Quiz Parser =====
def parse_quiz_output(text):
    # /"/"/"Parse raw LLM output into structured quiz questions."""

    text = re.sub(
        r"(Answer\s*[:\-]?\s*[A-Da-d]\))\s*\(\s*Note:.*?\)",
        r"\1", text, flags=re.IGNORECASE | re.DOTALL
    )

    if "Answer key" in text:
        main_part, answer_key = text.split("Answer key", 1)
    else:
        main_part, answer_key = text, ""

    answer_map = {}
    for line in answer_key.strip().splitlines():
        m = re.match(r"(\d+)\.\s*([A-Da-d])\)", line.strip())
        if m:
            answer_map[m.group(1)] = m.group(2).upper()

    main_part = "\n" + main_part
    blocks = re.split(r'\n(?:(?:Q|Question)?\s*)?\d+\s*(?:[:\.\)])', main_part)

    questions = []
    for i, blk in enumerate(blocks[1:], 1):
        try:
            blk = blk.strip()
            qm = re.match(r"(.*?)(?=\n[A-Da-d]\))", blk, re.DOTALL)
            question = qm.group(1).strip() if qm else "Question not found"
            lines = blk.splitlines()
            opts = []
            for ln in lines:
                if ln.strip().lower().startswith("answer"):
                    break
                opts += re.findall(r"\b([A-Da-d])\)\s+(.*)", ln)
            opts = opts[:4]
            ci = re.search(
                r"(?:Answer|Correct answer)\s*[:\-]?\s*([A-Da-d])\)", blk, re.IGNORECASE
            )
            correct = (ci.group(1).upper() if ci else answer_map.get(str(i)))
            questions.append({
                "question": question,
                "options": [opt for _, opt in opts],
                "correct": correct
            })
        except:
            continue

    if not questions:
        return {"message": "⚠️ Failed to parse quiz. Please try again."}
    return {"questions": questions}

# ===== Quiz Generator =====
def generate_quiz_from_topic(topic, num_q=5):
    """Generate quiz questions directly from a topic (no corpus)."""
    prompt = f"""

You are an expert in North Macedonian geography, culture, and history.

Generate {num_q} multiple-choice quiz questions about "{topic}".
Each question must have 4 options labeled A) to D), and include the correct answer like this:
Answer: B) <correct option>

Format example:
1. Question text
A) ...
B) ...
C) ...
D) ...
Answer: <letter>) <correct answer>

Only generate the quiz. Begin now.
"""
    response = llm.generate(
        prompt=prompt,
        max_tokens=1200,
        temp=0.4,
        top_p=0.7,
        repeat_penalty=1.1,
    )

    print("\n===== Raw model output =====\n", response.strip(), "\n===== End =====\n")
    gc.collect()
    return parse_quiz_output(response)

# ===== API Routes =====
@app.route("/quiz", methods=["POST"])
def quiz_api():
    data = request.get_json()
    topic = data.get("topic")
    if not topic:
        return jsonify({"error": "Missing topic"}), 400
    try:
        quiz = generate_quiz_from_topic(topic, num_q=5)
    except Exception as e:
        gc.collect()
        return jsonify({"error": f"Quiz generation failed: {e}"}), 500
    gc.collect()
    return jsonify(quiz)

@app.route("/", methods=["GET"])
def get_quiz():
    topic = request.args.get("topic")
    if not topic:
        return "<p>Please provide a topic using ?topic=YourTopic</p>"
    try:
        quiz = generate_quiz_from_topic(topic, num_q=5)
    except Exception:
        gc.collect()
        return "<p>⚠️ Failed to generate quiz. Please try again.</p>"
    gc.collect()
    html = ["<h2>Quiz:</h2><ol>"]
    for q in quiz.get("questions", []):
        html.append(f"<li><strong>{q['question']}</strong><ul>")
        for i, opt in enumerate(q["options"]):
            html.append(f"<li>{chr(65 + i)}) {opt}</li>")
        html.append(f"</ul><em>Answer: {q['correct']}</em></li>")
    html.append("</ol>")
    return "\n".join(html)


@app.route('/chat', methods=['POST'])
def chat():
    question = request.json.get('question', '')
    print(f"Received question: {question}")

    prompt = f"""
You are an expert about North Macedonian geography, culture and history. Be concise and clear. If unsure, say you don't know.

Question: {question}
Answer:"""

    try:
        response = llm.generate(prompt, max_tokens=100)
        print(f"Generated response: {response}")
        cutoff = response.find("Question:")
        if cutoff != -1:
            response = response[:cutoff].strip()

        print(f"Trimmed response: {response}")
        return jsonify({"answer": response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"answer": "Sorry, I couldn't generate a response."}), 500

# ===== Run Server =====
if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False, threaded=False)