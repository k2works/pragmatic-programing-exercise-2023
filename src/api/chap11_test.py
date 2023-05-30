# %% [markdown]
# # さまざまな教師あり学習：回帰
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## リッジ回帰

# %% [markdown]
# ### リッジ回帰の概要

# %%  [markdown]
# ### バイアス・バリアンス分解

# %% [markdown]
# ### バリアンスと過学習

# %% [markdown]
# ### リッジ回帰の利用

# %% [markdown]
# #### コード 11-1 共通する準備作業

# %%
# 絶対使うであろうモジュールのインポート
import pandas as pd

from sklearn.model_selection import train_test_split

#%matplotlib inline
from sklearn.preprocessing import StandardScaler

# %% [markdown]
# #### コード 11-2 Boston.csvを利用する

# %%
df = pd.read_csv(path + '/data/Boston.csv') # csvの読み込み
df = df.fillna(df.mean()) # 欠損値補完
df = df.drop([76], axis=0) # 外れ値の行を削除

t = df[['PRICE']] # 正解データの抜き出し
x = df.loc[:,['RM', 'PTRATIO', 'LSTAT']] # 説明変数の抜き出し

# 標準化
sc = StandardScaler()
sc_x = sc.fit_transform(x)
sc2 = StandardScaler()
sc_t = sc2.fit_transform(t)

# %% [markdown]
# #### コード 11-3 累計列と交互作用特徴量を一括追加する

# %%
from sklearn.preprocessing import PolynomialFeatures

pf = PolynomialFeatures(degree=2, include_bias=False)
pf_x = pf.fit_transform(sc_x) # 2乗列と交互作用特徴量の追加
pf_x.shape # 行数と列数

# %% [markdown]
# #### コード 11-4 列名を確認する処理

# %%
pf.get_feature_names_out()

# %% [markdown]
# #### コード 11-5 線形回帰で過学習が起こることを確認

# %%
from sklearn.linear_model import LinearRegression

x_train, x_test, y_train, y_test = train_test_split(pf_x, sc_t, test_size=0.3, random_state=0)
model = LinearRegression()
model.fit(x_train, y_train)

print(model.score(x_train, y_train))
model.score(x_test, y_test)

# %% [makrdown]
# #### コード 11-6 リッジ回帰で過学習が起こるか確認

# %%
from sklearn.linear_model import Ridge # モジュールインポート
# モデルの作成
ridgeModel = Ridge(alpha=10)
ridgeModel.fit(x_train, y_train) # 学習
print(ridgeModel.score(x_train, y_train))
print(ridgeModel.score(x_test, y_test))

# %% [markdown]
# #### コード 11-7 正規化項の定数を0.01～20まで0.01刻みで検証するコード

# %%
maxScore = 0
maxIndex = 0
# range関数により整数列を1～2000生成
for i in range(1, 2001):
    num = i / 100
    ridgeModel = Ridge(random_state=0,alpha=num)
    ridgeModel.fit(x_train, y_train)

    result = ridgeModel.score(x_test, y_test)
    if result > maxScore:
        maxScore = result
        maxIndex = num

print(maxIndex, maxScore)

# %% [markdown]
# #### コード 11-8 重回帰とリッジ回帰の係数の大きさを比較する

# %%
print(sum(abs(model.coef_))[0]) # 線形回帰の係数（絶対値）の合計
print(sum(abs(ridgeModel.coef_))[0]) # リッジ回帰の合計

# %% [markdown]
# ## ラッソ回帰

# %% [markdown]
# ### ラッソ回帰の概要

# %% [markdown]
# #### コード 11-9 ラッソ回帰モデルで過学習が起きていないか確認する

# %%
# ライブラリインポート
from sklearn.linear_model import Lasso

x_train, x_test, y_train, y_test = train_test_split(pf_x, sc_t, test_size=0.3, random_state=0)

# ラッソ回帰モデル作成(alphaは正則化項につく定数)
model = Lasso(alpha=0.1)
model.fit(x_train, y_train)

print(model.score(x_train, y_train)) # 訓練データの決定係数
print(model.score(x_test, y_test)) # テストデータの決定係数

# %% [markdown]
# #### コード 11-10 回帰式の係数を確認する

# %%
weight = model.coef_ # 係数抜き出す
# 見やすいようにシリーズ変換
pd.Series(weight, index=pf.get_feature_names_out())

# %% [markdown]
# ## 回帰木

# %% [markdown]
# ### 回帰木の概要

# %% [markdown]
# #### コード 11-11 ボストンの住宅価格のデータを読み込む
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv(path + '/data/Boston.csv')
df = df.fillna(df.mean())
x = df.loc[:,'ZN':'LSTAT']
t = df['PRICE']

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.3, random_state=0)

# %% [markdown]
# #### コード 11-12 回帰木を用いた学習

# %%
# ライブラリインポート（回帰木バージョン）
from sklearn.tree import DecisionTreeRegressor

# 木の深さの最大を10と設定
model = DecisionTreeRegressor(max_depth=10, random_state=0)
model.fit(x_train, y_train)
model.score(x_test, y_test) # テストデータでの決定係数

# %% [markdown]
# #### コード 11-13 特徴量の重要度を参照する

# %%
pd.Series(model.feature_importances_, index=x.columns)



# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)

