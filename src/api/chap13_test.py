# %% [markdown]
# # さまざまな予測性能評価
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 回帰の予測性能評価

# %% [markdown]
# ### 平均絶対誤差（MAE）の復習

# %% [markdown]
# ### 平均二乗誤差（MSE）の復習

# %% [markdown]
# #### コード13-1 データとモデルの準備

# %%
import pandas as pd
# 欠損値があるままでは学習できないので欠損値処理だけ行う
df = pd.read_csv(path + '/data/cinema.csv')
df = df.fillna(df.mean())
x = df.loc[:, 'SNS1':'original']
t = df['sales']
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(x, t)

# %% [markdown]
# #### コード13-2 平均2乗誤差を計算する

# %%
from sklearn.metrics import mean_squared_error
# 訓練データでのMSE値
pred = model.predict(x)

mse = mean_squared_error(t, pred)
mse

# %% [markdown]
# ### ２乗平均平方根誤差（RMSE）

# %% [markdown]
# $$
# RMSE = \sqrt{MSE}
# $$

# %% [markdown]
# #### コード13-3 RMSEの計算

# %%
import math
math.sqrt(mse) # RMSEの計算

# %% [markdown]
# #### コード13-4 予測結果と実際の誤差を検証する

# %%
from sklearn.metrics import mean_absolute_error
yosoku = [2, 3, 5, 7, 11, 13] # 予測結果をリストで作成
target = [3, 5, 8, 11, 16, 19] # 実際の結果をリストで作成

mse = mean_squared_error(target, yosoku)
print('rmse:{}'.format(math.sqrt(mse)))
print('mae:{}'.format(mean_absolute_error(target, yosoku)))

print('外れ値の混入')
yosoku = [2, 3, 5, 7, 11, 13, 46] # 実際には23だけど46と予測
target = [3, 5, 8, 11, 16, 19, 23]
mse = mean_squared_error(target, yosoku)
print('rmse:{}'.format(math.sqrt(mse)))
print('mae:{}'.format(mean_absolute_error(target, yosoku)))


# %% [markdown]
# ## 分類の予測性能評価

# %% [markdown]
# ### 適合率と再現率

# %% [markdown]
# #### コード13-5 データの準備

# %%
# データの準備
df = pd.read_csv(path + '/data/Survived.csv')
df = df.fillna(df.mean())

x = df[['Pclass', 'Age']]
t = df['Survived']

# %% [markdown]
# #### コード13-6 モデルの準備

# %%
# モデルの準備
from sklearn import tree
model = tree.DecisionTreeClassifier(max_depth=2, random_state=0)
model.fit(x, t)

# %% [markdown]
# #### コード13-7 再現率と適合率を一括で計算

# %%
from sklearn.metrics import classification_report
pred = model.predict(x)
out_put = classification_report(t, pred)
print(out_put)

# %% [markdown]
# #### コード13-8 classification_report関数にパラメータ引数を指定

# %%
out_put = classification_report(t, pred, output_dict=True)

# out_putをデータフレームに変換
pd.DataFrame(out_put)

# %% [markdown]
# ### f1-score


# %% [markdown]
# ## K分割交差検証

# %% [markdown]
# ### ホールドアウト法の問題点

# %% [markdown]
# ### K分割交差検証

# %% [markdown]
# #### コード13-9 K分割交差検証のためのデータ準備
df = pd.read_csv(path + '/data/cinema.csv')
# 学習できないので欠損値処理だけ行う
df = df.fillna(df.mean())
x = df.loc[:, 'SNS1':'original']
t = df['sales']

# %% [markdown]
# #### コード13-10 KFoldの処理で分割時の条件を指定

# %%
from sklearn.model_selection import KFold
kf = KFold(n_splits=3, shuffle=True, random_state=0)

# %% [markdown]
# #### コード13-11 cross_validate関数で交差検証を行う

# %%
from sklearn.model_selection import cross_validate
model = LinearRegression()
result = cross_validate(model, x, t, cv=kf, scoring='r2', return_train_score=True)
print(result)

# %% [markdown]
# #### コード13-12 平均値を計算する

# %%
sum(result['test_score']) / len(result['test_score'])

# %% [markdown]
# ### 分類モデルを作るときの交差検証の注意点

# %% [markdown]
# #### コード13-13 StratifiedKFoldのインポート

# %%
from sklearn.model_selection import StratifiedKFold

skf = StratifiedKFold(n_splits=3, shuffle=True, random_state=0)

# %% [markdown]
# ### チューニング後の処理



# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
