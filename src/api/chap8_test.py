# %% [markdown]
# # 回帰2:住宅の平均価格の予測

# %%
import unittest
import doctest
import os

path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 住宅平均価格を予測する

# %% [markdown]
# ### データの概要
from PIL import Image
im = Image.open(path + '/img/8-1.png')
im

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### CSVファイルの読み込み

# %% [markdown]
# #### ライブラリなどをインポートする

# %%
import pandas as pd
#%matplotlib inline
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

# %% [markdown]
# #### Boston.csvを読み込む

# %%
df = pd.read_csv(path + '/data/Boston.csv')
df.head(2)

# %% [markdown]
# ### ダミー変数化

# %% [markdown]
# #### CRIME列にデータが何種類あるか調べる

# %%
df['CRIME'].value_counts()

# %% [markdown]
# #### ダミー変数化した列を連結しCRIME列を削除

# %%
crime = pd.get_dummies(df['CRIME'], drop_first=True)

df2 = pd.concat((df, crime), axis=1)
df2 = df2.drop('CRIME', axis=1)
df2.head(2)

# %% [markdown]
# ### 訓練データ、検証データ、テストデータの分割

# %% [markdown]
# #### 訓練データ&検証データとテストデータに分割する

# %%
train_val, test = train_test_split(df2, test_size=0.2, random_state=0)

# %% [markdown]
# ### 欠損値の処理

# %% [markdown]
# #### train_valの欠損値を確認する

# %%
train_val.isnull().sum()

# %% [markdown]
# #### 欠損値を平均値で穴埋めする

# %%
train_val_mean = train_val.mean() # 各列の平均値の計算
train_val2 = train_val.fillna(train_val_mean) # 平均値で穴埋め

# %% [markdown]
# ### 外れ値の処理

# %% [markdown]
# #### 各特徴量の列とPRICE列の相関関係を示す散布図を描く
colname = train_val2.columns
for name in colname:
    train_val2.plot(kind='scatter', x=name, y='PRICE')

# %% [markdown]
# #### 外れ値が存在するインデックスを確認する

# %%
# RMの外れ値
out_line1 = train_val2[(train_val2['RM'] < 6) & (train_val2['PRICE'] > 40)].index
# PTRATIOの外れ値
out_line2 = train_val2[(train_val2['PTRATIO'] > 18) & (train_val2['PRICE'] > 40)].index

print(out_line1, out_line2)


# %% [markdown]
# #### 外れ値を削除する

# %%
train_val3 = train_val2.drop([76], axis=0)

# %% [markdown]
# #### 絞り込んだ列以外を取り除く

# %%
col = ['INDUS', 'NOX', 'RM', 'PTRATIO', 'LSTAT', 'PRICE']

train_val4 = train_val3[col]
train_val4.head(3)

# %% [markdown]
# ### 相関係数による特徴量の絞り込み

# %% [markdown]
# #### 列同士の相関係数を調べる

# %%
train_val4.corr()

# %% [markdown]
# #### 各列とPRICE列との相関係数を見る

# %%
train_cor = train_val4.corr()['PRICE']
train_cor

# %% [markdown]
# #### abs関数で絶対値に変換

# %%
print(abs(1)) # 1の絶対値を計算
print(abs(-2)) # -2の絶対値を計算

# %% [markdown]
# #### mapメソッドで要素に関数を適用する

# %%
se = pd.Series([1, 2, 3, 4, 5]) # シリーズの作成

# seの各要素にabs関数を適応させた結果をシリーズ化
se.map(abs)

# %% [markdown]
# #### 相関行列のPRICE列との相関係数を絶対値に変換する

# %%
abs_cor = train_cor.map(abs)
abs_cor

# %% [markdown]
# #### sort_valuesメソッドで要素を降順に並び替える

# %%
# 降順に並べ替える
abs_cor.sort_values(ascending=False)

# %% [markdown]
# ### 訓練データと検証データの分割

# %% [markdown]
# #### 訓練データと検証データに分割する

# %%
col = ['RM', 'LSTAT', 'PTRATIO']
x = train_val4[col]
t = train_val4[['PRICE']]

# 訓練データと検証データに分割する
x_train, x_val, y_train, y_val = train_test_split(x, t, test_size=0.2, random_state=0)

# %% [markdown]
# ### データの標準化

# %% [markdown]
# #### scikit-learnのpreprocessingモジュールを使う

# %%
from sklearn.preprocessing import StandardScaler

sc_model_x = StandardScaler()
sc_model_x.fit(x_train)

# 各列のデータを標準化してsc_xに代入
sc_x = sc_model_x.transform(x_train)
sc_x # 表示

# %% [markdown]
# #### 平均値0を確認する

# %%
# array型だと見づらいのでデータフレームに変換
tmp_df = pd.DataFrame(sc_x, columns=x_train.columns)
# 平均値の計算
tmp_df.mean()

# %% [markdown]
# #### 標準偏差1を確認する

# %%
tmp_df.std() # 標準偏差の計算

# %% [markdown]
# #### 正解データを標準化する

# %%
sc_model_y = StandardScaler()
sc_model_y.fit(y_train)

sc_y = sc_model_y.transform(y_train)

# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# #### 標準化したデータで学習させる

# %%
model = LinearRegression()
model.fit(sc_x, sc_y) # 標準化済みの訓練データで学習

# %% [markdown]
# ## モデルの評価とチューニング

# %% [markdown]
# ### 標準化データによる予測性能の評価

# %% [markdown]
# #### scoreメソッドで決定係数を求める

# %%
model.score(x_val, y_val)

# %% [markdown]
# #### 検証データを標準化する

# %%
sc_x_val = sc_model_x.transform(x_val)
sc_y_val = sc_model_y.transform(y_val)
# 標準化した検証データで決定係数を計算
model.score(sc_x_val, sc_y_val)

# %% [markdown]
# #### 間違って検証データの平均値と標準偏差を使って標準化

# %%
# 以下、やってはいけない間違いコード
sc_model_x2 = StandardScaler()
sc_model_x2.fit(x_val)
sc_x_val = sc_model_x2.transform(x_val)
sc_model_y2 = StandardScaler()
sc_model_y2.fit(y_val)
sc_y_val = sc_model_y2.transform(y_val)
model.score(sc_x_val, sc_y_val)

# %% [markdown]
# ### チューニングの目標と準備

# %% [markdown]
# #### learn関数の定義

# %%
def learn(x,t):
    x_train, x_val, y_train, y_val = train_test_split(x, t, test_size=0.2, random_state=0)
    # 訓練データを標準化
    sc_model_x = StandardScaler()
    sc_model_y = StandardScaler()
    sc_model_x.fit(x_train)
    sc_x_train = sc_model_x.transform(x_train)
    sc_model_y.fit(y_train)
    sc_y_train = sc_model_y.transform(y_train)
    # 学習
    model = LinearRegression()
    model.fit(sc_x_train, sc_y_train)

    # 検証データを標準化
    sc_x_val = sc_model_x.transform(x_val)
    sc_y_val = sc_model_y.transform(y_val)
    # 訓練データと検証データの決定係数計算
    train_score = model.score(sc_x_train, sc_y_train)
    val_score = model.score(sc_x_val, sc_y_val)

    return train_score, val_score

# %% [markdown]
# #### learn関数を実行する

# %%
x = train_val3.loc[:, ['RM', 'LSTAT', 'PTRATIO']]
t = train_val3[['PRICE']]

s1,s2 = learn(x,t)
print(s1, s2)

# %% [markdown]
# ### 特徴量の追加

# %% [markdown]
# #### 特徴量にINDUS列を追加する

# %%
x = train_val3.loc[:, ['RM', 'LSTAT', 'PTRATIO', 'INDUS']]
t = train_val3[['PRICE']]
s1,s2 = learn(x,t)
print(s1, s2)

# %% [markdown]
# ### 特徴量エンジニアリング

# %% [markdown]
# ### 多項式特徴量と多項式回帰

# %% [markdown]
# #### データフレームのRM列のデータを2乗する

# %%
x['RM'] ** 2

# %% [markdown]
# #### 新しい列を特徴量に追加する

# %%
# RM2乗のシリーズを新しい列として追加
x['RM2'] = x['RM'] ** 2
# コード8-29で、INDUS列を追加したので削除
x = x.drop('INDUS', axis=1)
x.head(2)

# %% [markdown]
# #### 行を追加する

# %%
# インデックスを2000として新しい行を追加
x.loc[2000] = [10,7,8,100]
print(x.tail(2)) # 確認

# 第8章の本筋に関係ないので削除
x = x.drop(2000, axis=0)

# %% [markdown]
# #### 新しい列が追加されたので再学習を行う

# %%
s1,s2 = learn(x,t)
print(s1, s2)

# %% [markdown]
# #### LSTAT列とPTRATIO列で新しい列を特徴量に追加する

# %%
# LSTAT列の2乗を追加
x['LSTAT2'] = x['LSTAT'] ** 2
s1,s2 = learn(x,t)
print(s1, s2)

# PTRATIO列の2乗を追加
x['PTRATIO2'] = x['PTRATIO'] ** 2
s1,s2 = learn(x,t)
print(s1, s2)

# %% [markdown]
# ### 交互作用特徴量

# %% [markdown]
# #### 2つのシリーズに算術演算を行う

# %%
se1 = pd.Series([1,2,3])
se2 = pd.Series([10,20,30])
se1 + se2 # 対応する各要素を足し算したシリーズ

# %% [markdown]
# #### 交互作用特徴量を追加する

# %%
x['RM * LSTAT'] = x['RM'] * x['LSTAT']
x.head(2)

# %% [markdown]
# #### 交互作用特徴量を追加したので再学習を行う

# %%
s1,s2 = learn(x,t)
print(s1, s2)

# %% [markdown]
# #### データの標準化後に再学習を行う

# %%
# 訓練データと検証データを合わせて再学習させるので
# 再度、標準化する
sc_model_x2 = StandardScaler()
sc_model_x2.fit(x)
sc_x = sc_model_x2.transform(x)

sc_model_y2 = StandardScaler()
sc_model_y2.fit(t)
sc_y = sc_model_y2.transform(t)
model = LinearRegression()
model.fit(sc_x, sc_y)

# %% [markdown]
# ### テストデータでの評価

# %% [markdown]
# #### テストデータの前処理

# %%
test2 = test.fillna(train_val.mean()) # 欠損値を平均値で補完
x_test = test2.loc[:, ['RM', 'LSTAT', 'PTRATIO']]
y_test = test2[['PRICE']]

x_test['RM2'] = x_test['RM'] ** 2
x_test['LSTAT2'] = x_test['LSTAT'] ** 2
x_test['PTRATIO2'] = x_test['PTRATIO'] ** 2

x_test['RM * LSTAT'] = x_test['RM'] * x_test['LSTAT']

sc_x_test = sc_model_x2.transform(x_test)
sc_y_test = sc_model_y2.transform(y_test)

# %% [markdown]
# #### 決定係数を計算する

# %%
model.score(sc_x_test, sc_y_test)

# %% [markdown]
# ### モデルの保存

# %% [markdown]
# #### モデルを保存する

# %%
import pickle
with open(path + '/data/boston.pkl', mode='wb') as fp:
    pickle.dump(model, fp)
with open(path + '/data/boston_scx.pkl', mode='wb') as fp:
    pickle.dump(sc_model_x2, fp)
with open(path + '/data/boston_scy.pkl', mode='wb') as fp:
    pickle.dump(sc_model_y2, fp)


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
