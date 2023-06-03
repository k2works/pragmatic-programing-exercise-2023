from fastapi import FastAPI
from pydantic import BaseModel

from src.api.app.service import Service

app = FastAPI()
service = Service()


class IrisModle(BaseModel):
    sepal_length: int
    sepal_width: int
    petal_length: int
    petal_width: int


class CinemaModel(BaseModel):
    SNS1: int
    SNS2: int
    actor: int
    original: int


class SurvivedModel(BaseModel):
    Pclass: int
    Age: int
    SlibSp: int
    Parch: int
    Fare: float
    Sex: int


@app.get("/", tags=["Root"])
async def read_root():
    return {
        "message": "Welcome to my ml application, use the /docs route to proceed"
    }


@app.post("/iris", tags=["Iris"])
async def predict_iris(
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


@app.post("/cinema", tags=["Cinema"])
async def predict_cinema(
    model: CinemaModel,
):
    x = [[
        model.SNS1,
        model.SNS2,
        model.actor,
        model.original
    ]]
    resutl = service.predict_cinema(x)
    return resutl[0]


@app.post("/survived", tags=["Survived"])
async def predict_survived(
    model: SurvivedModel,
):
    x = [[
        model.Pclass,
        model.Age,
        model.SlibSp,
        model.Parch,
        model.Fare,
        model.Sex
    ]]
    result = service.predict_survived(x)
    return int(result[0])
