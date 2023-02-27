import uvicorn

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud, models
from database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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

# http://127.0.0.1:8000/reviews?store_id=0&start=20221201&end=20231201
@app.get("/")
async def get_reviews(store_id: int = 0, start: int = 20221201, end: int = 20230101, db: Session = Depends(get_db)):
    products = crud.get_reviews(db, store_id=store_id, start=start, end=end)
    return products

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)