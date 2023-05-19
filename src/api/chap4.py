
# %% [markdown]
# # 機械学習の体験
# %%
import unittest
import doctest
import os
folder = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## きのこ派とたけのこ派に分類する
#
# %%

# %% [markdown]
# ## pandas超入門
#
# %% [markdown]
# ### pandasのインポート
# %% [markdown]
# #### pandasをインポート
# %%
import pandas as pd
from pandas.testing import assert_frame_equal

# %% [markdown]
# ### データフレームの作成
# %% [markdown]
# #### ディクショナリをDataFrame関数でデータフレームに変換
data = {
    '松田の労働時間' : [160, 160], # 松田の労働時間列の作成
    '浅木の労働時間' : [161, 175], # 浅木の労働時間列の作成
}

df = pd.DataFrame(data)
df # DataFrameの表示

# %%
# DataFrameのアサーション
assert_frame_equal(df, pd.DataFrame({
    '松田の労働時間' : [160, 160],
    '浅木の労働時間' : [161, 175],
}))

# %% [markdown]
# #### type関数でデータフレームのデータ型を確認
# %%
# セルの途中の場合、print関数を
# 利用しないと表示できない
print(type(df))
df.shape

# %% [markdown]
# ### インデックスや列名の走査
# %%
# %% [markdown]
# #### インデックスをデフォルトの整数から月に変更する
# %%
df.index = ['4月', '5月'] # インデックスの変更
df # DataFrameの表示

# %% [markdown]
# #### 列名を変更する
# %%
df.columns = ['松田の労働(h)', '浅木の労働(h)'] # 列名の変更
df # DataFrameの表示

# %% [markdown]
# #### インデックスや列名のみを参照する
# %%
print(df.index) # インデックスの参照
print(df.columns) # 列名の参照

# %% [markdown]
# #### DataFrame関数の引数でインデックスや列名を指定する
df = [
    [160, 161],
    [160, 175]
]

df2 = pd.DataFrame(data, index= ['4月', '5月'], columns=['松田の労働', '浅木の労働'])

# %% [markdown]
# ### CSVファイルの読み込み
# %% [markdown]
# #### read_csv関数でCSVファイルからデータを読み込む
# %%
# pandasは別名pdでインポート済み
# KvsT.csvファイルを読み込んで、データフレームに変換
file = folder + '/data/KvsT.csv'
df = pd.read_csv(file)
# 先頭3行だけ表示
df.head(3)

# %% [markdown]
# ### 特定の列の参照

# %% [markdown]
# #### 指定した列だけを参照する
# %%
# 身長列だけを参照
df['身長']

# %% [markdown]
# #### 複数の列を一度に参照する
# %%
# 抜き出したい列名の文字列リストを作成
col = ['身長', '体重']
# 身長と体重の列だけを参照
df[col]

# %% [markdown]
# #### 1列だけ抜き出したデータの型
# %%
type(df['派閥'])

# %% [markdown]
# #### 1次元のデータを扱うSeries型
# %%
df['派閥']

# %% [markdown]
# ## データの前処理
#
# %%

# %% [markdown]
# ### 特徴量と正解データ

# %% [markdown]
# #### 特徴量を変数xに代入
# %%
# 特徴量の列を参照してxに代入
xcol = ['身長', '体重', '年代']
x = df[xcol]
x

# %% [markdown]
# #### 正解データを変数tに代入
# %%
# 正解データ(派閥)を参照して, tに代入
t = df['派閥']
t

# %% [markdown]
# ## モデルの準備と機械学習の実行
#
# %% [markdown]
# ### scikit-learnのインポート
# %% [markdown]
# #### treeモジュールのインポート
# %%
from sklearn import tree

# %% [markdown]
# #### モデルの準備と学習

# %% [markdown]
# ##### モデルの準備と学習の実行
# %%
# モデルの準備（未学習）
model = tree.DecisionTreeClassifier(random_state=0)

# 学習の実行（x,tは事前に定義済みの特徴料と正解ラベル）
model.fit(x, t)

# %% [markdown]
# #### 新しいデータでの予測
# %%

# %% [markdown]
# ##### きのこかたけのこか予測する
# %%
# 身長170cm,体重70kg,年齢20代のデータ（新しいデータ)を
# 2次元リストで作成
taro = [[170, 70, 20]]

# taroがどちらに分類されるか予測
model.predict(taro)

# %% [markdown]
# ##### 複数の予測を一度に実行
# %%
matsuda = [172, 65, 20] # 松田のデータ
asagi = [158, 48, 20]     # 浅木のデータ
new_data = [matsuda, asagi] # 2人のデータを二次元リスト化

model.predict(new_data) # 2人のデータを一括で予測

# %% [markdown]
# ## モデルの評価
#
# %%

# %% [markdown]
# ### 予測性能の評価

# %% [markdown]
# #### 正解率
# $正解率 = \frac{実際の答えと予測結果が一致している件数}{全データ件数}$

# %%
from PIL import Image
file = folder + '/img/4-9.png'
im = Image.open(file)
im

# %% [markdown]
# #### 正解率の計算
# %%
# 正解率の計算
model.score(x, t)

# %% [markdown]
# ## モデルの保存
#
# %%

# %% [markdown]
# ### pickleによるモデルの保存
# %% [markdown]
# #### モデルの保存
# %%
import pickle

file = folder + '/model/kvst-model.pkl'
with open(file, 'wb') as f:
    pickle.dump(model, f)

# %% [markdown]
# #### KinokoTakenoko.pklからモデルを変数に読み込む
# %%
import pickle

with open(file, 'rb') as f:
    model = pickle.load(f)

# %% [markdown]
# #### ファイルから読み込んだ学習済モデルで予測する
# %%
suzuki = [[180, 80, 30]]
model.predict(suzuki)

# %% [markdown]
# #### データの準備・前処理からモデルの評価までの全体像
# %%
import pandas as pd

# データの読み込み
file = folder + '/data/KvsT.csv'
df = pd.read_csv(file)

# 特徴量と正解データに分割
xcol = ['身長', '体重', '年代']
x = df[xcol]
t = df['派閥']

# モデルの準備と学習
from sklearn import tree
model = tree.DecisionTreeClassifier(random_state=0)
model.fit(x, t)

# 正解率の計算
model.score(x, t)
