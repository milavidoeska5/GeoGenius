import os
# Prevent tokenizers from spawning subprocesses on macOS
os.environ["TOKENIZERS_PARALLELISM"] = "false"

import re
import gc
from llama_cpp import Llama
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)




# ======= MODEL & CORPUS SETUP =======
INPUT_DIR = '/Users/marijazografska/Desktop/FINKI/Upravuvanje IKT/GeoGenius/GeoGenius/AI/chatbot_ikt/wikipedia_articles'
MODEL_PATH = os.path.expanduser(
    "~/Library/Application Support/nomic.ai/GPT4All/Meta-Llama-3-8B-Instruct.Q4_0.gguf"
)

# Initialize Llama model
llm = Llama(
    model_path=MODEL_PATH,
    n_ctx=4096,
    n_threads=1,
    verbose=False,
)

def load_all_articles(input_dir):
    """Load all .txt articles into a corpus dict."""
    corpus = {}
    for fname in os.listdir(input_dir):
        if fname.endswith('.txt'):
            topic = os.path.splitext(fname)[0]
            with open(os.path.join(input_dir, fname), 'r', encoding='utf-8') as f:
                corpus[topic] = f.read()
    return corpus

def retrieve_relevant_text(corpus, query, max_chars=3500):
    """Retrieve paragraphs containing the query, truncated to max_chars."""
    query_lower = query.lower()
    matches = [
        para.strip()
        for text in corpus.values()
        for para in text.split('\n')
        if query_lower in para.lower()
    ]
    return '\n'.join(matches)[:max_chars] or "No relevant information found."

def parse_quiz_output(text):
    """Parse the raw model output into structured questions."""
    text = re.sub(
        r"(Answer\s*[:\-]?\s*[A-Da-d]\))\s*\(\s*Note:.*?\)",
        r"\1",
        text,
        flags=re.IGNORECASE|re.DOTALL
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
    blocks = re.split(r'\n(?:(?:Q|Question)\s*)?\d+\s*(?:[:\.\)])', main_part)

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
                r"(?:Answer|Correct answer)\s*[:\-]?\s*([A-Da-d])\)",
                blk,
                re.IGNORECASE
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

def generate_quiz(article_text, num_q=5):
    """Generate a quiz from article_text using the Llama model."""
    article_text = article_text[:3500]
    prompt_body = f"""
Create {num_q} multiple-choice quiz questions about North Macedonian geography.
Only use Macedonian geography terms from the provided text.
Each question must have 4 answer options labeled A) to D), and the correct answer must be indicated in this format:
Answer: A) <correct answer>

TEXT:
\"\"\"
{article_text}
\"\"\"
"""
    response = llm(
        prompt=prompt_body,
        max_tokens=1200,
        temperature=0.4,
        top_p=0.9,
        repeat_penalty=1.1,
    )
    result_text = response['choices'][0]['text']
    # Debug output
    print("\n===== Raw model output =====\n", result_text.strip(), "\n===== End =====\n")
    gc.collect()
    return parse_quiz_output(result_text)

# Load corpus once
corpus = load_all_articles(INPUT_DIR)



@app.route("/quiz", methods=["POST"])
def quiz_api():
    data = request.get_json()
    topic = data.get("topic")
    if not topic:
        return jsonify({"error": "Missing topic"}), 400
    context = retrieve_relevant_text(corpus, topic)
    if context == "No relevant information found.":
        return jsonify({"message": "No relevant info found."}), 404
    try:
        quiz = generate_quiz(context, num_q=5)
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
    context = retrieve_relevant_text(corpus, topic)
    if context == "No relevant information found.":
        return f"<p>No relevant info found for topic: {topic}</p>"
    try:
        quiz = generate_quiz(context, num_q=5)
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

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True, use_reloader=False, threaded=False)
