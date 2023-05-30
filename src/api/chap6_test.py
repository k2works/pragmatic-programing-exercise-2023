# %% [markdown]
# # 回帰1:映画の興行収入の予測

# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 映画の興行収入を予測する

# %% [markdown]
# ### 分析の目的とデータの概要

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### CSVファイルの読み込み

# %% [markdown]
# #### cinema.csvの読み込み

# %%
import pandas as pd

df = pd.read_csv(path + '/data/cinema.csv')
df.head(3) # 先頭3行を表示

# %% [markdown]
# ### 欠損値の処理

# %% [markdown]
# #### 欠損値の確認

# %%
df.isnull().any(axis=0)

# %% [markdown]
# #### 欠損値の穴埋め

# %%
# 欠損値を平均で補完して、df2に代入
df2 = df.fillna(df.mean())

# 穴埋めができたか確認
df2.isnull().any(axis=0)

# %% [markdown]
# ### 散布図による外れ値の確認

# %% [markdown]
# #### SNS2列とsales列の散布図を作成

# %%
# JupyterLab上にグラフを描画するためのおまじない
# %matplotlib inline

# SNS2とsalesの散布図の作成
df.plot(kind='scatter', x='SNS2', y='sales')

# %% [markdown]
# #### 特徴量と組合わせを変えて散布図を作成

# %%
df2.plot(kind='scatter', x='SNS1', y='sales')
df2.plot(kind='scatter', x='SNS2', y='sales')
df2.plot(kind='scatter', x='actor', y='sales')

# %% [markdown]
# #### コード6-5と同じことをfor文との組合わせで行う

# %%
for name in df2.columns:
    #X軸がcinema_id列とsales列の散布図は作っても意味が無いので外す
    if name == 'cinema_id' or name == 'sales':
        continue

    df2.plot(kind='scatter', x=name, y='sales')

# %% [markdown]
# ### 外れ値の削除

# %%
# #### 外れ値を削除する

# %%
no = df2[(df2['SNS2'] > 1000 ) & (df2['sales'] < 8500)].index
df3 = df2.drop(no, axis=0)

# %% [markdown]
# ### 特定の行の参照

# %% [markdown]
# #### データフレームを作成する

# %%
test = pd.DataFrame(
    {'Acolumn':[1,2,3],
     'Bcolumn':[4,5,6]
     }
     )

# %% [markdown]
# #### Acolumn列の値が2未満の行だけを参照する

# %%
test[test['Acolumn'] < 2]

# %% [markdown]
# #### Acolumn列(シリーズ型)に対して比較演算を行う

# %%
test['Acolumn'] < 2

# %% [markdown]
# #### 2つの条件で外れ値の行を特定する

# %%
# SNS2列が1000より大きく、sales列が8500より小さい行を特定
df2[(df2['SNS2'] > 1000 ) & (df2['sales'] < 8500)]

# %% [markdown]
# #### 特定した行からインデックスのみを取り出す

# %%
no = df2[(df2['SNS2'] > 1000 ) & (df2['sales'] < 8500)].index
no

# %% [markdown]
# ### 行や列の削除

# %% [markdown]
# #### dropメソッドでインデックスが0の行を削除する

# %%
test.drop(0, axis=0)

# %% [markdown]
# #### 列を削除する

# %%
test.drop('Bcolumn', axis=1)

# %% [markdown]
# ### 外れ値を含む行の削除

# %% [markdown]
# #### dropメソッドで外れ値を含む行を削除する

# %%
df3 = df2.drop(no, axis=0) # 外れ値の行を削除
df3.shape # 行が削除できたかどうかを行数で確認

# %% [markdown]
# ### locによる特徴量と正解データの取り出し

# %% [markdown]
# #### df3から特徴量の変数xと正解データの変数tに分割

# %%
# 特徴量の列の候補
col = ['SNS1', 'SNS2', 'actor', 'original']
x = df3[col] # 特徴量の取り出し

t = df3['sales'] # 正解データの取り出し

# %% [markdown]
# #### インデックス2の行からSNS1列の値を取り出す

# %%
# インデックスが2,列がSNS1のマスの値のみ参照
df3.loc[2, 'SNS1']

# %% [markdown]
# #### 特定のデータのみ参照する

# %%
index = [2,4,6] # インデックス
col = ['SNS1', 'actor'] # 列名
df3.loc[index, col]

# %% [markdown]
# #### スライス構文で連続した要素を参照する

# %%
sample = [10, 20, 30, 40] # リストの作成
sample[1:3] # 添え字が1以上3未満の要素を取得

# %% [markdown]
# #### データフレームで複数のインデックスや列名を参照する

# %%
# 0行目以上3行目以下、actor列より左の列(actor列含む)
df3.loc[0:3, :'actor']

# %% [markdown]
# #### スライス構文で特徴量と正解データを取り出す

# %%
x = df3.loc[:, 'SNS1':'original'] # 特徴量の取り出し

t = df3['sales'] # 正解ラベルの取り出し

# %% [markdown]
# ### 訓練データとテストデータの分割

# %% [markdown]
# #### 訓練データとテストデータに分割する

# %%
from sklearn.model_selection import train_test_split
x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)

# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### 線形回帰分析の概要

# %% [markdown]
# ### 最小２乗法の概要

# %% [markdown]
# ### 重回帰モデルの作成と学習、分析の実行

# %% [markdown]
# #### 重回帰モデルのLinerRegression関数をインポートする

# %%
from sklearn.linear_model import LinearRegression

# %% [markdown]
# #### LinearRegression関数を使ってモデルを作成する

# %%
model = LinearRegression()

# %% [markdown]
# #### fitメソッドでモデルを学習させる

# %%
model.fit(x_train, y_train)

# %% [markdown]
# ### 未知データでの予測

# %% [markdown]
# #### 興行収入を予測する

# %%
new = [[150, 700, 300, 0]] # 新しいデータを２次元リストで作成
model.predict(new) # 学習済みモデルで推論


# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 回帰での評価指標

# %% [markdown]
# #### scoreメソッドでモデルのscoreを計算

# %%
model.score(x_test, y_test)

# %% [markdown]
# #### MAEを求める

# %%
from sklearn.metrics import mean_absolute_error

pred = model.predict(x_test) # x_testのデータを一括で予測

# 平均絶対誤差の計算
mean_absolute_error(y_pred= pred, y_true= y_test)

# %% [markdown]
# ### 決定係数

# %% [markdown]
# #### socreメソッド

# %%
model.score(x_test, y_test)

# %% [markdown]
# ### モデルの保存

# %% [markdown]
# #### モデルを保存する

# %%
import pickle

with open(path + '/model/cinema.pkl', 'wb') as f:
    pickle.dump(model, f)

# %% [markdown]
# ## 回帰式による影響度の分析

# %% [markdown]
# ### 計算式の係数と切片の確認

# %% [markdown]
# #### 係数と切片を確認

# %%
print(model.coef_) # 計算式の係数の表示
print(model.intercept_) # 計算式の切片の表示

# %% [markdown]
# #### 列と係数を表示する

# %%
tmp = pd.DataFrame(model.coef_) # データフレームの作成
tmp.index = x_train.columns # 列名をインデックスに指定
tmp

# %% [markdown]
# ### 正解データと特徴量の影響度の考察

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
