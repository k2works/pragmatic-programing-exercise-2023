from src.api.domain import Iris


class Service:
    def __init__(self) -> None:
        pass

    def predict_iris(self, x):
        ml = Iris()
        return ml.predict(x)
