# 이 Session을 통해 db라는 파라미터를 만들고 데이터베이스와 소통할 수 있다.
from sqlalchemy import *
from sqlalchemy.orm import Session
# from . import models, schemas
import models

import json
from collections import Counter

from datetime import datetime, timedelta


def get_reviews(db: Session, store_id, start, end):    
    # 지정된 기간 내 플랫폼별 리뷰 조회
    reviews = db.query(models.reviews).filter(between(models.reviews.time, start, end)).all()
    
    #############################################################################################
    # 날짜당 플랫폼별 리뷰 총합
    def get_daily_count(start, end, reviews):
        main_chart = []
        
        start = datetime.strptime(str(start), "%Y%m%d")
        end = datetime.strptime(str(end), "%Y%m%d")
        dates = [(start + timedelta(days=i)).strftime("%Y%m%d") for i in range((end-start).days+1)]
        
        for date in dates:
            day = {"date" : date, "baemin" : 0, "yogiyo" : 0, "coupang" : 0}
            for review in reviews:
                if review.time.strftime("%Y%m%d") == date:
                    day[review.platform] += 1
            main_chart.append(day)
        return main_chart
    

    #############################################################################################
    # 기간 내 플랫폼 별점의 총합
    def get_all_count(reviews):
        ratings = []
        for review in reviews:
            ratings.append((review.platform, review.rating))
        # return ratings
        
        count = Counter(ratings)
        
        # 플랫폼별 별점 갯수 카운트
        all_count = {}    
        platform_list = ["baemin", "yogiyo", "coupang"]
        
        for platform in platform_list:
            platform_ratings = []
            for i in range(1, 6):
                try:
                    platform_ratings.append(count[(platform,i)])
                except:
                    platform_ratings.append(0)
                    
            all_count[platform] = platform_ratings
        return all_count
    
    #############################################################################################
    daily_count = get_daily_count(start, end, reviews)
    all_count = get_all_count(reviews)
    
    return_json = {"daily_count" : daily_count, "all_count" : all_count}
    return return_json