# %% [markdown]
# # 回帰1:映画の興行収入の予測

# %%
import unittest
import doctest
import os
from domain import CSVRepository, SQLRepository, CategoricalData, DataVisualization, convert_categoricals

path = os.path.dirname(os.path.abspath(__file__))
#repo = SQLRepository(table='Cinema')
repo = CSVRepository(file= path + '/data/cinema.csv')

# %% [markdown]
# ## データの内容
# | 列名 | 内容 |
# | --- | --- |
# | cinema_id | 映画作品のID |
# | SNS1 | 公開後10日以内にSNS1でつぶやかれた数 |
# | SNS2 | 公開後10日以内にSNS2でつぶやかれた数 |
# | actor | 主演俳優の昨年のメディア露出度。actorの値が大きいほど露出している |
# | original | 原作があるかどうか（あるなら1,ないなら0） |
# | sales | 最終的な興行収入（単位:万円） |

# %%
df = repo.get_data()
df.head(3)

# %% [markdown]
# ## 問題背景

# %% [markdown]
# ## データ分析の方法検討
# - 特徴量を「公開後10日以内にSNS1でつぶやかれた数、公開後10日以内にSNS2でつぶやかれた数、主演俳優の昨年のメディア露出度、原作があるかどうか」、目的変数を「最終的な興行収入」として、映画の興行収入を予測する。

# %% [markdown]
# # 分析の実施

# %% [markdown]
# ### データの概要

# %%
df.info()

# %% [markdown]
# ### データの統計量

# %%
df.describe()

# %% [markdown]
# ### データの特徴量の相関確認

# %%
categorical_cols = ['sales']
df_conv = convert_categoricals(df, categorical_cols)
df_conv.corr()

# %% [markdown]
# ### データの数値変数確認

# %%
df.select_dtypes(include='number').columns

# %% [markdown]
# ### originalカテゴリ

# %%
original = CategoricalData(df, 'original')

# %%
original.show()

# %%
original.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['original']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'sales')
conv_species.plot()

# %% [markdown]
# ### ピボットテーブルによる集計

# %%
original.pivot('sales', 'SNS1')
# %%
original.pivot('sales', 'SNS2')
# %%
original.pivot('sales', 'actor')

# %%

# %% [markdown]
# ### ダミー変数化

# %%
df_dummy = original.dummy()
df_dummy

# %% [markdown]
# ### データのカテゴリ変数確認

# %%
df.select_dtypes(include='object').columns

# %% [markdown]
# ### データの可視化

# %%
dv = DataVisualization(df)
dv.df_all('sales')

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### 欠損地処理（行削除・全体代表値埋め、グループ代表値埋め）

# %% [markdown]
# ### 各手法を必要に応じて実施

# %% [markdown]
# - 外れ値の除外
# - 多項式特徴量・交互作用特徴量の追加
# - 特徴量の絞り込み
# - 標準化

# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### 未学習状態モデルの生成（分類なら決定木、回帰なら線形回帰）

# %% [markdown]
# ### 訓練データで学習（必要に応じて不均衡データ補正）

# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 検証データで評価し指標確認（分類なら正解率、回帰なら決定係数）

# %% [markdown]
# ### NG:改善案検討前処理に戻る
# ### OK:最終性能評価（テストデータで評価）


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
