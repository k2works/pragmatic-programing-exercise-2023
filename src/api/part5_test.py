# %% [markdown]
# # 統計モデルの基礎
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
# ## 統計モデル

# %% [markdown]
# ### モデル

# %% [markdown]
# ### モデリング

# %% [markdown]
# ### モデルは何の役に立つのか

# %% [markdown]
# ### 正規母集団からの無作為標本というモデル

# %% [markdown]
# ### 数理モデル

# %% [markdown]
# ### 確率モデル

# %% [markdown]
# ### モデルの推定

# %% [markdown]
# ### モデルの発展

# %% [markdown]
# ### モデルによる予測

# %% [markdown]
# ### 複雑な世界を単純化する

# %% [markdown]
# ### 複雑な現象を特定の観点から見直す

# %% [markdown]
# ### 統計モデルと古典的な分析手順の比較

# %% [markdown]
# ### 統計モデルの活用

# %% [markdown]
# ## 線形モデルの作り方

# %% [markdown]
# ### 本章の例題

# %% [markdown]
# ### 応答変数・説明変数

# %% [markdown]
# ### 線形モデル

# %% [markdown]
# ### 係数・重み

# %% [markdown]
# ### 線形モデルの作り方

# %% [markdown]
# ### 線形モデルの特定

# %% [markdown]
# ### 変数選択

# %% [markdown]
# ### Nullモデル

# %% [markdown]
# ### 検定による変数選択

# %% [markdown]
# ### 情報量規準による変数選択

# %% [markdown]
# ### モデルの評価

# %% [markdown]
# ### 統計モデルを作る前に、分析の目的を決める

# %% [markdown]
# ## データの表現とモデルの名称

# %% [markdown]
# ### 一般化線形モデルから見たモデルの分類

# %% [markdown]
# ### 正規線形モデル

# %% [markdown]
# ### 回帰分析

# %% [markdown]
# ### 分散分析

# %% [markdown]
# ### 共分散分析

# %% [markdown]
# ### 機械学習での呼称

# %% [markdown]
# ## パラメータ推定：尤度の最大化

# %% [markdown]
# ### なぜパラメータ推定の方法を学ぶのか

# %% [markdown]
# ### 尤度

# %% [markdown]
# ### 対数尤度

# %% [markdown]
# ### 対数の性質

# %% [markdown]
# ### 最尤方

# %% [markdown]
# ### 最尤推定量

# %% [markdown]
# ### 最大化対数尤度

# %% [markdown]
# ### 正規分布に従うデータの尤度の計算例

# %% [markdown]
# ### 局外パラメータ

# %% [markdown]
# ### 正規線形モデルの尤度の計算例

# %% [markdown]
# ### 最尤方の計算例

# %% [markdown]
# ### 最尤推定量の持つ性質

# %% [markdown]
# ## パラメータ推定；損失の最大化

# %% [markdown]
# ### 損失関数

# %% [markdown]
# ### 当てはめ値・予測値

# %% [markdown]
# ### 残差

# %% [markdown]
# ### 残差の合計をそのまま損失の指標に使えない理由

# %% [markdown]
# ### 残差平方和

# %% [markdown]
# ### 最小二乗法

# %% [markdown]
# ### 最小二乗法と最尤法の関係

# %% [markdown]
# ### 誤差関数

# %% [markdown]
# ### さまざまな損失関数

# %% [markdown]
# ## 予測精度の評価と変数選択

# %% [markdown]
# ### 当てはめ精度・予測精度

# %% [markdown]
# ### 過学習

# %% [markdown]
# ### 変数選択の意義

# %% [markdown]
# ### 汎化誤差

# %% [markdown]
# ### 訓練データ・テストデータ

# %% [markdown]
# ### クロスバリデーション（交差検証法）

# %% [markdown]
# ### 赤池の情報量規準（ＡＩＣ）

# %% [markdown]
# ### 相対エントロピー

# %% [markdown]
# ### 相対エントロピーの最小化と平均対数尤度

# %% [markdown]
# ### 平均対数尤度の持つバイアスとＡＩＣ

# %% [markdown]
# ### ＡＩＣによる変数選択

# %% [markdown]
# ### 検定の代わりとしての変数選択

# %% [markdown]
# ### 検定とＡＩＣのどちらを使うか


# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
