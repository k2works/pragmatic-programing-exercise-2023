import unittest

from domain import Iris, Cinema


class TestIris(unittest.TestCase):

    def test_predict(self):
        iris = Iris()
        x = [[1.4, 2.3, 4.4, 2.3]]
        result = iris.predict(x)
        self.assertEqual(result[0], "Iris-virginica")


class TestCinema(unittest.TestCase):

    def test_predict(self):
        cinema = Cinema()
        x = [[291, 1044, 8808.994, 0]]
        result = cinema.predict(x)
        self.assertEqual(result[0], 9632.416575385569)


if __name__ == '__main__':
    unittest.main()
