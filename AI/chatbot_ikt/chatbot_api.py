import os
from flask import Flask, request, jsonify
from langchain_community.llms import LlamaCpp
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from langchain.chains import create_history_aware_retriever, create_retrieval_chain
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain_core.runnables import RunnablePassthrough
from flask import send_from_directory
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_history_aware_retriever
from flask_cors import CORS


# ==== Flask API ====
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})




# ==== Paths ====
local_model_path = os.path.expanduser("~/Library/Application Support/nomic.ai/GPT4All/Meta-Llama-3-8B-Instruct.Q4_0.gguf")
wikipedia_folder = "wikipedia_articles"
chroma_db_folder = "chroma_db"

# ==== Load local Llama model ====
llm = LlamaCpp(
    model_path=local_model_path,
    n_ctx=4096,
    temperature=0.7,
    top_p=0.95,
    streaming=True,
    callbacks=[StreamingStdOutCallbackHandler()],
    verbose=True,
    max_tokens=110
)

# ==== Load HuggingFace Embeddings ====
embeddings = HuggingFaceEmbeddings(model_name='BAAI/bge-large-en-v1.5')

# ==== Load and split Wikipedia articles ====
all_documents = []
for filename in os.listdir(wikipedia_folder):
    file_path = os.path.join(wikipedia_folder, filename)
    if filename.endswith(".txt"):
        loader = TextLoader(file_path, encoding='utf-8')
        docs = loader.load()
        all_documents.extend(docs)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50,
)
split_docs = text_splitter.split_documents(all_documents)

# ==== Create / Load Chroma Vectorstore ====
if os.path.exists(chroma_db_folder) and len(os.listdir(chroma_db_folder)) > 0:
    print("🔵 Loading existing ChromaDB...")
    vectorstore = Chroma(
        persist_directory=chroma_db_folder,
        embedding_function=embeddings,
    )
else:
    print("🟡 Creating new ChromaDB...")
    vectorstore = Chroma.from_documents(
        documents=split_docs,
        embedding=embeddings,
        persist_directory=chroma_db_folder,
    )
    vectorstore.persist()

# ==== Memory for conversation ====
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)


# ==== Question Rewriting Chain ====
question_gen_prompt = PromptTemplate(
    input_variables=["chat_history", "input"],
    template="""
Given the following conversation and a follow-up question, rephrase the follow-up question to be a standalone question.

Chat History:
{chat_history}
Follow-Up Input: {input}

Standalone question:
"""
)


question_generator_chain = llm | question_gen_prompt | RunnablePassthrough()

# ==== Create history-aware retriever ====
retriever = create_history_aware_retriever(
    retriever=vectorstore.as_retriever(),
    llm=llm,
    prompt=question_gen_prompt

)

# ==== Combine documents chain (final answer chain) ====
custom_prompt = PromptTemplate(
    input_variables=["context", "input"],
    template="""You are an expert on Macedonian history, geography, and culture.

Answer the question using ONLY the context provided.
If you don't know, say you don't know.
Be short and precise.

Context:
{context}

Question:
{input}

Answer:"""
)

combine_docs_chain = create_stuff_documents_chain(llm=llm, prompt=custom_prompt)

# ==== Create the final retrieval QA chain ====
qa_chain = create_retrieval_chain(retriever=retriever, combine_docs_chain=combine_docs_chain)



import traceback

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json['question']
        print("📥 Received question:", user_input)
        
        response = qa_chain.invoke({
            'input': user_input,
            'chat_history': memory.chat_memory.messages
        })
        
        print("📤 Response from model:", response)
        return jsonify({'answer': response['answer']})
    
    except Exception as e:
        print("❌ ERROR in /chat route")
        traceback.print_exc()  # Prints full error
        return jsonify({'answer': 'Internal server error'}), 500




if __name__ == "__main__":
    app.run(port=5000)
