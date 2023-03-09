# 이 Session을 통해 db라는 파라미터를 만들고 데이터베이스와 소통할 수 있다.
from sqlalchemy import *
from sqlalchemy.orm import Session
# from . import models, schemas
import models

import json
from collections import Counter

from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

from sklearn.feature_extraction.text import TfidfVectorizer

def get_reviews(db: Session, store_id, start, end):    
    # 지정된 기간 내 플랫폼별 리뷰 조회
    reviews = db.query(models.reviews).filter(between(models.reviews.time, start, end)).all()
    
    #############################################################################################
    # 날짜당 플랫폼별 리뷰 총합
    def get_daily_count(start, end, reviews):
        main_chart = []
        
        start = datetime.strptime(str(start), "%Y%m%d")
        end = datetime.strptime(str(end), "%Y%m%d")
        
        # 조회 기간의 총 일자 수
        days = (end - start).days
        
        # 월별 리뷰 수 카운트
        if days > 28:               
            
            dates = {(start + timedelta(days=i)).strftime("%Y%m") for i in range((end-start).days+1)}
            
            dates = list(dates)
            dates.sort()
            
            for date in dates:            
                month_dic = {"month" : date, "baemin" : 0, "yogiyo" : 0, "coupang" : 0}
                for review in reviews:
                    if review.time.strftime("%Y%m") == date:
                        month_dic[review.platform] += 1
                main_chart.append(month_dic)               
            return main_chart

        
        # 주별 리뷰 수 카운트        
        elif days > 7:        
            dates = {str((start + timedelta(days=i)).isocalendar().year) + '-' + \
                str((start + timedelta(days=i)).isocalendar().week) \
                    for i in range((end-start).days+1)}
            
            dates = list(dates)
            dates.sort()
            
            for date in dates:
                day = {"week" : date, "baemin" : 0, "yogiyo" : 0, "coupang" : 0}
                for review in reviews:
                    year_week = str(review.time.year) + '-' + str(review.time.isocalendar().week)
                    if year_week == date:
                        day[review.platform] += 1
                main_chart.append(day)
            return main_chart
        
        # 일별 리뷰 수 카운트
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
    def get_platform_count(reviews):
        ratings = []
        for review in reviews:
            ratings.append((review.platform, review.rating))
        
        count = Counter(ratings)
        
        # 플랫폼별 별점 갯수 카운트
        platform_count = {}    
        platform_list = ["baemin", "yogiyo", "coupang"]
        
        for platform in platform_list:
            platform_ratings = []
            for i in range(1, 6):
                try:
                    platform_ratings.append(count[(platform,i)])
                except:
                    platform_ratings.append(0)
                    
            platform_count[platform] = platform_ratings
        return platform_count
        
    # 플랫폼별 감정분류
    def get_sentiment_count(reviews):
        POS_score = 4
        senteiment_ratings = []
        ratings = []
        for review in reviews:
            ratings.append((review.platform, review.rating))
        
        count = Counter(ratings)
            
        platform_list = ["baemin", "yogiyo", "coupang"]
        for platform in platform_list:
            pos_count = 0
            neg_count = 0
            for i in range(1, POS_score):
                try:
                    neg_count += count[(platform,i)]
                except:
                    pass
            for i in range(POS_score, 6):
                try:
                    pos_count += count[(platform,i)]
                except:
                    pass
                    
            senteiment_ratings.append({"platform" : platform, "positive" : pos_count, "negative" : neg_count})
        return senteiment_ratings
    
    #############################################################################################
    period_count = get_daily_count(start, end, reviews)
    platform_count = get_platform_count(reviews)
    senteiment_ratings = get_sentiment_count(reviews)
    
    return_json = {"period_count" : period_count, "platform_count" : platform_count, "senteiment_ratings" : senteiment_ratings}
    # return_json = json.dumps(return_json)
    return return_json

def get_keywords(db: Session, store_id, start, end, platform):
    
    # 리턴할 최대 키워드 갯수
    MAX_keywords = 5
    
    # 지정된 기간 내 플랫폼별 키워드 조회
    keywords = db.query(models.keywords.keyword).\
        join(models.reviews, models.reviews.id == models.keywords.review_id).\
        filter(and_(between(models.reviews.time, start, end), \
        (models.reviews.platform == platform))).all()
    
    keywords = [keyword[0] for keyword in keywords]
    
    # 빈도수 기반 키워드 카운트
    # count = Counter(keywords).most_common(MAX_keywords)

    # TF-IDF를 자동으로 계산
    Tfidf_vect = TfidfVectorizer(max_features = MAX_keywords)
    Tfidf_vect.fit(keywords)
    # Tfidf_voca = Tfidf_vect.vocabulary_
    Tfidf_keywords =  Tfidf_vect.get_feature_names_out()
    
    result = {"keywords" : list(Tfidf_keywords)}
    return result
