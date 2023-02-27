# 이 Session을 통해 db라는 파라미터를 만들고 데이터베이스와 소통할 수 있다.
from sqlalchemy import *
from sqlalchemy.orm import Session
# from . import models, schemas
import models

import json
from collections import Counter

from datetime import datetime

def get_reviews(db: Session, store_id, start, end):
    # 긍정 리뷰 별점 기준 : 4점부터 긍정.
    POS_Rating = 4
    
    start *= 1000000
    end *= 1000000

    # 지정된 기간 내 플랫폼별 리뷰 조회
    reviews = db.query(models.reviews).filter(between(models.reviews.time, start, end)).all()

    def get_review_count(reviews):
        ratings = []
        for review in reviews:
            ratings.append((review.platform, review.rating))
        return ratings
    
    count = Counter(get_review_count(reviews))
    # count = Counter({('baemin', 5): 11, ('coupang', 5): 5, ('yogiyo', 5): 4, ('baemin', 4): 1, ('coupang', 3): 1})

    return count