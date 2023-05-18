# %% [markdown]
# # Python基本文法の復習
# %%
import unittest
import doctest

# %% [markdown]
# ## Python基本文法の習熟度を確認する練習問題
#
# ### 式と変数
# #### 練習1-1
# BMIを計算して表示するプログラムを作成せよ。
# BMIとは次の式で求められる人の肥満度を表す体格指数です。
# BMI = 体重(kg) ÷ (身長(m) × 身長(m))
# %%

class Test1_1(unittest.TestCase):
    def test_bmi(self):
        self.assertEqual(bmi(170, 60), 20.761245674740486)
        self.assertEqual(bmi(180, 70), 21.604938271604937)
        self.assertEqual(bmi(160, 50), 19.531249999999996)

def bmi(height, weight):
    """
    >>> bmi(170, 60)
    20.761245674740486
    >>> bmi(180, 70)
    21.604938271604937
    >>> bmi(160, 50)
    19.531249999999996
    """
    return weight / (height / 100) ** 2

doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# ### コレクション
# #### 練習2-1
# 次の各要件のために用いるコレクションとして、一般的に最も妥当と思われるものを、リスト、セット、ディクショナリから選んでください。ただし、コレクションはネスト（多重）にせず１つのみを利用するものとします。
# %%
class Test2_1(unittest.TestCase):
    def test_47都道府県についての都道府県と人口(self):
        self.assertEqual(population_of_prefecture("東京都"), 13942856)
        self.assertEqual(population_of_prefecture("大阪府"), 8839469)
        self.assertEqual(population_of_prefecture("北海道"), 5381733)

    def test_解析に用いるための過去28日分の１日当たりのWebサイトのアクセス数(self):
        self.assertEqual(
            daily_accesses_of_28days(),
            [100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122,
             124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144,
             146, 148, 150, 152]
        )

    def test_北や南といった４つの方向(self):
        self.assertEqual(directions(), ["北", "南", "東", "西"])

    def test_この世に存在するメジャーなプログラミング言語の名称(self):
        self.assertEqual(
            programming_languages(),
            ["Python", "Ruby"]
        )

    def test_ある航空機の200ある座標の予約状況(self):
        """0なら空き、1なら予約済み"""
        self.assertEqual(
            len(reservation_status_of_200_seats()),
            200
        )

def population_of_prefecture(prefecture):
    """
    >>> population_of_prefecture("東京都")
    13942856
    >>> population_of_prefecture("大阪府")
    8839469
    >>> population_of_prefecture("北海道")
    5381733
    """
    return {
        "東京都": 13942856,
        "大阪府": 8839469,
        "北海道": 5381733,
    }[prefecture]

def daily_accesses_of_28days():
    """
    >>> daily_accesses_of_28days()
    [100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148, 150, 152]
    """
    return list(range(100, 153, 2))

def directions():
    """
    >>> directions()
    ['北', '南', '東', '西']
    """
    return ["北", "南", "東", "西"]

def programming_languages():
    """
    >>> programming_languages()
    ['Python', 'Ruby']
    """
    return ["Python", "Ruby"]

def reservation_status_of_200_seats():
    """
    >>> len(reservation_status_of_200_seats())
    200
    """
    return [0] * 200

doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# #### 練習2-2
# 次のアルゴリズム手順に従って、プログラムを作成してください。
# 1. 3科目の試験得点を管理するリストを1つ作成
# 2. 国語の試験得点を入力
# 3. 国語の得点を1で作成したリストに追加
# 4. 数学の試験得点を入力
# 5. 数学の得点を1で作成したリストに追加
# 6. 英語の試験得点を入力
# 7. 英語の得点を1で作成したリストに追加
# 8. リストの一覧を表示
# 9. リストの合計を計算して表示
# %%
class Test2_2(unittest.TestCase):
    def setUp(self) -> None:
        self.score = Score()

    def test_3科目の試験得点を管理するリストを1つ作成(self):
        self.assertEqual(len(self.score.scores), 0)

    def test_国語の試験得点を入力(self):
        self.score.add_score(90)
        self.assertEqual(self.score.scores[0], 90)

    def test_数学の試験得点を入力(self):
        self.score.add_score(90)
        self.score.add_score(80)
        self.assertEqual(self.score.scores[1], 80)

    def test_英語の試験得点を入力(self):
        self.score.add_score(90)
        self.score.add_score(80)
        self.score.add_score(70)
        self.assertEqual(self.score.scores[2], 70)

    def test_リストの一覧を表示(self):
        self.score.add_score(90)
        self.score.add_score(80)
        self.score.add_score(70)
        self.assertEqual(
            self.score.list_scores(),
            [90, 80, 70]
        )

    def test_リストの合計を計算して表示(self):
        self.score.add_score(90)
        self.score.add_score(80)
        self.score.add_score(70)
        self.assertEqual(
            self.score.sum_scores(),
            240
        )


class Score:
    def __init__(self):
        self.scores = []

    def add_score(self, score):
        self.scores.append(score)

    def list_scores(self):
        return self.scores

    def sum_scores(self):
        return sum(self.scores)


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# ### 条件分岐
# #### 練習3-1
# if文を使って、次のような動作をするプログラムを作成してください。
# 1. 入力された数値について、偶数か奇数かを判定してその結果を表示する。
# 2. 次の入力された文字列（左）応じて、挨拶（矢印の右）を表示する。これら以外の場合は、「どうしました？」と表示する。
#   - "こんにちは" → "ようこそ!"
#   - "景気は?" → "ぼちぼちです"
#   - "さようなら" → "お元気で!"
# %%
class Test3_1(unittest.TestCase):
    def test_偶数か奇数かを判定してその結果を表示する(self):
        self.assertEqual(even_or_odd(1), "奇数")
        self.assertEqual(even_or_odd(2), "偶数")
        self.assertEqual(even_or_odd(3), "奇数")
        self.assertEqual(even_or_odd(4), "偶数")

    def test_挨拶を表示する(self):
        self.assertEqual(greeting("こんにちは"), "ようこそ!")
        self.assertEqual(greeting("景気は?"), "ぼちぼちです")
        self.assertEqual(greeting("さようなら"), "お元気で!")
        self.assertEqual(greeting("おはよう"), "どうしました？")

def even_or_odd(number):
    """
    >>> even_or_odd(1)
    '奇数'
    >>> even_or_odd(2)
    '偶数'
    >>> even_or_odd(3)
    '奇数'
    >>> even_or_odd(4)
    '偶数'
    """
    if number % 2 == 0:
        return "偶数"
    else:
        return "奇数"

def greeting(message):
    """
    >>> greeting("こんにちは")
    'ようこそ!'
    >>> greeting("景気は?")
    'ぼちぼちです'
    >>> greeting("さようなら")
    'お元気で!'
    >>> greeting("おはよう")
    'どうしました？'
    """
    if message == "こんにちは":
        return "ようこそ!"
    elif message == "景気は?":
        return "ぼちぼちです"
    elif message == "さようなら":
        return "お元気で!"
    else:
        return "どうしました？"

doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# ### 繰り返し
# #### 練習4-1
# 「10,9,8,..,2,1,Lift off !」のようなカウントダウンを行うプログラムをfor文とrange関数を用いて作成してください。
# %%
class Test4_1(unittest.TestCase):
    def test_for文を用いてカウントダウンを行う(self):
        self.assertEqual(countdown_using_for(), "10,9,8,7,6,5,4,3,2,1,Lift off !")

    def test_range関数を用いてカウントダウンを行う(self):
        self.assertEqual(countdown_using_range(), "10,9,8,7,6,5,4,3,2,1,Lift off !")

    def test_カウントダウンを行う(self):
        self.assertEqual(countdown(), "10,9,8,7,6,5,4,3,2,1,Lift off !")

def countdown_using_for():
    """
    >>> countdown_using_for()
    '10,9,8,7,6,5,4,3,2,1,Lift off !'
    """
    result = ""
    for i in range(10, 0, -1):
        result += str(i) + ","
    result += "Lift off !"
    return result

def countdown_using_range():
    """
    >>> countdown_using_range()
    '10,9,8,7,6,5,4,3,2,1,Lift off !'
    """
    result = ""
    for i in range(10, 0, -1):
        result += str(i) + ","
    result += "Lift off !"
    return result

def countdown():
    """
    >>> countdown()
    '10,9,8,7,6,5,4,3,2,1,Lift off !'
    """
    return ",".join([str(i) for i in range(10, 0, -1)]) + ",Lift off !"


doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# #### 練習4-2
# 次の表は生徒１０人の試験得点です（１００点満点）
#
# | 71 | 67 | 73 | 61 | 79 | 59 | 83 | 87 | 72 | 79 |
# |----|----|----|----|----|----|----|----|----|----|
#
# これについて、次のような動作をするプログラムを作成してください。
# 1. scoresリストを１つ作成する。
# 2. for文を利用して、上記表のデータをscoresリストに追加する。
# 3. scoresリストの各要素に対して、次のデータ加工を行い、それぞれ新しいリストであるfinal_scoresリストに格納する。
#   - 加工後得点 = 0.8 * 試験得点 + 20
# 4. final_scoresリストの平均点を計算して表示する。
# %%
class Test4_2(unittest.TestCase):
    def setUp(self) -> None:
        self.scores = [71, 67, 73, 61, 79, 59, 83, 87, 72, 79]

    def test_生徒10人の試験得点を作成する(self):
        self.assertEqual(len(self.scores), 10)

    def test_生徒10人の試験得点を作成する(self):
        self.assertEqual(self.scores[0], 71)
        self.assertEqual(self.scores[1], 67)
        self.assertEqual(self.scores[2], 73)
        self.assertEqual(self.scores[3], 61)
        self.assertEqual(self.scores[4], 79)
        self.assertEqual(self.scores[5], 59)
        self.assertEqual(self.scores[6], 83)
        self.assertEqual(self.scores[7], 87)
        self.assertEqual(self.scores[8], 72)
        self.assertEqual(self.scores[9], 79)

    def test_各要素に対してデータ加工を行う(self):
        self.assertEqual(
            final_scores(self.scores),
            [76.8, 73.6, 78.4, 68.8, 83.2, 67.2, 86.4, 89.6, 77.6, 83.2]
        )

    def test_平均点を計算して表示する(self):
        scores = final_scores(self.scores)
        self.assertEqual(
            average_score(scores),
           78.48
        )

def final_scores(scores):
    """
    >>> final_scores([71, 67, 73, 61, 79, 59, 83, 87, 72, 79])
    [76.8, 73.6, 78.4, 68.8, 83.2, 67.2, 86.4, 89.6, 77.6, 83.2]
    """
    return [round(0.8 * score + 20, 1) for score in scores]

def average_score(scores):
    """
    >>> average_score([71, 67, 73, 61, 79, 59, 83, 87, 72, 79])
    73.1
    """
    return sum(scores) / len(scores)

doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

# %% [markdown]
# ### 関数
# #### 練習5-1
# 次の関数を作成してください。
# 1. うるう年関数
#  - 引数：0以上の整数1つ
#  - 機能
#    - 4で割り切れる年はうるう年である。
#    - 1の例外として、100で割り切れる年はうるう年ではない。
#    - 2のさらに例外として400で割り切れたらうるう年である。
#  - 返り値：引数がうるう年ならTrue、そうでなければFalse
# %%
class Test5_1(unittest.TestCase):
    def test_4で割り切れる年はうるう年である(self):
        self.assertEqual(leap_year(4), True)
        self.assertEqual(leap_year(8), True)
        self.assertEqual(leap_year(12), True)
        self.assertEqual(leap_year(16), True)
        self.assertEqual(leap_year(20), True)
        self.assertEqual(leap_year(24), True)
        self.assertEqual(leap_year(28), True)
        self.assertEqual(leap_year(32), True)
        self.assertEqual(leap_year(36), True)
        self.assertEqual(leap_year(40), True)
        self.assertEqual(leap_year(44), True)
        self.assertEqual(leap_year(48), True)
        self.assertEqual(leap_year(52), True)
        self.assertEqual(leap_year(56), True)
        self.assertEqual(leap_year(60), True)
        self.assertEqual(leap_year(64), True)
        self.assertEqual(leap_year(68), True)
        self.assertEqual(leap_year(72), True)
        self.assertEqual(leap_year(76), True)
        self.assertEqual(leap_year(80), True)
        self.assertEqual(leap_year(84), True)
        self.assertEqual(leap_year(88), True)
        self.assertEqual(leap_year(92), True)
        self.assertEqual(leap_year(96), True)

    def test_100で割り切れる年はうるう年ではない(self):
        self.assertEqual(leap_year(100), False)
        self.assertEqual(leap_year(200), False)
        self.assertEqual(leap_year(300), False)
        self.assertEqual(leap_year(500), False)
        self.assertEqual(leap_year(600), False)
        self.assertEqual(leap_year(700), False)
        self.assertEqual(leap_year(900), False)
        self.assertEqual(leap_year(1000), False)
        self.assertEqual(leap_year(1100), False)
        self.assertEqual(leap_year(1300), False)
        self.assertEqual(leap_year(1400), False)
        self.assertEqual(leap_year(1500), False)
        self.assertEqual(leap_year(1700), False)
        self.assertEqual(leap_year(1800), False)
        self.assertEqual(leap_year(1900), False)
        self.assertEqual(leap_year(2100), False)
        self.assertEqual(leap_year(2200), False)
        self.assertEqual(leap_year(2300), False)

    def test_400で割り切れたらうるう年である(self):
        self.assertEqual(leap_year(400), True)
        self.assertEqual(leap_year(800), True)
        self.assertEqual(leap_year(1200), True)
        self.assertEqual(leap_year(1600), True)
        self.assertEqual(leap_year(2000), True)
        self.assertEqual(leap_year(2400), True)

def leap_year(year):
    """
    >>> leap_year(4)
    True
    >>> leap_year(400)
    True
    >>> leap_year(100)
    False
    >>> leap_year(1900)
    False
    >>> leap_year(2000)
    True
    """
    if year % 400 == 0:
        return True
    elif year % 100 == 0:
        return False
    else:
        return year % 4 == 0



doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
