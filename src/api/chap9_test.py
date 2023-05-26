# %% [markdown]
# # 練習問題:金融機関のキャンペーン分析

# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

import matplotlib.pyplot as plt
import seaborn as sns

# データの可視化設定
plot_on = False

def new_df():
    """データフレームの作成"""
    df = pd.read_csv(path + '/data/Bank.csv', sep=',')
    return df

def plot_df(df):
    def plot_df_hist():
        """データの分布確認"""
        df.hist(figsize=(10, 10))
        plt.show()

    def plot_df_boxplot():
        """データの外れ値確認"""
        df.boxplot(figsize=(10, 10))
        plt.show()

    def plot_df_pairplot():
        """データの可視化"""
        sns.set()
        sns.pairplot(df, hue='y')
        plt.show()

    def exec_all(on=True):
        if on:
            plot_df_hist()
            plot_df_boxplot()
            plot_df_pairplot()

    return exec_all

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
        self.df[self.col] = encoder.fit_transform(self.df[self.col])

    def pivot(self, value):
        """ピボットテーブルによる集計"""
        return self.df.pivot_table(index='y', columns=self.col, values=value, aggfunc='count')

    def dummy(self):
        """ダミー変数化"""
        return pd.get_dummies(self.df, columns=[self.col])

# %% [markdown]
# ## データの内容
# |列名|意味|
# |:--|:--|
# |id|顧客ID|
# |age|年齢|
# |job|職種|
# |education|最終学歴|
# |marital|既婚／未婚／離別など
# |loan|個人ローンの有無|
# |housing|住宅ローンの有無|
# |amount|年間キャンペーン終了時点での、総投資信託購入額|
# |default|債務不履行の有無|
# |previous|キャンペーン前に接触した回数|
# |campaign|現キャンペーン内での接触回数|
# |day|最終接触日|
# |month|最終接触月|
# |duration|接触時のへ平均時間（秒）|
# |y|今回のキャンペーンの結果（1:購入、0:未購入|


# %% [markdown]
# ## 問題背景
# スッキリ銀行は、預貯金や融資のほかに、投資信託商品の販売も行っていますが、購入顧客数や顧客一人あたりの平均購入金額は伸び悩んでいます。
#
# そこで、昨年度の1年間はテレアポや資料の郵送など、銀行側から顧客に接触を図る各種のキャンペーンを実施しました。初の年間キャンペーンでもあり、さまざまな顧客に手あたり次第接触を試みましたが、次回のキャンペーンでは昨年得られたデータを生かして、もっと効率よく実施したいと考えています。
#
# さて、スッキリ銀行の課題を解決するためには、行ったキャンペーンが効果的だったか検証する必要があります。また、どうゆう顧客が購入してくれたのか、顧客特性の考察も必要です。

# %% [markdown]
# ## データ分析の方法検討

# %% [markdown]
# ### CSVファイルの読み込み

# %%
import pandas as pd
df = pd.read_csv(path + '/data/Bank.csv', sep=',')
df.head()

# %% [markdown]
# ### データの概要確認

# %%
df.info()
# %% [markdown]
# ### データの統計量確認

# %%
df.describe()


# %% [markdown]
# ### データの特徴量の相関確認

# %%
df.corr()

# %% [markdown]
# ### データの特徴量確認

# %%
df.columns

# %% [markdown]
# ### データの数値変数確認

# %%
df.select_dtypes(include='number').columns


# %% [markdown]
# ### データのカテゴリカル変数確認

# %%
df.select_dtypes(include='object').columns

# %% [markdown]
# ### 職種カテゴリ

# %%
job = CategoricalData(df, 'job')

# %% [markdown]
# ### 職種カテゴリ確認

# %%
job.show()

# %%
job.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
job.convert()
job.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
job.pivot('id')


# %% [markdown]
# ### ダミー変数化

# %%
#job.dummy()
df = job.dummy()
df.head()


# %% [markdown]
# ### 最終学歴カテゴリ確認

# %%
education = CategoricalData(df, 'education')

# %%
education.show()

# %%
education.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
education.convert()
education.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
education.pivot('id')

# %% [markdown]
# ### ダミー変数化

# %%
df = education.dummy()
df.head()

# %% [markdown]
# ### 既婚／未婚／離別カテゴリ確認

# %%
marital = CategoricalData(df, 'marital')

# %%
marital.show()

# %%
marital.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
marital.convert()
marital.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
marital.pivot('id')

# %% [markdown]
# ### ダミー変数化
# %%
df = marital.dummy()
df.head()

# %%

# %% [markdown]
# ### 個人ローンの有無カテゴリ確認

# %%
loan = CategoricalData(df, 'loan')

# %%
loan.show()

# %%
loan.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
loan.convert()
loan.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
loan.pivot('id')

# %% [markdown]
# ### ダミー変数化
# %%
df = loan.dummy()
df.head()

# %% [markdown]
# ### 住宅ローンの有無カテゴリ確認

# %%
housing = CategoricalData(df, 'housing')

# %%
housing.show()

# %%
housing.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
housing.convert()
housing.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
housing.pivot('id')

# %% [markdown]
# ### ダミー変数化
# %%
df = housing.dummy()
df.head()


# %% [markdown]
# ### 債務不履行の有無カテゴリ確認

# %%
default = CategoricalData(df, 'default')

# %%
default.show()

# %%
default.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
default.convert()
default.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
default.pivot('id')

# %% [markdown]
# ### ダミー変数化
# %%
df = default.dummy()
df.head()

# %% [markdown]
# ### 最終接触月確認

# %%
month = CategoricalData(df, 'month')

# %%
month.show()

# %%
month.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
month.convert()
month.plot()


# %% [markdown]
# #### ピボットテーブルによる集計

# %%
month.pivot('id')

# %% [markdown]
# ### 連絡方法カテゴリ確認

# %%
contact = CategoricalData(df, 'contact')

# %%
contact.show()

# %%
contact.plot()

# %% [markdown]
# #### カテゴリーデータを数値に変換

# %%
contact.convert()
contact.plot()

# %% [markdown]
# #### ピボットテーブルによる集計

# %%
contact.pivot('id')


# %% [markdown]
# ### ダミー変数化
# %%
df = contact.dummy()
df.head()

# %% [markdown]
# ### データの目的変数確認

# %%
df['y'].value_counts()

# %%
df['y'].value_counts().plot(kind='bar')

# %% [markdown]
# ### データの可視化

# %%
# %matplotlib inline
df = new_df()
exec_all = plot_df(df)
exec_all(plot_on)

# %% [markdown]
# ### データの欠損確認

# %%
df.isnull().any()

# %%
df.isnull().sum()

# %% [markdown]
# ### データの重複確認

# %%
df.duplicated().sum()

# %% [markdown]
# ## 分析の実施

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### CSVファイルの読み込み

# %%
import pandas as pd
df = new_df()
df.head()

# %% [markdown]
# ### 欠損地処理（行削除・全体代表値埋め、グループ代表値埋め）

# %% [markdown]
# ### 欠損値を含む行を削除

# %%
df.dropna(inplace=True)

# %% [markdown]
# ### 各手法を必要に応じて実施

# %% [markdown]
# - 外れ値の除外
# - 多項式特徴量・交互作用特徴量の追加
# - 特徴量の絞り込み
# - 標準化

# %% [markdown]
# ### 特徴量xと正解tに分割
from sklearn.discriminant_analysis import StandardScaler
from sklearn.preprocessing import LabelEncoder

# カテゴリカル変数を指定してLabelEncoderを作成
categorical_cols = ['job', 'marital', 'education', 'default', 'housing', 'loan', 'contact', 'month']
for col in categorical_cols:
    CategoricalData(df, col).convert()

# データの分割とスケーリング
X = df.drop('y', axis=1)
y = df['y']

# %% [markdown]
# ### 教師データの分割

# %%
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=1234, stratify=y)

scaler = StandardScaler()
scaler.fit(X_train)

X_train_std = scaler.transform(X_train)
X_test_std = scaler.transform(X_test)


# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### 未学習状態モデルの生成（分類なら決定木、回帰なら線形回帰）

# %%
from sklearn.tree import DecisionTreeClassifier

model = DecisionTreeClassifier(max_depth=3, random_state=1234)

# %% [markdown]
# ### 訓練データで学習（必要に応じて不均衡データ補正）
model.fit(X_train_std, y_train)

# %% [markdown]
# ## モデルの評価

# %%
model.score(X_test_std, y_test)

# %%
from sklearn.metrics import accuracy_score

y_pred = model.predict(X_test_std)
accuracy_score(y_test, y_pred)


# %% [markdown]
# ### 検証データで評価し指標確認（分類なら正解率、回帰なら決定係数）

# %% [markdown]
# ### 決定木における特徴量の考察

# %%
import numpy as np

importances = model.feature_importances_
indices = np.argsort(importances)[::-1]

for f in range(X_train_std.shape[1]):
    print(f'{f+1}番目に重要な特徴量：{X.columns[indices[f]]} {importances[indices[f]]}')


# %% [markdown]
# ### NG:改善案検討前処理に戻る
# ### OK:最終性能評価（テストデータで評価）

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
