# %% [markdown]
# # 分類2:客船沈没事故での生存予測

# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 客船沈没事故から生き残れるかを予測

# %% [markdown]
# ### データの概要

from PIL import Image
file = path + '/img/7-1.png'
im = Image.open(file)
im

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### CSVファイルの読み込み

# %% [markdown]
# #### CSVファイルの読み込み

# %%
import pandas as pd
from sklearn import tree
from sklearn.model_selection import train_test_split
# %matplotlib inline
df = pd.read_csv(path + '/data/Survived.csv')
df.head(2) # 先頭2行を表示

# %% [markdown]
# ### 正解データの集計-不均衡データ

# %% [markdown]
# #### Survied列のデータ

# %%
df['Survived'].value_counts()

# %% [markdown]
# ### 欠損値の処理

# %% [markdown]
# #### 欠損値を確認する

# %%
df.isnull().sum()

# %% [markdown]
# #### shapeでデータの行数と列数を確認

# %%
df.shape

# %% [markdown]
# #### Age列とEmbarked列の穴埋め

# %%
# Aga列を平均値で穴埋め
df['Age'].fillna(df['Age'].mean(), inplace=True)
# Embarked列を最頻値で穴埋め
df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)

# %% [markdown]
# #### 特徴量xと正解データtに分割する

# %%
# 特徴量として利用する列のリスト
col = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']

x = df[col]
t = df['Survived']

# %% [markdown]
# ### 訓練データとテストデータの分割

# %% [markdown]
# #### 訓練データとテストデータに分割する

# %%
x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)

# x_trainのサイズの確認
x_train.shape


# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### モデルの作成と学習-不均衡データの考慮

# %% [markdown]
# #### モデルの作成と学習

# %%
model = tree.DecisionTreeClassifier(max_depth=5, random_state=0, class_weight='balanced')
model.fit(x_train, y_train) # 学習

# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 正解率の計算

# %% [markdown]
# #### 決定木モデルの正解率を計算する

# %%
model.score(X = x_test, y = y_test)

# %% [markdown]
# ### 過学習

# %% [markdown]
# #### learn関数を定義する

# %%
# x:特徴量 t:正解データ depth:木の深さ
def learn(x, t, depth=3):
    x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)

    model = tree.DecisionTreeClassifier(max_depth=depth, random_state=0, class_weight='balanced')
    model.fit(x_train, y_train)

    score = model.score(X = x_train, y = y_train)
    score2 = model.score(X = x_test, y = y_test)
    return round(score, 3), round(score2, 3), model

# %% [markdown]
# #### 木の深さによる正解率の変化を確認

# %%
for j in range(1, 15): # jは木の深さ（1～14が入る）
    # xは特徴量、tは正解データ
    train_score, test_score, model = learn(x, t, depth=j)
    sentence = '訓練データの正解率{}'
    sentence2 = 'テストデータの正解率{}'
    total_sentence = '深さ{}:' + sentence + sentence2
    print(total_sentence.format(j, train_score, test_score))

# %% [markdown]
# ### 欠損値の再埋め込み

# %% [markdown]
# #### Age列の平均値と中央値を確認する

# %%
df2 = pd.read_csv(path + '/data/Survived.csv')
print(df2['Age'].mean()) # 平均値の計算
print(df2['Age'].median()) # 中央値の計算

# %% [markdown]
# ### ピボットテーブルによる集計

# %% [markdown]
# #### 小グループ作成の基準となる列を指定

# %%
df.groupby('Survived').mean()['Age']

# %% [markdown]
# #### Pclass列で集計

# %%
df2.groupby('Pclass').mean()['Age']

# %% [markdown]
# #### ピボットテーブル機能を使う

# %%
pd.pivot_table(df2, index='Survived', columns='Pclass', values='Age')

# %% [markdown]
# #### 引数aggfuncを使って平均値以外の統計量を求める

# %%
pd.pivot_table(df2, index='Survived', columns='Pclass', values='Age', aggfunc='median')

# %% [markdown]
# #### loc機能でAge列の欠損値を穴埋めする

# %%
# Age列の欠損値の行を抜き出す（欠損であればTrue）
is_null = df2['Age'].isnull()

# Pclass 1 に関する埋め込み
df2.loc[(df2['Pclass'] == 1) & (df2['Survived'] == 0) & (is_null), 'Age'] = 43
df2.loc[(df2['Pclass'] == 1) & (df2['Survived'] == 1) & (is_null), 'Age'] = 35

# Pclass 2 に関する埋め込み
df2.loc[(df2['Pclass'] == 2) & (df2['Survived'] == 0) & (is_null), 'Age'] = 33
df2.loc[(df2['Pclass'] == 2) & (df2['Survived'] == 1) & (is_null), 'Age'] = 25

# Pclass 3 に関する埋め込み
df2.loc[(df2['Pclass'] == 3) & (df2['Survived'] == 0) & (is_null), 'Age'] = 26
df2.loc[(df2['Pclass'] == 3) & (df2['Survived'] == 1) & (is_null), 'Age'] = 22

# %% [markdown]
# #### learn関数を使ってモデルに再学習させる

# %%
# 特徴量として利用する列のリスト
col = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']
x = df2[col]
t = df2['Survived']

for j in range(1,15): # jは木の深さ
    s1, s2, m = learn(x, t, depth = j)
    sentence = '深さ{}:訓練データの制度{}::テストデータの制度{}'
    print(sentence.format(j, s1, s2))

# %% [markdown]
# ### ダミー変数化

# %% [markdown]
# #### groupbyメソッドを使って平均値を求める

# %%
sex = df2.groupby('Sex').mean()
sex['Survived']

# %% [markdown]
# #### plotメソッドで棒グラフを描く

# %%
sex['Survived'].plot(kind='bar')

# %% [markdown]
# #### モデルの再学習を行う

# %%
# 特徴量として利用する列のリスト
col = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare', 'Sex']

x = df2[col]
t = df2['Survived']

# train_score, test_score, model = learn(x, t) # 学習

# %% [markdown]
# #### get_dummies関数で文字列を数値に変換する

# %%
male = pd.get_dummies(df2['Sex'], drop_first=True)
male

# %% [markdown]
# #### drop_firstを指定しないget_dummies関数の戻り値
pd.get_dummies(df2['Sex'])

# %% [markdown]
# #### Embarked列をダミー変数化する

# %%
pd.get_dummies(df2['Embarked'], drop_first=True)

# %% [markdown]
# #### drop_firstをFalseにしてみた場合

# %%
embarked = pd.get_dummies(df2['Embarked'], drop_first=False)
embarked.head(3)

# %% [markdown]
# ### データフレームの連結

# %% [markdown]
# #### concat関数で２つのデータフレームを横方向に連結

# %%
x_temp = pd.concat([x,male], axis=1)

x_temp.head(2)

# %% [markdown]
# #### axis = 0で縦方向に連結

# %%
tmp = pd.concat([x, x], axis=0)

tmp.shape

# %% [markdown]
# ### モデルの再学習

# %% [markdown]
# #### モデルの再学習

# %%
x_new = x_temp.drop('Sex', axis=1)
for j in range(1,6): # jは木の深さ
  # x_newは特徴量、tは目的変数
  s1, s2, m = learn(x_new, t, depth=j)
  s = '深さ{}:訓練データ精度{}::テストデータ精度{}'
  print(s.format(j, s1, s2))

# %% [markdown]
# #### 学習したモデルを保存する

# %%
# 木の深さを5に指定して改めて学習
s1, s2, model = learn(x_new, t, depth=5)

# モデルの保存
import pickle
file = path + '/model/survived.pkl'
with open(file, 'wb') as f:
    pickle.dump(model, f)


# %% [markdown]
# ## 決定木における特徴量の考察

# %% [markdown]
# ### 特徴量と正解データの関係性

# %% [markdown]
# #### feature_importances_で特徴量重要度を確認

# %%
model.feature_importances_

# %% [markdown]
# #### 特徴量重要度をデータフレームに変換して表示

# %%
# データフレームに変換
pd.DataFrame(model.feature_importances_, index=x_new.columns)


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
