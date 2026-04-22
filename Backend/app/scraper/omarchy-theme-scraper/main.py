from fetcher import fetch_page
from extractor import extract_list_cards , extract_github_repo
from parser import parse_html
from storage import store_data
import json
import os

# Start from main.py it extracts all the theme to omarchy dumps and then start scrapping each page and slowly
# and store it to temp github link 2.json once the process ends or failure happens on network side

# URL of omarchy themes page
URL="https://omarchythemes.com/"

# html = fetch_page(URL)
# soup = parse_html(html)

# data = extract_list_cards(soup)
filename = "omarchy_themes.json"
# store_data(data, filename)
print(f"Data stored in {os.path.join(os.getcwd(), 'omarchy_dumps', filename)}")


# GitHub repo extraction logic
file = os.path.join(os.getcwd(), "omarchy_dumps", filename)
with open(file, "r") as f:
    data = json.load(f)

# updated_data_list = extract_github_repo(data)
updated_data_list = data

id = 0

for theme in data:
    id+=1
    theme["id"]=id
    


store_data(updated_data_list, filename)
print(f"Updated data with GitHub repos stored in {os.path.join(os.getcwd(), 'omarchy_dumps', filename)}")
