from fastapi import FastAPI
from pydantic import BaseModel

from src.api.app.service import Service

app = FastAPI()
service = Service()


@app.get("/", tags=["Root"])
async def read_root():
    return {
        "message": "Welcome to my ml application, use the /docs route to proceed"
    }


class IrisModle(BaseModel):
    sepal_length: int
    sepal_width: int
    petal_length: int
    petal_width: int


@app.post("/iris", tags=["Iris"])
async def predict(
    model: IrisModle,
):
    x = [[
        model.sepal_length,
        model.sepal_width,
        model.petal_length,
        model.petal_width
    ]]
    resutl = service.predict_iris(x)
    return resutl[0]
