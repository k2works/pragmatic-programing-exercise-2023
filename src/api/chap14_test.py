# %% [markdown]
# # 教師なし学習1:次元の削除
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 次元削除の概要

# %% [markdown]
# ### 次元削減とは

# %% [markdown]
# ### 主成分分析とは

# %% [markdown]


# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### データの読み込み

# %% [markdown]
# #### コード14-1 Boston.csvを読み込み先頭２行を表示

# %%
import pandas as pd
df = pd.read_csv(path + '/data/Boston.csv') # csvファイルの読み込み
df.head(2) # 先頭２行の表示

# %% [markdown]
# ### 欠損値の確認

# %% [markdown]
# #### コード14-2 平均値で欠損値を穴埋めする

# %%
df2 = df.fillna(df.mean()) # 列ごとの平均値で欠損値の穴埋め

# %% [markdown]
# ### ダミー変数化

# %% [markdown]
# #### コード14-3 CRIME列のダミー変数化

# %%
dummy = pd.get_dummies(df2['CRIME'], drop_first=True)
df3 = df2.join(dummy) # df2とdummyを列方向に結合
df3 = df3.drop('CRIME', axis=1) # CRIME列を削除

df3.head(2)

# %% [markdown]
# ### データの標準化

# %% [markdown]
# #### コード14-4 データの標準化

# %%
from sklearn.preprocessing import StandardScaler

# 中身が整数だと、fit_transformで警告になるので、float型に変換（省略可能）
df4 = df3.astype(float)

# 標準化
sc = StandardScaler()
sc_df = sc.fit_transform(df4)

# %% [markdown]
# ## 主成分分析の実施

# %% [markdown]
# ### モジュールのインポート

# %% [markdown]
# #### コード14-5 モジュールのインポート

# %%
from sklearn.decomposition import PCA

# %% [markdown]
# ### モデルの作成

# %% [markdown]
# #### コード14-6 モデルの作成

# %%
model = PCA(n_components=2, whiten=True) # モデル作成

# %% [markdown]
# #### コード14-7 モデルに学習をさせる

# %%
# モデルに学習させる
model.fit(sc_df)

# %% [markdown]
# #### コード14-8 第１軸と第２軸の固有ベクトル

# %%
# 新規の第１軸（第１主成分とも呼ぶ）の固有ベクトル
print(model.components_[0])
print('-----')
# 新規の第２軸（第２主成分とも呼ぶ）の固有ベクトル
print(model.components_[1])

# %% [markdown]
# #### コード14-9 既存のsc_dfを新しい２つの軸に当てはめる

# %%
new = model.transform(sc_df)

new_df = pd.DataFrame(new)
new_df.head(3)


# %% [markdown]
# ## 結果の評価

# %% [markdown]
# ### 主成分負荷量の確認

# %% [markdown]
# #### コード14-10 新しい２列ともとの列を結合

# %%
new_df.columns = ['PC1', 'PC2']
# 標準化済みの既存データ(numpy)をデータフレーム化
df5 = pd.DataFrame(sc_df, columns=df4.columns)
# 2つのデータフレームを列方向に結合
df6 = pd.concat([new_df, df5], axis=1)

# %% [markdown]
# #### コード14-11 主成分負荷量の計算

# %%
df_corr = df6.corr() # 相関係数の計算
df_corr.loc[:'very_low','PC1':]

# %% [markdown]
# #### コード14-12 相関係数を大きい順に並べ替える

# %%
# わかりやすいように変数に代入
pc_corr = df_corr.loc[:'very_low','PC1':]

pc_corr['PC1'].sort_values(ascending=False)

# %% [markdown]
# #### コード14-13 第2列の相関を確認

# %%
pc_corr['PC2'].sort_values(ascending=False)

# %% [markdown]
# #### コード14-14 新しい列の散布図

# %%
col = ['City','Exclusive residential']

new_df.columns = col # 列名の変更

new_df.plot(kind='scatter', x='City', y='Exclusive residential') # 散布図

# %% [markdown]
# ### 最適な列の個数　-寄与率-

# %% [markdown]
# #### コード14-15 新規の軸をすべて用意する

# %%
model = PCA(whiten=True)

# 学習と新機軸へのデータの当てはめを一括で行う
tmp = model.fit_transform(sc_df)
tmp.shape

# %% [markdown]
# #### コード14-16 寄与率を表示する

# %%
model.explained_variance_ratio_ # 寄与率

# %% [markdown]
# #### コード14-17 累積寄与率

# %%
ratio = model.explained_variance_ratio_ # 寄与率のデータ集合

array = [] # 第N列までの累積寄与率を格納するリスト

for i in range(len(ratio)):
    # 寄与率の計算
    ruiseki = sum(ratio[:i+1])

    array.append(ruiseki) # 累積寄与率の格納

# 第N列の累積寄与率を折れ線グラフ化
pd.DataFrame(array).plot(kind='line', legend=False)

# %% [markdown]
# #### コード14-18 情報量のしきい値を設定して必要な列の数を求める

# %%
thred = 0.8 # 累積寄与率のしきい値
for i in range(len(array)):
    # 第(i + 1)列の累積寄与率がthredより大きいかチェック
    if array[i] >= thred:
        print(i+1)
        break

# %% [markdown]
# #### コード14-19 新規の列を6つに設定してモデルに学習させる

# %%
# もとデータの全情報の80%を賄うために、新規の列を6つに設定
model = PCA(n_components=6, whiten=True)

model.fit(sc_df) # 学習

# 元データを新規の列（6列）に当てはめる
new = model.transform(sc_df)

# %% [markdown]
# #### コード14-20 6列のデータをCSVファイルに保存

# %%
# 主成分分析の結果をデータフレームに変換
col = ['PC1','PC2','PC3','PC4','PC5','PC6']
new_df2 = pd.DataFrame(new, columns=col)

# データフレームをcsvファイルとして保存
new_df2.to_csv(path + '/data/boston_pca.csv', index=False)

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
