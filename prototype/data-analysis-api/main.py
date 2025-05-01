from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"Data analyse API status": "Werkt"}
