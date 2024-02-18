# %% [markdown]
# # 正規線形モデル
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
# ## 連続型の説明変数を1つ持つモデル（単価域）

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### データの読み込みと図示

# %% [markdown]
# ### 今回構築するモデル

# %% [markdown]
# ### 最小二乗法による係数の推定

# %% [markdown]
# ### 係数の推定

# %% [markdown]
# ### 推定された係数の期待値・分散

# %% [markdown]
# ### statsmodelsによるモデル化

# %% [markdown]
# ### 推定結果の表示と係数の検定

# %% [markdown]
# ### summary関数の出力

# %% [markdown]
# ### AICによるモデル選択

# %% [markdown]
# ### 単回帰による予測

# %% [markdown]
# ### 信頼区間・予測区間

# %% [markdown]
# ### 回帰直線

# %% [markdown]
# ### seabornによる回帰直線の図示

# %% [markdown]
# ### 信頼区間と予測区間の図示

# %% [markdown]
# ### 回帰直線の分散

# %% [markdown]
# ## 正規線形モデル評価

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 残差の取得

# %% [markdown]
# ### 決定係数

# %% [markdown]
# ### 決定係数

# %% [markdown]
# ### 決定係数

# %% [markdown]
# ### 自由度調整済み決定係数

# %% [markdown]
# ### 自由度調整済み決定係数

# %% [markdown]
# ### 残差の可視化

# %% [markdown]
# ### Q-Qプロット

# %% [markdown]
# ### Q-Qプロット

# %% [markdown]
# ### summary関数の出力で見る残差のチェック

# %% [markdown]
# ## 分散分析

# %% [markdown]
# ### 本章の例題

# %% [markdown]
# ### 分散分析が必要になるタイミング

# %% [markdown]
# ### 検定の多重性

# %% [markdown]
# ### 分散分析の直感的な考え方:F比

# %% [markdown]
# ### 有意差がありそうなとき・なさそうなときのバイオリンプロット

# %% [markdown]
# ### 分散分析の直感的な考え:誤差と効果の分離

# %% [markdown]
# ### 群間変動と群内変動

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### データの作成と可視化

# %% [markdown]
# ### 水準別平均と総平均の計算

# %% [markdown]
# ### 分散分析①群間・郡内平方和の計算

# %% [markdown]
# ### 分散分析②群間・郡内分散の計算

# %% [markdown]
# ### 分散分析③p値の計算

# %% [markdown]
# ### 一元配置分散分析の計算のまとめ

# %% [markdown]
# ### 平方和の分解

# %% [markdown]
# ### 説明変数がカテゴリー型である正規線形モデル

# %% [markdown]
# ### ダミー変数

# %% [markdown]
# ### statsmodelsによる分散分析

# %% [markdown]
# ### 分散分析表

# %% [markdown]
# ### モデルの係数の解釈

# %% [markdown]
# ### モデルを用いて、誤差と効果を分離する

# %% [markdown]
# ### 回帰モデルにおける分散分析


# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
