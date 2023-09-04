
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
# ### 離散型の確率変数・連続型の確率変数

# %% [markdown]
# ### 確率分布

# %% [markdown]
# ### 確率密度関数

# %% [markdown]
# ### 確率の合計と確率密度の積分の関係

# %% [markdown]
# ### 一様分布（連続型）

# %% [markdown]
# ### 累積分布関数

# %% [markdown]
# ### 一様分布の累積分布関数

# %% [markdown]
# ### パーセント点

# %% [markdown]
# ### 期待値

# %% [markdown]
# ### 確率変数の分散

# %% [markdown]
# ### 一様分布の期待値と分散

# %% [markdown]
# ### 多次元確率分布

# %% [markdown]
# ### 周辺化・周辺分布

# %% [markdown]
# ### 条件付き確率分布

# %% [markdown]
# ### 確率変数の独立

# %% [markdown]
# ### 2次元確率分布の例

# %% [markdown]
# ### 確率変数の共分散・相関係数

# %% [markdown]
# ### 独立同一分布

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

# %% [markdown]
# ### くじを1枚引くシミュレーション

# %% [markdown]
# ### くじを10枚引くシミュレーション

# %% [markdown]
# ### くじを10枚引く試行を10000回繰り返す

# %% [markdown]
# ### 二項分布

# %% [markdown]
# ### 二項分布

# %% [markdown]
# ### 二項分布に従う乱数の生成

# %% [markdown]
# ### 二項分布の期待値と分散

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
