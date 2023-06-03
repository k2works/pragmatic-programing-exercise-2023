from src.api.domain import Cinema, Iris


class Service:
    def __init__(self) -> None:
        pass

    def predict_iris(self, x):
        iris = Iris()
        return iris.predict(x)

    def predict_cinema(self, x):
        cinema = Cinema()
        return cinema.predict(x)
