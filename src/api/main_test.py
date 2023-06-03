import unittest

from domain import Iris


class TestIris(unittest.TestCase):

    def test_predict(self):
        iris = Iris()
        x = [[1.4, 2.3, 4.4, 2.3]]
        result = iris.predict(x)
        self.assertEqual(result[0], "Iris-virginica")


if __name__ == '__main__':
    unittest.main()
