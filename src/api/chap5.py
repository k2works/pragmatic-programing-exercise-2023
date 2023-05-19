# %% [markdown]
# # 分類1:アヤメの判定

# %%
import os
folder = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## アヤメの花を分類する

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### CSVファイルの読み込み

# %% [markdown]
# #### データフレームの作成

# %%
import pandas as pd # pandasをインポート
# iris.csvファイルを読み込んで、データフレームに変換
file = folder + '/data/iris.csv'
df = pd.read_csv(file)
df.head(3) # 先頭3行だけ表示

# %% [markdown]
# #### 正解データの確認（文字データの集計）

# %% [markdown]
# #### uniqueメソッドで種類列の値を確認

# %%
df['種類'].unique()

# %% [markdown]
# #### array型の特定要素を参照

# %%
syurui = df['種類'].unique()
syurui[0]

# %% [markdown]
# #### value_countsメソッドでデータの出現回数をカウント

# %%
df['種類'].value_counts()

# %% [markdown]
# ### 欠損値の確認

# %% [markdown]
# #### tailメソッドでデータフレームの末尾3行を表示

# %%
df.tail(3) # 末尾3行だけ表示

# %% [markdown]
# #### isnullメソッドで欠損値の有無を確認

# %%
df.isnull() # 各マスが欠損値かどうかを確認

# %% [markdown]
# #### anyメソッドで欠損値の有無を確認

# %%
# 列単位で欠損値が存在するか調べる
df.isnull().any(axis=0)

# %% [markdown]
# #### sumメソッドで欠損値の数を確認

# %%
df.sum() # 列単位で欠損値の数を確認

# %% [markdown]
# #### isnullメソッドとsumメソッドを組み合わせて欠損値の数を確認

# %%
# 各列に欠損値がいくつあるか確認
tmp = df.isnull()
tmp.sum()

# %% [markdown]
# ### 欠損値を含む行または列の削除

# %% [markdown]
# #### dropnaメソッドで欠損値を含む行を削除

# %%
# 欠損値が1つでもある行を削除した結果を、df2に代入
df2 = df.dropna(how='any', axis=0)

df2.tail(3) # 欠損値の存在確認

# %% [markdown]
# ### 欠損値の穴埋め

# %% [markdown]
# #### fillnaメソッドで欠損値を穴埋め

# %%
df['花弁長さ'] = df['花弁長さ'].fillna(0)
df.tail(3)

# %% [markdown]
# ### 代表値の計算

# %% [markdown]
# #### meanメソッドで平均値を計算

# %%
# 数値列の各平均値を計算（文字列の列は自動的に除外してくれる）
df.mean()

# %% [markdown]
# #### 特定の列だけ計算する
df['がく片長さ'].mean()

# %% [markdown]
# #### 標準偏差の計算
df.std() # 各列の標準偏差

# %% [markdown]
# #### 平均値を求めてデータフレームの欠損値と置き換える

# %%
df = pd.read_csv(file)

# 各列の平均値を計算して、colmeanに代入
colmean = df.mean()

# 平均値で欠損値を穴埋めしてdf2に代入
df2 = df.fillna(colmean)

# 欠損値があるか確認
df2.isnull().any(axis=0)

# %% [markdown]
# ### 特徴量と正解データの取り出し

# %% [markdown]
# #### 特徴量と正解データを変数に代入
xcol = ['がく片長さ', 'がく片幅', '花弁長さ', '花弁幅']

x = df2[xcol]
t = df2['種類']

# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### 決定木の概要

# %% [markdown]
# ### 乱数の利用と再現性

# %% [markdown]
# ### モデルの作成

# %%
# モジュールのインポート
from sklearn import tree

# 決定木のモデルを作成
model = tree.DecisionTreeClassifier(max_depth=2, random_state=0)

# %% [markdown]
# ### モデルの学習と正解率計算の落とし穴

# %% [markdown]
# #### モデルの学習と正解率の計算

# %%
model.fit(x, t) # モデルの学習
model.score(x, t) # 学習済みモデルの正解率計算

# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 訓練データとテストデータの分割（ホールドアウト法）

# %% [markdown]
# #### 訓練データとテストデータに分割する

# %%
# 関数のインポート
from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.3, random_state=0)

# x_train, y_trainが学習に利用する訓練データ
# x_test, y_testが検証に利用するテストデータ

# %% [markdown]
# #### train_test_split関数の結果を確認

# %%
print(x_train.shape) # x_trainの行数と列数を表示
print(x_test.shape) # x_testの行数と列数を表示

# %% [markdown]
# ### 正解率の計算

# %%
# 訓練データで再学習
model.fit(x_train, y_train)

# テストデータの予測結果と実際の答えが合致する正解率を計算
model.score(x_test, y_test)

# %% [markdown]
# ### モデルの保存

# %% [markdown]
# #### モデルを保存する

# %%
import pickle # pickleモジュールのインポート

file = folder + '/model/irismodel.pkl'
with open(file, 'wb') as f:
    pickle.dump(model, f)

# %% [markdown]
# ## 決定木の図の作成

# %% [markdown]
# ### 決定木の深さ

# %% [markdown]
# #### 分岐条件の列を決める

# %%
model.tree_.feature


# %% [markdown]
# ### 分岐条件のしきい値

# %% [markdown]
# #### 分岐条件のしきい値を含む配列を返すtree_.threshold

# %%
model.tree_.threshold

# %% [markdown]
# ### 末端ノードと種類の紐付け

# %% [markdown]
# #### リーフに到達したデータの数を返すtree_.value

# %%
# ノード番号1,3,4に到達したアヤメの種類ごとの数
print(model.tree_.value[1]) # ノード番号1に到達したとき
print(model.tree_.value[3]) # ノード番号3に到達したとき
print(model.tree_.value[4]) # ノード番号4に到達したとき

# %% [markdown]
# #### classes_でアヤメの種類とグループ番号の対応を調べる

# %%
# アヤメの種類とグループ番号の対応
model.classes_

# %% [markdown]
# #### plot_tree関数で簡単に決定木を描画する

# %%
# 描画関数の仕様上、和名の特徴量を英字に直す
x_train.columns = ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth']

# 描画関数の利用
from sklearn.tree import plot_tree

# plot_tree関数で決定木を描画
plot_tree(model, feature_names=x_train.columns, filled=True)
