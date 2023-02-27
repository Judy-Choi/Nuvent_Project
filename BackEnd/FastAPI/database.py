# from sqlalchemy import *
# from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from os import environ
from dotenv.main import load_dotenv

load_dotenv()

# DB 접속 URL
DB_URL = '{}://{}:{}@{}:{}/{}'.format(
    environ['DB_TYPE'],
    environ['DB_USER'],
    environ['DB_PASSWORD'],
    environ['DB_HOST'],
    environ['DB_PORT'],
    environ['DB_NAME'],
)

engine = create_engine(DB_URL)
# 각각의 SessionLocal 클래스 객체는 데이터베이스의 세션이 된다.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# declarative_base() 함수를 이용하여 클래스 하나를 리턴받자.
# 추후 우리는 이 클래스를 상속받아 데이터베이스의 모델이나 ORM 클래스를 생성할 것이다.
Base = declarative_base()