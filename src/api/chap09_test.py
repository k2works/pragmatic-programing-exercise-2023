# %% [markdown]
# # 分類1:アヤメの判別

# %%
from typing import Any
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

import pandas as pd
import seaborn as sns

class CSVRepository:
    def __init__(self) -> None:
        pass

    def get_data(self):
        return pd.read_csv(path + '/data/iris.csv')

class SQLRepository:
    def __init__(self) -> None:
        pass

    def get_data(self):
        from sqlalchemy import create_engine
        host = 'localhost'
        port = '5432'
        db = 'test'
        username = 'root'
        password = 'root'

        engine = create_engine(f'postgresql://{username}:{password}@{host}:{port}/{db}')
        return pd.read_sql_table('iris', engine)

class CategoricalData:
    def __init__(self, df, col) -> None:
        self.df = df
        self.col = col

    def show(self):
        """カテゴリーデータの値の数を確認"""
        return self.df[self.col].value_counts()

    def plot(self):
        """カテゴリーデータの値の数を棒グラフで確認"""
        return self.df[self.col].value_counts().plot(kind='bar')

    def convert(self):
        """カテゴリーデータを数値に変換"""
        from sklearn.preprocessing import LabelEncoder

        encoder = LabelEncoder()
        return encoder.fit_transform(self.df[self.col])

    def pivot(self, index,value):
        """ピボットテーブルによる集計"""
        return self.df.pivot_table(index=index, columns=self.col, values=value, aggfunc='count')

    def dummy(self):
        """ダミー変数化"""
        return pd.get_dummies(self.df, columns=[self.col])

class DataVisualization:
    def __init__(self, df) -> None:
        self.df = df

    def df_hist(self):
        """データフレームのヒストグラム表示"""
        return self.df.hist(figsize=(12, 12))

    def df_scatter(self):
        """データフレームの散布図表示"""
        return pd.plotting.scatter_matrix(self.df, figsize=(12, 12))

    def df_box(self):
        """データフレームの箱ひげ図表示"""
        return self.df.boxplot(figsize=(12, 12))

    def df_pairplot(self, hue=None):
        """データフレームのペアプロット表示"""
        return sns.pairplot(self.df, hue=hue)

    def df_all(self, hue):
        """データフレームの全ての表示"""
        self.df_hist()
        self.df_scatter()
        self.df_box()
        self.df_pairplot(hue)

def convert_categoricals(df, cols):
    df_conv = df.copy()
    for c in cols:
        df_conv[c] = CategoricalData(df_conv, c).convert()
    return df_conv

repo = CSVRepository()

# %% [markdown]
# ## データの内容
# | 列名 | 内容 |
# | --- | --- |
# | sepal_length | がく片の長さ |
# | sepal_width | がく片の幅 |
# | petal_length | 花弁の長さ |
# | petal_width | 花弁の幅 |
# | species | 種類 |
#

# %%
df = repo.get_data()
df.head(3)


# %% [markdown]
# ## 問題背景
# Iris(アヤメ)のデータは、ある特徴を持つ花がどの種類のアヤメに分類されるかを示すデータです。花の個体情報としてデータの内容の列名が示す4つの特徴量が与えられており、それらの特徴量から花の種類を分類することができます。このデータを用いて、花の特徴量からアヤメの種類を分類するモデルを作成します。
# 花の種類は、setosa(ヒオウギアヤメ), Iris-versicolor(ブルーフラッグ), Iris-virginica(バージニアアイリス)の3種類があります。

# %% [markdown]
# ## データ分析の方法検討
# - 特徴量を「がく片の長さと幅、花びらの長さと幅」として、アヤメの種類を判別する。

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
categorical_cols = ['species']
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
# ### 種類カテゴリ

# %%
species = CategoricalData(df, 'species')

# %%
species.show()

# %%
species.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換

# %%
categorical_cols = ['species']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'species')
conv_species.plot()

# %% [markdown]
# ### ピボットテーブルによる集計

# %%
species.pivot('sepal_length', 'sepal_width')
# %%
species.pivot('sepal_width', 'petal_length')
# %%
species.pivot('petal_length', 'petal_width')
# %%
species.pivot('petal_width', 'sepal_length')

# %% [markdown]
# ### ダミー変数化

# %%
df_dummy = species.dummy()
df_dummy

# %% [markdown]
# ### データの可視化

# %%
dv = DataVisualization(df)
dv.df_all('species')

# %% [markdown]
# # 分析の実施

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### データの読み込み
repo = CSVRepository()
df = repo.get_data()
df.head(3)

# %% [markdown]
# ### 欠損地処理（行削除・全体代表値埋め、グループ代表値埋め）

# %% [markdown]
# #### 欠損値の確認
# %%
df.isnull().sum()

# %% [markdown]
# #### 欠損値の削除
# %%
def df_dropna(df):
    df_drop = df.dropna(how = 'any', axis = 0)
    return df_drop

# %% [markdown]
# #### 欠損値の代表値埋め
# %%
def df_fillna_mean(df, col):
    mean_value = df[col].mean()
    df_fill = df.fillna(mean_value)
    return df_fill

def df_fillna_mean_cols(df, cols):
    df_fill = df.copy()
    for col in cols:
        df_fill = df_fillna_mean(df_fill, col)
    return df_fill

# %% [markdown]
# #### 特徴量と正解データの取り出し
# %%
xcol = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
df = df_fillna_mean_cols(df, xcol)
x = df[xcol]
t = df['species']

from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.3, random_state=0)

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
# #### 決定木モデルを作成する
# %%
from sklearn import tree
model = tree.DecisionTreeClassifier(max_depth=2, random_state=0)

# %% [markdown]
# ### 訓練データで学習（必要に応じて不均衡データ補正）

# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 検証データで評価し指標確認（分類なら正解率、回帰なら決定係数）
# %%
model.fit(x_train, y_train)
model.score(x_test, y_test)

# %% [markdown]
# ### NG:改善案検討前処理に戻る

# ### OK:最終性能評価（テストデータで評価）
# #### Take1
# - がく片の長さ、がく片の幅、花弁の長さ、花弁の幅を特徴量として、アヤメの種類を判別する。
# - 欠損データは代表値埋めを行う。
# %%
from sklearn.model_selection import train_test_split
from sklearn import tree

df = repo.get_data()
xcol = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']
df = df_fillna_mean_cols(df, xcol)

x = df[xcol]
t = df['species']

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.3, random_state=0)

model = tree.DecisionTreeClassifier(max_depth=2, random_state=0)
model.fit(x_train, y_train)
model.score(x_test, y_test)

# %%
import pickle
with open(path + '/model/model.pkl', 'wb') as f:
    pickle.dump(model, f)

# %% [markdown]
# ## 決定木における特徴量の考察

# %% [markdown]
# ### 分岐条件の列を決める
# %%
model.tree_.feature

# %% [markdown]
# ### 分岐条件のしきい値
# %%
model.tree_.threshold

# %% [markdown]
# ### 末端ノードと種類の紐付け
# %%
print(model.tree_.value[1])
print(model.tree_.value[3])
print(model.tree_.value[4])
# %%
model.classes_

# %% [markdown]
# ### 決定木の可視化
# %%
from sklearn.tree import plot_tree

plot_tree(model, feature_names=xcol, class_names=model.classes_, filled=True)


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
