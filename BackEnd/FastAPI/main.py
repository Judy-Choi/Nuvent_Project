import uvicorn

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, models
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET /api/reviews?지점={}&startDate={}&endDate={}
# http://127.0.0.1:8000/reviews?storeId=0&startDate=20221201&endDate=20231201
@app.get("/reviews")
async def get_reviews(storeId: int = 0, startDate: int = 20221201, endDate: int = 20230101, db: Session = Depends(get_db)):
    products = crud.get_reviews(db, store_id=storeId, start=startDate, end=endDate)
    return products

# http://127.0.0.1:8000/keywords?storeId=0&startDate=20221201&endDate=20231201&platform=baemin
@app.get("/keywords")
async def get_keywords(storeId: int = 0, startDate: int = 20220101, endDate: int = 20231201, platform: str = "baemin", db: Session = Depends(get_db)):
    keywords = crud.get_keywords(db, store_id=storeId, start=startDate, end=endDate, platform = platform)
    return keywords

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)