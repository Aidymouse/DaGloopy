from pathlib import Path
import sys
import shutil
import os
import re

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

p = Path(sys.path[0]+"/../../public/content")


# Read content dirs and assemble shelves
content_files = list(p.glob("./**/*"))

shelves = {}

for path in content_files:
    content_url = str(path).replace(sys.path[0]+"/../../public/", "")

    shelf = content_url.split("/")[-2]

    if (shelf == "content"): continue

    article_title = (".".join(content_url.split(".")[:-1])).split("/")[-1]
    print(f"{bcolors.OKBLUE}{shelf}{bcolors.ENDC}: {article_title}")

    filetype = content_url.split(".")[-1] # Don't lie to me!

    # TODO: tag parsing on md files to sort by date

    article_html = f'''
<article
    class="book"
    draggable="true"
    ondragstart="book_dragstart(event)"
    ondragend="book_dragend(event)"
    onpointerup="book_pointerup(event)"
    data-contenturl="{content_url}"
    data-title="{article_title}"
>
    <h2>{article_title}</h2>
</article>
    '''

    if shelf not in shelves:
        shelves[shelf] = ""

    shelves[shelf] += article_html

#print(shelves)

print()

# Copy index (so we dont lose it!)
try:
    os.mkdir(f"{sys.path[0]}/../../backup")
except FileExistsError: 
    print("Backup folder already exists")

shutil.copy(f"{sys.path[0]}/../../index.html", f"{sys.path[0]}/../../backup/index.html")

# Write shelves into index html in designated place
data = ""
with open(f"{sys.path[0]}/../../index.html", "r") as indexHtml:
    data = indexHtml.read()

shelf_template = '''<!-- SHELF: shelftitle -->
shelfcontent
<!-- STOP SHELF: shelftitle -->
'''

shelf_regex = r'<!-- SHELF: shelftitle -->(.|\n)*<!-- STOP SHELF: shelftitle -->'

seen_shelves = []

print()

for shelf in shelves:
    shelf_html = shelves[shelf]

    if not re.search(shelf_regex.replace("shelftitle", shelf), data):
        print(f"{bcolors.FAIL}Hey! No {shelf}{bcolors.ENDC} shelf")
    else:
        data = re.sub(
                shelf_regex.replace("shelftitle", shelf),
                shelf_template.replace("shelftitle", shelf).replace("shelfcontent", shelf_html),
                data,
                flags=re.M)
    

        print(f"Seen shelf: {shelf}")
        seen_shelves.append(shelf)

with open(f"{sys.path[0]}/../../index.html", "w") as writeIndex:
    writeIndex.write(data)
    
