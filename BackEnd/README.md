# Back-End Manual

## Usage
Install
```
$ pip install -r requirements.txt
```

Run
```
$ uvicorn main:app --reload
```
## API
Main Page
```
http://127.0.0.1:8000/reviews?store_id=0&start=20221201&end=20231201
```

Keyword Extraction
```
http://127.0.0.1:8000/keywords?storeId=0&startDate=20221201&endDate=20231201&platform=baemin
```
