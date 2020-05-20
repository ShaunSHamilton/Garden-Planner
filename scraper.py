from bs4 import BeautifulSoup
from selenium import webdriver
import requests
import json
import time
### GLOBAL VARIABLES
URL = "https://www.thompson-morgan.com/vegetables/vegetable-seeds"
baseURL = "https://www.thompson-morgan.com"
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"}

driver = webdriver.Chrome()
# plants: ["title"img"desc"sowDesc"sowMonths""harvestMonths""floweringMonths"]
# categories: [title, img, numProducts]
categoriesURLS = []
plantsURLS = []
plants = []
def scrape():
    try:
        cats = requests.get(URL,headers=headers)
        soup = BeautifulSoup(cats.content,'html.parser')
    except:
        print("ERROR GETTING CATS")
    else:
        for ref in soup.select('div.landing > div.lanBox > a'):
            categoriesURLS.append(baseURL + ref['href'])
        # print("CATS: ",categoriesURLS)

    for cat in categoriesURLS:
        try:
            # main = requests.get(cat,headers=headers)
            driver.get(cat)
            time.sleep(5)
            liquid = BeautifulSoup(driver.page_source, 'html.parser')
        except:
            print(f"ERROR on page {cat}")
        else:
            # print(liquid.select('#allProds > div:nth-child(1) > div.prod-details > p.prodTitle > a'))
            for ref in liquid.select('#allProds > div.prodbox > div.prod-details > p.prodTitle > a'):
                plantsURLS.append(baseURL+ref['href'])
            # print("PLANTS: ",plantsURLS,end='\n')

    for url in plantsURLS:
        try:
            main = requests.get(url,headers=headers)
            liquid = BeautifulSoup(main.content, 'html.parser')
        except:
            print(f"ERROR on page {url}")
        else:
            try:
                title = liquid.select('div.buybox > div.prod-lead > h1')[0].text
                category = liquid.select('#crumbs > b:last-child > a > b')[0].text
                img = baseURL + liquid.select('div.prodimage > div.mainImage > img:nth-child(1)')[0]['src']
                desc = liquid.select('#description > div')[0].text
                sowDesc = liquid.select('#sowing')[0].text
                sowMonths = [i for (i,span) in enumerate(liquid.select('body > div.wrapper > div.inner.product > div.detailsSection > div.periodic > div.newPeriods > div:nth-child(2) > span')) if span.attrs]
                floweringMonths = [i for (i,span) in enumerate(liquid.select('body > div.wrapper > div.inner.product > div.detailsSection > div.periodic > div.newPeriods > div:nth-child(3) > span')) if span.attrs]
                harvestMonths = [i for (i,span) in enumerate(liquid.select('body > div.wrapper > div.inner.product > div.detailsSection > div.periodic > div.newPeriods > div:nth-child(4) > span')) if span.attrs]
            except:
                print(f"ERROR on {url}")
            else:
                plantDict = dict(title=title,category=category,img=img,desc=desc,sowDesc=sowDesc,sowMonths=sowMonths,floweringMonths=floweringMonths,harvestMonths=harvestMonths)
                plants.append(plantDict)

scrape()
time.sleep(5)
driver.quit()
print(plants[0])
try:
    myJson = json.dumps(plants)
    f = open("plantData.json","w")
    f.write(myJson)
    f.close()
except:
    print("ERROR WITH FILE")