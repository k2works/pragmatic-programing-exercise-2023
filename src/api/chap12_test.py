# %% [markdown]
# # さまざまな教師あり学習：分類
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## ロジスティック回帰

# %% [markdown]
# ### ロジスティック回帰の概要

# %% [markdown]
# #### コード 12-1 分類木の予測結果を確率として出力する

# %%
import pandas as pd
from sklearn import tree
df = pd.read_csv(path + '/data/KvsT.csv')
x = df.loc[:, '体重':'年代']
t = df['派閥']
model = tree.DecisionTreeClassifier(max_depth=1, random_state=0)
model.fit(x, t)

data = [[65, 20]] # 予測用未知データ
print(model.predict(data)) # 予測派閥
model.predict_proba(data) # 派閥の確率

# %% [markdown]
# ### ロジスティック回帰の実装

# %% [markdown]
# #### コード 12-2 データの読み込み

# %%
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv(path + '/data/iris.csv')
df.head(2)

# %% [markdown]
# #### コード 12-3 欠損値を穴埋めする

# %%
df_mean = df.mean()
trains2 = df.fillna(df_mean)

# 特徴量と正解データに分割
x = trains2.loc[:, :'花弁幅']
t = trains2['種類']

# 特徴量の標準化
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
new = sc.fit_transform(x)

# %% [markdown]
# #### コード 12-4 訓練データと検証用データに分割する

# %%
# 訓練データと検証用データに分割
x_train, x_val, y_train, y_val = train_test_split(new, t, test_size=0.2, random_state=0)

# %% [markdown]
# #### コード 12-5 ロジスティック回帰による学習

# %%
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(random_state=0,C=0.1,multi_class='auto',solver='lbfgs')

# %% [markdown]
# #### コード 12-6 正解率を確認する

# %%
model.fit(x_train, y_train)
print(model.score(x_train, y_train))
model.score(x_val, y_val)

# %% [markdown]
# #### コード 12-7 係数を確認する

# %%
model.coef_ # 係数の確認

# %% [markdown]
# #### コード 12-8 新規データで予測する

# %%
x_new = [[1,2,3,4]] # 新規データ

model.predict(x_new) # 新規データで予測

# %% [markdown]
# #### コード 12-9 確率の予測結果を確認する

# %%
model.predict_proba(x_new)


# %% [markdown]
# ## ランダムフォレスト

# %% [markdown]
# ### ランダムフォレストの概要

# %% [markdown]
# ### ランダムフォレストの実装

# %% [markdown]
# #### コード 12-10 pandasのモジュールを読み込む

# %%
import pandas as pd
from sklearn.model_selection import train_test_split
#%matplotlib inline

# %% [markdown]
# #### コード 12-11 Survived.csvを読み込む

# %%
df = pd.read_csv(path + '/data/Survived.csv') # csvファイルの読み込み
# 確認する
df.head(2)

# %% [markdown]
# #### コード 12-12 欠損値を穴埋めする

# %%
jo1 = df['Pclass'] == 1
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 43

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 35

jo1 = df['Pclass'] == 2
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 26

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 20

jo1 = df['Pclass'] == 3
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 43

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 35

# %% [markdown]
# #### コード 12-13 文字データの列を数値に変換する

# %%
# 特徴量として利用する列のリスト
col = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']

x = df[col]
t = df['Survived']

# Sex列は文字の列なのでダミー変数化
dummy = pd.get_dummies(df['Sex'], drop_first=True)
x = pd.concat([x, dummy], axis=1)
x.head(2)

# %% [markdown]
# #### コード 12-14 ランダムフォレスト

# %%
# ランダムフォレストのインポート
from sklearn.ensemble import RandomForestClassifier
x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)
model = RandomForestClassifier(n_estimators=200,random_state=0)

# %% [markdown]
# #### コード 12-15 モデルの学習

# %%
model.fit(x_train, y_train)

print(model.score(x_train, y_train))
print(model.score(x_test, y_test))

# %% [markdown]
# #### コード 12-16 単純な決定木分類と比較する

# %%
from sklearn import tree
model2 = tree.DecisionTreeClassifier(max_depth=3, random_state=0)
model2.fit(x_train, y_train)

print(model2.score(x_train, y_train))
print(model2.score(x_test, y_test))

# %% [markdown]
# #### コード 12-17 特徴量の重要度を確認する

# %%
importance = model.feature_importances_ # 特徴量重要度
# 列と対応が分かりやすいようにシリーズ変換
pd.Series(importance, index=x.columns)


# %% [markdown]
# ## アダブースト

# %% [markdown]
# ### バギングとブースティング

# %% [markdown]
# ### アダブーストの概要

# %% [markdown]
# ### アダブーストの実装

# %% [markdown]
# #### コード 12-18 アダブーストを実装する

# %%
# アダブーストのインポート
from sklearn.ensemble import AdaBoostClassifier
# ベースとなるモデル
from sklearn.tree import DecisionTreeClassifier

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)
# 最大の深さ5の決定木を何個も作っていく
base_model = DecisionTreeClassifier(max_depth=5, random_state=0)

# 決定木を500個作っていく
model = AdaBoostClassifier(base_estimator=base_model, n_estimators=500, random_state=0)
model.fit(x_train, y_train) # 学習

print(model.score(x_train, y_train)) # 訓練データの正解率
print(model.score(x_test, y_test)) # テストデータの正解率

# %% [markdown]
# ### ランダムフォレストやアダブーストで回帰

# %% [markdown]
# #### コード 12-19 ランダムフォレストで回帰モデルを作る

# %%
df = pd.read_csv(path + '/data/cinema.csv')
df = df.fillna(df.mean())
x = df.loc[:, 'SNS1':'original']
t = df['sales']
x_train, x_test, y_train, y_test = train_test_split(x, t,
 test_size = 0.2, random_state = 0)

# ランダムフォレスト回帰
from sklearn.ensemble import RandomForestRegressor
# 100個のモデルで並列学習
model = RandomForestRegressor(random_state = 0,
n_estimators = 100)
model.fit(x_train, y_train)
model.score(x_test, y_test) # 決定係数

# %% [markdown]
# #### コード 12-20 アダブーストで回帰モデルを作る

# %%
# アダブースト回帰
from sklearn.ensemble import AdaBoostRegressor
# ベースモデルとしての回帰木
from sklearn.tree import DecisionTreeRegressor
base = DecisionTreeRegressor(max_depth = 3, random_state = 0)

# 100個のモデルで並列学習
model = AdaBoostRegressor(random_state=0, n_estimators=100, base_estimator=base)
model.fit(x_train, y_train)
model.score(x_test, y_test) # 決定係数

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)


