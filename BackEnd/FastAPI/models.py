from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship

from database import Base

class reviews(Base):
    __tablename__ = "reviews"
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String)
    rating = Column(Integer)
    content = Column(String)
    time = Column(DateTime)
    
class keywords(Base):
    __tablename__ = "keywords"
    id = Column(Integer, primary_key=True, index=True)
    review_id = Column(Integer)
    keyword = Column(String)