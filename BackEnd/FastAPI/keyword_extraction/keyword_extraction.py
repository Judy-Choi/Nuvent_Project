import argparse
import sys
import pandas as pd
from tqdm import tqdm
from sklearn.feature_extraction.text import TfidfVectorizer
from tqdm import tqdm
from konlpy.tag import Okt

parser = argparse.ArgumentParser(description='Process some integers.')
parser = argparse.ArgumentParser()
parser.add_argument("-p", "-platform", dest="platform", action="store")
args = parser.parse_args()
platform = args.platform

if not platform:
    sys.exit("Wrong number of arguments")

# sample_path = f"BackEnd/FastAPI/keyword_extraction/sample_dataset/{platform}.json"
sample_path = "/Users/judy/Documents/__Wecode__/__Nuvent__/wecode_project2/BackEnd/FastAPI/keyword_extraction/sample_dataset/baemin.json"

# 리뷰 추출
df = pd.read_json(sample_path)
df_contents = df['contents'].values.tolist()

def get_kewords(df_contents):
    okt = Okt()
    bulk_insert = []
    keywords = []
    for i, review in tqdm(enumerate(df_contents)):
        review = review.rstrip()
        review = review.replace('\n', ' ')
        for word in okt.pos(review, stem=True): #어간 추출
            if word[1] in ['Noun', 'Adjective']: #명사, 형용사만 추출
                # 문장 : token 형태로 저장할 경우
                # bulk_insert.append(str(i+1) + '\t' + review + '\t' + word[0] + '\n')
                
                # 문장 : token1 token2 token3.. 형태로 저장할 경우
                keywords.append(word[0])
        # 문장 : token1 token2 token3.. 형태로 저장할 경우
        bulk_insert.append(str(i+1) + '\t' + review + '\t' + '\t'.join(keywords) + '\n')
                
    return bulk_insert

bulk_insert = get_kewords(df_contents)

with open(f"{platform}_keywords.txt", 'w') as file:
    file.writelines(bulk_insert)