from datetime import datetime
from bs4 import BeautifulSoup
from fetcher import fetch_page
from parser import parse_html
import os
import json

def extract_list_cards(soup):
    card_list = []
    super_parent_div = soup.find('div', class_='[grid-area:main] p-6 lg:p-8 [[data-flux-container]_&]:px-0')
    print("Gradn parent found:", bool(super_parent_div))
    if not super_parent_div:
        return card_list
    parent_div = super_parent_div.find('div', class_="mx-auto w-full [:where(&)]:max-w-7xl px-6 lg:px-8")
    print("Parent div found:", bool(parent_div))
    if not parent_div:
        return card_list
    main_div = parent_div.select("div.mt-6.grid")[1]
    print("Main div found:", bool(main_div))
    if not main_div:
        return card_list
    cards = main_div.find_all("a", class_="flex flex-col gap-2")
    print("Cards found:", len(cards))
    for card in cards:
        card_link = card['href']
        img_src = card.find('img')['src']
        title = card.find('img')['title']
        card_info = {
            "title":title,
            "img_src":img_src,
            "card_link":card_link
        }
        card_list.append(card_info)
    
    return card_list



from time import sleep

def extract_github_repo(data:list):
    print("Extracting GitHub repos from data...")

    for item in data:
        sleep(5)  # Sleep to avoid rate limiting
        print(f"Processing item: {item}")
        data = fetch_page(item['card_link'])
        soup = parse_html(data)
        sleep(3)
        super_parent_div = soup.find('div', class_='[grid-area:main] p-6 lg:p-8 [[data-flux-container]_&]:px-0')
        if not super_parent_div:
            print(f"Super parent div not found for {item['title']}")
            item['github_repo'] = None
            continue
        print("next")
        parent_div = super_parent_div.find('div', 'mx-auto w-full [:where(&)]:max-w-7xl px-6 lg:px-8')

        div = parent_div.select_one("div.flex.flex-col.gap-4")
        inner_div = div.select('div')
        repo_link= None
        for d in inner_div:
            a = d.find("a")
            
            if a and "github.com" in a.get("href",""):
                print("Found :",a)
                repo_link = a["href"]

        print(repo_link)

        # Temprory storage incase of server failure or ratelimited
        filepath=os.path.join(os.getcwd(),"temprory_github_links_2.json")
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'r') as f:
            try:
                existing_data = json.load(f) or []
            except json.JSONDecodeError:
                existing_data = []  

        with open(filepath, 'w') as f:
                data ={
                    "title":item['title'],
                    "img_src":item['img_src'],
                    "card_link":item['card_link'],
                    "github_repo":repo_link
                }
                existing_data.append(data)
                json.dump(existing_data, f, indent=4)
        sleep(4)

        if repo_link:
            item['github_repo'] = repo_link
            print(f"Found GitHub repo for {item['title']}: {item['github_repo']}")
        else:
            item['github_repo'] = None
            print(f"No GitHub repo found for {item['title']}")
    return data