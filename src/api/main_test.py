import unittest

from domain import Iris, Cinema, Survived


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


class TestSurvived(unittest.TestCase):

    def test_predict(self):
        seruvived = Survived()
        x = [[3, 22, 1, 0, 7.25, 1]]
        result = seruvived.predict(x)
        self.assertEqual(result[0], 0)


if __name__ == '__main__':
    unittest.main()
