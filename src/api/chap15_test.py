# %% [markdown]
# # 教師なし学習2:クラスタリング
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## クラスタリングの概要

# %% [markdown]
# ### クラスタリングとは

# %% [markdown]
# ### k-means法

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### データの読み込み

# %% [markdown]
# #### コード15-1 Wholesale.csvを読み込む

# %%
import pandas as pd
df = pd.read_csv(path + '/data/Wholesale.csv')
df.head()

# %% [markdown]
# ##### 各列の意味
# |列名|意味|
# |:--|:--|
# |Fresh|生鮮食品の販売数|
# |Grocery|食料雑貨品の販売数|
# |Detergents_Paper|洗剤と紙製品の販売数|
# |Channel|顧客の業態（サービス業、小売業)|
# |Milk|乳製品の販売数|
# |Frozen|冷凍食品|
# |Delicassen|惣菜の販売数|
# |Region|地域（リスボン、ポルト、その他）|

# %% [markdown]
# ### 欠損値の確認

# %% [markdown]
# #### コード15-2 欠損値の確認

# %%
df.isnull().sum()

# %% [markdown]
# #### コード15-3 ChannelとRegionを削除

# %%
df = df.drop(['Channel', 'Region'], axis=1)

# %% [markdown]
# ### データの標準化

# %% [markdown]
# #### コード15-4 データを標準化する

# %%
from sklearn.preprocessing import StandardScaler

sc = StandardScaler()
sc_df = sc.fit_transform(df)
sc_df = pd.DataFrame(sc_df, columns=df.columns)

# %% [markdown]
# ## クラスタリングの実行

# %% [markdown]
# ### モジュールのインポート

# %% [markdown]
# #### コード15-5 モジュールのインポート

# %%
from sklearn.cluster import KMeans

# %% [markdown]
# ### モデルの作成

# %% [markdown]
# #### コード15-6 モデルを作成

# %%
model = KMeans(n_clusters=3, random_state=0)

# %% [markdown]
# #### コード15-7 モデルに学習させる

# %%
model.fit(sc_df)

# %% [markdown]
# #### コード15-8 クラスタリングの結果を確認

# %%
model.labels_

# %% [markdown]
# #### コード15-9 クラスタリングの結果を追加

# %%
df['cluster'] = model.labels_
df.head(2)

# %% [markdown]
# ## 結果の評価

# %% [markdown]
# ### クラスタの特徴考察

# %% [markdown]
# #### コード15-10 groupbyメソッドでクラスタごとに集計する

# %%
df.groupby('cluster').mean()

# %% [markdown]
# #### コード15-11 棒グラフで表示する

# %%
#%matplotlib inline
cluster_mean = df.groupby('cluster').mean()
cluster_mean.plot(kind='bar')

# %% [markdown]
# ### クラスタ数の決定 ～ エルボー法

# %% [markdown]
# #### コード15-12 クラスタ数2～30でSSEを調べる

# %%
sse_list = []
# クラスタ数2～30でSSEを調べる
for i in range(2, 31):
    model = KMeans(n_clusters=i, random_state=0)
    model.fit(sc_df)
    sse = model.inertia_
    sse_list.append(sse)
sse_list

# %% [markdown]
# #### コード15-13 折れ線グラフを描画する

# %%
se = pd.Series(sse_list)
num = range(2, 31) # range関数で2～30まの整数列を作る
se.index = num # シリーズのインデックスを変更
se.plot(kind='line')

# %% [markdown]
# #### コード15-14 結果をCSVファイルに書き出す

# %%
model = KMeans(n_clusters=5, random_state=0)
model.fit(sc_df)
df['cluster'] = model.labels_
sc_df.to_csv(path + '/data/clusterd_Wholesale.csv', index=False)

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
