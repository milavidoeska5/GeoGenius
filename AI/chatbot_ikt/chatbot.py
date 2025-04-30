import os
from langchain_community.llms import LlamaCpp
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler


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
    callbacks=[StreamingStdOutCallbackHandler()],  # <<< this prints as it generates
    verbose=True,
    max_tokens=170
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

# ==== Split texts into chunks ====
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,   # adjust if needed
    chunk_overlap=50,
)
split_docs = text_splitter.split_documents(all_documents)

# ==== Create / Load Chroma Vectorstore ====
# ==== Create or Load Chroma Vectorstore ====
if os.path.exists(chroma_db_folder) and len(os.listdir(chroma_db_folder)) > 0:
    # Load existing DB
    print("🔵 Loading existing ChromaDB...")
    vectorstore = Chroma(
        persist_directory=chroma_db_folder,
        embedding_function=embeddings,
    )
else:
    # Create new DB
    print("🟡 Creating new ChromaDB...")
    vectorstore = Chroma.from_documents(
        documents=split_docs,
        embedding=embeddings,
        persist_directory=chroma_db_folder,
    )
    vectorstore.persist()  # IMPORTANT: save it permanently

# ==== Define custom prompt ====
custom_prompt = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are an expert on Macedonian history, geography, and culture.

Answer the following question using only the context below.
If you don't know the answer, just say "I don't know."
Keep the answer short and precise.

Context:
{context}

Question:
{question}

Answer:"""
)


# ==== Create Retrieval-based QA Chain ====
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",    # simple, all context stuffed into one prompt
    retriever=vectorstore.as_retriever(),
    return_source_documents=True,
    chain_type_kwargs={"prompt": custom_prompt},
)

# ==== Ask questions ====
while True:
    query = input("\nAsk a question (or type 'exit'): ")
    if query.lower() == "exit":
        break
    result = qa_chain.invoke({"query": query})
    print("\n")