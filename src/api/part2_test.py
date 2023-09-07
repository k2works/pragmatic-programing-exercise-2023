
# %% [markdown]
# # 確率と確率分布の基本
# %%
# %
import numpy as np
import pandas as pd
from scipy import stats
import seaborn as sns
from matplotlib import pyplot as plt
import unittest
import doctest
from matplotlib import rcParams
import os
import warnings
warnings.simplefilter('ignore', FutureWarning)
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 確率論の基本

# %% [markdown]
# ### 確率論を学ぶのか

# %% [markdown]
# ### 第4部の開設の流れ

# %% [markdown]
# ### 集合
# 0異常5以下の整数の商号をAとすると、集合Aは以下のように表記されます。
# $$
# A = \{0, 1, 2, 3, 4, 5\}
# $$

# %% [markdown]
# ### 要素

# %% [markdown]
# ### 集合の外延的記法・集合の内包的記法
# 0異常5以下の整数は以下のように表記されます。なお、Zは整数全体の集合を表します。
# $$
# A = \{x \in Z | 0 \leq x \leq 5\}
# $$

# %% [markdown]
# ### 部分集合
# A = \{0, 1, 2, 3, 4, 5\}とします。
# B = \{0, 1, 2, 3, 4, 5, 6, 7\}とします。
# このとき、
# $$
# A \subset B
# $$
# です。

# %% [markdown]
# ### ベン図

# %% [markdown]
# ### 積集合・和集合
# 2つの集合AとBに対して、積集合は以下のように表記されます。
# $$
# A \cap B = \{x | x \in A かつ x \in B\}
# $$
# 2つの集合AとBに対して、和集合は以下のように表記されます。
# $$
# A \cup B = \{x | x \in A または x \in B\}
# $$

# %% [markdown]
# ### 差集合
# 2つの集合AとBに対して、差集合は以下のように表記されます。
# $$
# A \setminus B = \{x | x \in A かつ x \notin B\}
# $$

# %% [markdown]
# ### 空集合

# %% [markdown]
# ### 全体集合
# ある集合Sがあり、「Sの部分集合しか取り扱あわない」と限定したした時、Sを全体集合と呼びます。
# $$
# S = \{x | x \in S\}
# $$

# %% [markdown]
# ### 補集合
# 全体集合Sが定まっているとき、Sの部分集合Aに対して、補集合は以下のように表記されます。
# $$
# A^c = \{x | x \in S かつ x \notin A\}
# $$

# %% [markdown]
# ### 標本点・標本空間・事象

# %% [markdown]
# ### 排反事象

# %% [markdown]
# ### サイコロ投げて想定できるさまざまな確率

# %% [markdown]
# ### 確率の公理主義的定義

# %% [markdown]
# ### 頻度による確率の解釈

# %% [markdown]
# ### 主観確率による確率の解釈

# %% [markdown]
# ### 確率の加法定理

# %% [markdown]
# #### 定義
# $$
# P(A \cup B) = P(A) + P(B)
# $$
# $$
# P(A \cup B) = P(A) + P(B) - P(A \cap B)
# $$

# %% [markdown]
# #### サイコロ投げの例
# $$
# P(A \cup B) = P(A) + P(B) - P(A \cap B) = \frac{3}{6} + \frac{2}{6} - \frac{1}{6} = \frac{2}{3}
# $$

# %% [markdown]
# ### 条件付き確率

# %% [markdown]
# #### 定義
# $$
# P(A|B) = \frac{P(A \cap B)}{P(B)}
# $$

# %% [markdown]
# #### サイコロ投げの例
# $$
# P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{\frac{1}{6}}{\frac{2}{6}} = \frac{1}{2}
# $$

# %% [markdown]
# ### 確率の乗法定理
# $$
# P(A \cap B) = P(A|B)P(B)
# $$

# %% [markdown]
# ### 独立

# %% [markdown]
# ## 確率分布の基本

# %% [markdown]
# ### 確率変数・実現値

# %% [markdown]
# #### 定義
# $$
# P(X = xi)
# $$

# %% [markdown]
# ### 離散型の確率変数・連続型の確率変数

# %% [markdown]
# ### 確率分布

# %% [markdown]
# ### 確率密度関数

# %% [markdown]
# ### 確率質量関数

# %% [markdown]
# ### 一様分布（離散型）

# %% [markdown]
# #### 一様分布の直感的な説明

# %% [markdown]
# #### 一様分布の確率密度関数
# $$
# U(X|n) = \frac{1}{n}
# $$

# %% [markdown]
# ### 確率密度

# %% [markdown]
# #### なぜ確率密度が必要か

# %% [markdown]
# #### 確率密度の定義

# %% [markdown]
# ### 確率密度関数

# %% [markdown]
# #### 確率密度関数の定義
# $$
# P(a \leq X \leq b) = \int_{a}^{b} f(x)dx
# $$

# %% [markdown]
# #### 確率密度関数の性質
# $$
# f(x) \geq 0
# $$
# $$
# \int_{-\infty}^{\infty} f(x)dx = 1
# $$

# %% [markdown]
# ### 確率の合計と確率密度の積分の関係

# %% [markdown]
# #### 離散型の確率分布における計算
# $$
# P(1 < X < 3) = \sum_{i=2}^{3} f(x_i)
# $$

# %% [markdown]
# #### 連続型の確率分布における計算
# $$
# P(1 < X < 3) = \int_{1}^{3} f(x)dx
# $$

# %% [markdown]
# #### 積分と面積の関係
# $$
# \int_{a}^{b} f(x)dx = 面積
# $$
# $$
# \lim_{\Delta x \to \infty} \sum_{i=1}^{n} f(x_i) \Delta x = \int_{a}^{b} f(x)dx
# $$

# %% [markdown]
# ### 一様分布（連続型）
# $$
# U(X|a, b) = \frac{1}{b - a}
# $$

# %% [markdown]
# ### 累積分布関数

# %% [markdown]
# ### 一様分布の累積分布関数
# $$
# F(x) = \int_{-\infty}^{x} f(x)dx
# $$
# $$
# F(x) = \int_{-\infty}^{x} \frac{1}{b - a}dx
# $$
# $$
# F(x) = \frac{x - a}{b - a}
# $$

# %% [markdown]
# ### パーセント点

# %% [markdown]
# ### 期待値

# %% [markdown]
# #### 期待値の直感的な説明

# %% [markdown]
# #### 離散型の確率変数の期待値
# $$
# E(X) = \sum_{i=1}^{n} x_i f(x_i)
# $$

# %% [markdown]
# #### 連続型の確率変数の期待値
# $$
# E(X) = \int_{-\infty}^{\infty} x f(x)dx
# $$

# %% [markdown]
# #### 期待値と平均値の関係
# $$
# E(X) = \mu
# $$

# %% [markdown]
# #### 予測値としての期待値


# %% [markdown]
# ### 確率変数の分散

# %% [markdown]
# #### 分散の直感的な説明

# %% [markdown]
# #### 確率変数の分散
# $$
# V(X) = E((X - \mu)^2)
# $$

# %% [markdown]
# #### 離散型の確率変数における分散
# $$
# V(X) = \sum_{i=1}^{n} (x_i - \mu)^2 f(x_i)
# $$

# %% [markdown]
# #### 連続型の確率変数における分散
# $$
# V(X) = \int_{-\infty}^{\infty} (x - \mu)^2 f(x)dx
# $$

# %% [markdown]
# ### 一様分布の期待値と分散

# %% [markdown]
# #### 離散型の一様分布の期待値と分散
# $$
# E(X) = \sum_{i=1}^{n} x_i f(x_i) = \frac{1}{n} \sum_{i=1}^{n} x_i = \frac{1}{n}\sum_{i=1}^{n} x_i
# $$
# $$
# V(X) = \sum_{i=1}^{n} (x_i - \mu)^2 f(x_i) = \frac{1}{n} \sum_{i=1}^{n} (x_i - \mu)^2 = \frac{1}{n}\sum_{i=1}^{n} (x_i - \mu)^2
# $$

# %% [markdown]
# #### 連続型の一様分布の期待値
# $$
# E(X) = \int_{-\infty}^{\infty} x f(x)dx = \int_{a}^{b} x \frac{1}{b - a}dx = \frac{1}{b - a} \int_{a}^{b} xdx = \frac{1}{b - a} \left[ \frac{x^2}{2} \right]_{a}^{b} = \frac{1}{b - a} \left( \frac{b^2}{2} - \frac{a^2}{2} \right) = \frac{b^2 - a^2}{2(b - a)} = \frac{b + a}{2}
# $$


# %% [markdown]
# ### 多次元確率分布

# %% [markdown]
# ### 同時確率分布

# %% [markdown]
# #### 同時確率分布の定義
# $$
# P(X = x_i, Y = y_j) = f(x_i, y_j)
# $$

# %% [markdown]
# #### 同時確率分布の性質
# $$
# \sum_{i=1}^{m}\sum_{j=1}^{n} f(x_i, y_j) = 1
# $$

# %% [markdown]
# ### 周辺化・周辺分布
# $$
# P(X = x_i) = \sum_{j=1}^{n} f(x_i, y_j)
# $$

# %% [markdown]
# ### 条件付き確率分布
# $$
# P(X = x_i | Y = y_j) = \frac{P(X = x_i, Y = y_j)}{P(Y = y_j)} = \frac{f(x_i, y_j)}{f_Y(y_j)}
# $$

# %% [markdown]
# ### 確率変数の独立
# $$
# P(X = x_i, Y = y_j) = P(X = x_i)P(Y = y_j)
# $$

# %% [markdown]
# ### 2次元確率分布の例

# %% [markdown]
# ### 確率変数の共分散・相関係数

# %% [markdown]
# #### 確率変数の共分散
# $$
# Cov(X, Y) = E((X - \mu_X)(Y - \mu_Y))
# $$

# %% [markdown]
# #### 確率変数の相関係数
# $$
# \rho(X, Y) = \frac{Cov(X, Y)}{\sqrt{V(X)}\sqrt{V(Y)}}
# $$

# %% [markdown]
# ### 独立同一分布

# %% [markdown]
# #### 独立同一分布の定義

# %% [markdown]
# #### 独立同一分布に従う確率変数列の同時確率分布
# $$
# P(X_1 = x_1, X_2 = x_2, \cdots, X_n = x_n) = \prod_{i=1}^{n} P(X_i = x_i)
# $$

# %% [markdown]
# #### 独立同一分布とみなせない事例

# %% [markdown]
# ## 二項分布

# %% [markdown]
# ### 施行

# %% [markdown]
# ### 二値確率変数

# %% [markdown]
# ### ベルヌーイ施行

# %% [markdown]
# ### くじ引きシミュレーション

# %% [markdown]
# ### 分布の準備
# %%
sns.set()

rcParams['font.family'] = 'sans-serif'
rcParams['font.sans-serif'] = 'Meiryo'

# %% [markdown]
# ### くじを1枚引くシミュレーション

# %% [markdown]
# #### くじを用意する
# %%
lotlery = np.array([1, 1, 0, 0, 0, 0, 0, 0, 0, 0])
lotlery
sum(lotlery) / len(lotlery)

# %% [markdown]
# #### くじを1枚引く
# %%
np.random.choice(lotlery, size=1, replace=True)

print(np.random.choice(lotlery, size=1, replace=True))
print(np.random.choice(lotlery, size=1, replace=True))
print(np.random.choice(lotlery, size=1, replace=True))

# %% [markdown]
# ### くじを10枚引くシミュレーション

# %% [markdown]
# #### くじを10枚引く
# %%
print(np.random.choice(lotlery, size=10, replace=True))
print(np.random.choice(lotlery, size=10, replace=True))
print(np.random.choice(lotlery, size=10, replace=True))

# %% [markdown]
# #### 乱数の種を設定する
# %%
np.random.seed(1)
print(np.random.choice(lotlery, size=10, replace=True))
np.random.seed(1)
print(np.random.choice(lotlery, size=10, replace=True))
np.random.seed(1)
print(np.random.choice(lotlery, size=10, replace=True))

# %% [markdown]
# #### 繰り返し実行の結果の確認
# %%
np.random.seed(1)
print(np.random.choice(lotlery, size=10, replace=True))
print(np.random.choice(lotlery, size=10, replace=True))
print(np.random.choice(lotlery, size=10, replace=True))

# %% [markdown]
# #### 当たり枚数の集計
# %%
np.random.seed(1)
sample_1 = np.random.choice(lotlery, size=10, replace=True)
print('くじ引きの結果：', sample_1)
print('当たり枚数：', sum(sample_1))


# %% [markdown]
# ### くじを10枚引く試行を10000回繰り返す

# %% [markdown]
# #### シミュレーションの実行
# %%
# 試行回数
n_trial = 10000
# 結果を格納する入れ物
binomial_result_array = np.zeros(n_trial)

np.random.seed(1)
for i in range(n_trial):
    sample = np.random.choice(lotlery, size=10, replace=True)
    binomial_result_array[i] = sum(sample)

binomial_result_array[0:10]

# %% [markdown]
# #### シミュレーション結果のヒストグラム
# %%
np.histogram(binomial_result_array, bins=np.arange(0, 11, 1), density=True)

sns.histplot(binomial_result_array, bins=np.arange(
    0, 11, 1), stat='probability')

# %% [markdown]
# ### 二項分布

# %% [markdown]
# #### 二項分布の確率質量関数
# $$
# B(x|n, \mu) = {}_n C_x \mu^x (1 - \mu)^{n - x}
# $$

# %% [markdown]
# #### 二項分布の確率質量関数の解釈

# %% [markdown]
# ### 二項分布

# %% [markdown]
# #### 二項分布の確率質量関数
# %%
round(stats.binom.pmf(k=1, n=2, p=0.5), 3)
round(stats.binom.pmf(k=0, n=10, p=0.2), 3)

# %% [markdown]
# #### 二項分布の確率質量関数のグラフ
# %%
# 成功回数
n_success = np.arange(0, 11, 1)
# 確率
probs = stats.binom.pmf(k=n_success, n=10, p=0.2)

# データフレームにまとめる
probs_df = pd.DataFrame({
    'n_success': n_success,
    'probs': probs
})
print(probs_df)

# ヒストグラム（シミュレーション結果）
sns.histplot(binomial_result_array,
             bins=np.arange(0, 11, 1),
             stat='desity', color='gray')

# 折れ線グラフ（二項分布の確率質量関数）
plt.lineplot(x=n_success, y=probs, data=probs_df, color='black')

# %% [markdown]
# ### 二項分布に従う乱数の生成

# %% [markdown]
# #### 二項分布に従う乱数の生成
# %%
np.random.seed(1)
stats.binom.rvs(n=10, p=0.2, size=5)

# %% [markdown]
# ### 二項分布の期待値と分散

# %% [markdown]
# #### 二項分布の期待値の実装
# %%
n = 10
p = 0.2
x_bar = np.mean(binomial_result_array)
print('乱数の平均     :', round(x_bar, 3))
print('理論的な理論値  :', n * p)

# %% [markdown]
# #### 二項分布の分散の実装
# %%
stats.binom.mean(n=10, p=0.2)

# %% [markdown]
# #### 二項分布の分散の実装
# %%
u2 = np.var(binomial_result_array, ddof=1)
print('乱数の分散     :', round(u2, 3))
print('理論的な分散    :', n * p * (1 - p))

stats.binom.var(n=10, p=0.2)

# %% [markdown]
# ### 二項分布の累積分布関数

# %% [markdown]
# ### 二項分布のパーセント点

# %% [markdown]
# ### 二項分布のパーセント点

# %% [markdown]
# ### 二項分布の上側確率

# %% [markdown]
# ## 正規分布

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 正規分布

# %% [markdown]
# ### 正規分布の確率密度関数

# %% [markdown]
# ### 正規分布の成り立ち

# %% [markdown]
# ### 中心極限定理

# %% [markdown]
# ### 正規分布の特徴

# %% [markdown]
# ### 正規分布に従う乱数の生成

# %% [markdown]
# ### 正規分布の累積分布関数

# %% [markdown]
# ### 正規分布のパーセント点

# %% [markdown]
# ### 正規分布の上側確率
