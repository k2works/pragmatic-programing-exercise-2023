# %% [markdown]
# # 回帰2:客船沈没事故での生存予測

# %%
import unittest
import doctest
import os
from domain import CSVRepository, SQLRepository, CategoricalData, DataVisualization, convert_categoricals
import pandas as pd

path = os.path.dirname(os.path.abspath(__file__))
#repo = SQLRepository(table='Survived')
repo = CSVRepository(file= path + '/data/Survived.csv')

# %% [markdown]
# ## データの内容
# | 列名 | 内容 |
# | --- | --- |
# | PassengerId | 乗客ID |
# | Pclass | チケットクラス（1等、2等、3等）|
# | Age | 年齢 |
# | Parch | 同乗した、自身の親と子供の総数 |
# | Fare | 運賃 |
# | Embarked | 搭乗港 |
# | Survived | 1:生存,0:死亡 |
# | Sex | 性別 |
# | SibSp | 同乗した兄弟や配偶者の総数 |
# | Ticket | チケットID |
# | Cabin | 部屋番号 |

# %%
df = repo.get_data()
df.head(3)


# %% [markdown]
# ## 問題背景
# 客船沈没事故で、どのような人が生き残ったかを分析します。このデータを用いて、客船の乗客の特徴量から生存者を予測するモデルを作成します。

# %% [markdown]
# ## データ分析の方法検討
# - 乗客の特徴から沈没時に生存か死亡かに分類するモデルを作成する。また、その過程で、どのような特徴を持つ人が生き残れたかを考察する。
# - 特徴量を「チケットクラス、年齢、同乗した、自身の親と子供の総数、運賃、搭乗港、性別、同乗した兄弟や配偶者の総数、部屋番号」、目的変数を「生存」（1:生存,0:死亡）として、客船の乗客の生存を予測する。

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
categorical_cols = ['Sex','Ticket','Cabin','Embarked']
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
# ### 性別カテゴリ

# %%
sex = CategoricalData(df, 'Sex')

# %%
sex.show()

# %%
sex.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['Sex']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Sex')
conv_species.plot()

# %% [markdown]
# ### チケットIDカテゴリ

# %%
ticket = CategoricalData(df, 'Ticket')

# %%
ticket.show()

# %%
ticket.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['Ticket']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Ticket')
conv_species.plot()

# %% [markdown]
# ### 部屋番号カテゴリ

# %%
cabin = CategoricalData(df, 'Cabin')

# %%
cabin.show()

# %%
cabin.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['Cabin']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Cabin')
conv_species.plot()


# %% [markdown]
# ### 搭乗港カテゴリ

# %%
embarked = CategoricalData(df, 'Embarked')

# %%
embarked.show()

# %%
embarked.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['Embarked']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Embarked')
conv_species.plot()

# %% [markdown]
# ### ダミー変数化

# %%
df_dummy = pd.get_dummies(df, columns=['Survived'])
df_dummy

# %% [markdown]
# ### データの可視化

# %%
dv = DataVisualization(df)
dv.df_all('Survived')

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

# %% [markdown]
# ## 決定木における特徴量の考察


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
