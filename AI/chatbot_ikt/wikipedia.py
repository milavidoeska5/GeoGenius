import wikipediaapi
import os

# Initialize Wikipedia API with User-Agent
wiki_wiki = wikipediaapi.Wikipedia(
    language='en',
    user_agent='MarijaZografska-Bot/0.1 (https://github.com/marijazografska)'
)

# "Skopje","Skopje Fortress","North Macedonia", "Stone Bridge","Millennium Cross (Skopje)","Vodno","Ohrid","Lake Ohrid","Matka Canyon","Mount Korab","Markovi Kuli","Bitola","Kokino","Kruševo","Prilep","Samuil's Fortress","Church of St. Sophia", "Church of St. John at Kaneo", "Monastery of Saint Naum", "Robevi family house" , "Plaošnik","Vardar River"
topics = ["Stone Bridge (Skopje)","Skopje","Skopje Fortress","North Macedonia", "Stone Bridge","Millennium Cross (Skopje)","Vodno","Ohrid","Lake Ohrid","Matka Canyon","Mount Korab","Markovi Kuli","Bitola","Kokino","Kruševo","Prilep","Samuil's Fortress","Church of St. Sophia", "Church of St. John at Kaneo", "Monastery of Saint Naum", "Robevi family house" , "Plaošnik","Vardar River","Širok Sokak","Heraclea Lyncestis","Kratovo","Mečkin Kamen","Ilinden (memorial)","Struga","Strumica","Pelister","Mavrovo","Galičica","Tikveš","Radika","Galičnik"]

# Function to scrape Wikipedia articles
def scrape_wikipedia_articles(topics):
    articles = []
    for topic in topics:
        page = wiki_wiki.page(topic)
        if page.exists():
            print(f"Scraping article: {topic}")
            content = f"Title: {topic}\n\n{page.text}"
            articles.append(content)
        else:
            print(f"Article not found: {topic}")
    return articles

# Scrape the articles
documents = scrape_wikipedia_articles(topics)


# Directory to save the articles
save_directory = "wikipedia_articles"

# Create the directory if it doesn't exist
os.makedirs(save_directory, exist_ok=True)

# Function to save each article as a separate text file
def save_articles_separately(documents, topics):
    for topic, content in zip(topics, documents):
        # Sanitize filename by replacing spaces with underscores
        filename = f"{topic.replace(' ', '_')}.txt"
        filepath = os.path.join(save_directory, filename)
        
        # Write the content to the file
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"Saved: {filepath}")

# Save the articles
save_articles_separately(documents, topics)
