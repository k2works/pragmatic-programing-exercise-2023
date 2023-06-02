# %% [markdown]
# # 回帰2:住宅の平均価格の予測

# %%
import unittest
import doctest
import os

from domain import SQLRepository, convert_categoricals, CategoricalData, DataVisualization

path = os.path.dirname(os.path.abspath(__file__))
repo = SQLRepository(table='Boston')
#repo = CSVRepository(file=path + '/data/Boston.csv')
# %% [markdown]
# ## データの内容
# | 列名 | 内容 |
# | --- | --- |
# | CRIME | その地域の犯罪発生率(high,low,very_low)|
# | ZN | 25,000平方フィート以上の住居区画の占める割合 |
# | INDUS | 小売業以外の商業が占める面積の割合 |
# | CHAS | チャールズ川の付近かどうかによるダミー変数(1:川の周辺, 0:それ以外) |
# | NOX | 窒素酸化物の濃度 |
# | RM | 住居の平均部屋数 |
# | AGE | 1940年より前に建てられた物件の割合 |
# | DIS | ボストン市内の5つの雇用施設からの距離 |
# | RAD | 環状高速道路へのアクセスしやすさ |
# | TAX | $10,000ドルあたりの不動産税率の総計 |
# | PTRATIO | 町ごとの教員1人当たりの児童生徒数 |
# | B | 町ごとの黒人(Bk)の比率を次の式で表したもの。1000(Bk - 0.63)^2 |
# | LSTAT | 人口における低所得者の割合 |
# | PRICE | 住宅価格の平均価格 |

# %%
df = repo.get_data()
df.head(3)

# %% [markdown]
# ## 問題背景

# %% [markdown]
# ## データ分析の方法検討
# ボストン市内の特定の地域の住宅価格を予測する回帰式を作成し、どのような地域だと価格が高くなりやすいかを考察する。

# %% [markdown]
# 分析の実施

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
categorical_cols = ['PRICE']
df_conv = convert_categoricals(df, categorical_cols)
df_conv.corr()

# %% [markdown]
# ### データの数値変数確認

# %%
df.select_dtypes(include='number').columns

# %% [markdown]
# ### データのカテゴリ変数確認

# %%
df.select_dtypes(include='object').columns

# %% [markdown]
# ### CRIMEカテゴリ

# %%
crime = CategoricalData(df, 'CRIME')

# %%
crime.show()

# %%
crime.plot()

## %% [markdown]
# ### CRIMEカテゴリの数値変換

# %%
categorical_cols = ['CRIME']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'CRIME')
conv_species.plot()

# %% [markdown]
# ### ダミー変数化

# %%
df_dummy = crime.dummy()
df_dummy

# %% [markdown]
# ### データの可視化

# %%
dv = DataVisualization(df)
dv.df_all('PRICE')

# %%
import matplotlib.pyplot as plt
import seaborn as sns

for c in df.columns:
    plt.figure()
    if c == 'ID' or c == 'PRICE':
        continue
    sns.boxenplot(x=c, y='PRICE', data=df)


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
