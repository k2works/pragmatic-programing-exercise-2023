# %% [markdown]
# # Pandas虎の巻

# %% [markdown]
# ## シリーズの基本操作

# %% [markdown]
# ### シリーズの作成

# %%
import pandas as pd
pythonScore = pd.Series([90,70,70,80], index=['工藤','浅木','松田','瀬川'])

pythonScore # シリーズの表示

# %% [markdown]
# ### インデックスの参照

# %%
pythonScore.index

# %% [markdown]
# ### インデックスによるデータ参照

# %%
pythonScore['工藤'] # インデックスが'工藤'のデータを取得

# %% [markdown]
# ### 重複の排除結果を参照

# %%
pythonScore.unique()

# %% [markdown]
# ### データの個数を集計

# %%
pythonScore.value_counts()

# %% [markdown]
# ### データを並べ替える

# %%
pythonScore.sort_values(ascending=False)

# %% [markdown]
# ### 各要素に関数を適用する

# %%
def fixedscore(score):
    return 0.8*score + 20 # 試験の素点を0.8倍し、20点足す

pythonScore.map(fixedscore)

# %% [markdown]
# ### 各要素との演算

# %%
pythonScore >= 80 # 80点以上が合格

# %%
pythonScore + 5 # 全員に5点おまけ

# %% [markdown]
# ### 条件式による検索

# %%
pythonScore[pythonScore >= 80]

# %% [markdown]
# ## データフレームの基本操作

# %% [markdown]
# ### データフレームの作成

# %%
import pandas as pd
score = {'工藤':[90,70], '浅木':[70,80], '松田':[70,80], '瀬川':[85,70]}

df = pd.DataFrame(score, index=['Python','ML'])
df

# %% [markdown]
# ### カラム名（列名）一覧の取得

# %%
df.columns

# %% [markdown]
# ### インデックスの取得

# %%
df.index

# %% [markdown]
# ### 行数と列数の取得

# %%
df.shape

# %% [markdown]
# ### 先頭行数だけ取得する

# %%
df.head(1) # 先頭1行だけ

# %% [markdown]
# ### 末尾行数だけ表示

# %%
df.tail(1)

# %% [markdown]
# ### 特定列の取得

# %%
df['浅木']
# %%
df[['浅木','松田']]

# %% [markdown]
# ### インデックスによる特定行の抽出

# %%
df.loc['ML']

# %% [markdown]
# ### 検索条件による特定行の抽出

# %%
df[df['工藤'] < 80] # 工藤列が80未満のデータ

# %%
df[(df['工藤'] < 80) & (df['浅木'] < 70)]

# %% [markdown]
# ### 行と列を同時に指定して抽出

# %%
df.loc[['Python'],['工藤','浅木']]
# %%
df.loc[:,'工藤':'松田']
df

# %% [markdown]
# ### 行と列の追加および更新

# %%
df['福田'] = [75, 75]
df.loc['web_app'] = [65,70,65,85,90]
df

# %% [markdown]
# ### 行と列の削除

# %%
df = df.drop('web_app', axis=0)
df = df.drop('福田', axis=1)
df
# %%
df['福田'] = [75, 75]

# %% [markdown]
# ### CSVファイルの読み込み
# pd.read_csv('ファイル名', encoding='文字コード', sep='区切り文字')

# %% [markdown]
# ### CSVファイルとして保存
# df.to_csv('ファイル名', index=ブール値)

# %% [markdown]
# ## データフレームの応用操作

# %% [markdown]
# ### 代表値の計算

# %%
df.sum() # 列ごとの合計値の計算
# %%
df.mean(axis=1) # 行ごとの平均値

# %% [markdown]
# ### 一括集計

# %%
df.describe()

# %% [markdown]
# ### グループ集計

# %%
data = pd.DataFrame({
    '年齢':[22, 25, 30, 40, 40],
    '性別':[1,0,1,1,1],
    '役職':[0,0,0,1,1]
}, index=['松田','浅木','工藤','瀬川','福田'])

data.groupby('役職').mean() # 役職ごとの集計

# %% [markdown]
# ### ピボットテーブル集計

# %%
pd.pivot_table(data, index='性別', columns='役職', values='年齢', aggfunc=max, margins=True)

# %% [markdown]
# ### ２つのデータフレームの結合
# - 行方向の単純な結合
#
# >> pd.concat([df1, df2], axis=0)
# - 列方向の単純な結合
#
# >> pd.concat([df1, df2], axis=1)
# - 内部結合
# >> df.merge(df2, on='キー列名', how='inner')
# - データフレームの列名が異なるときの内部結合
# left_on='dfの列名', right_on='df2の列名'
# - 左外部結合
# >> df.merge(df2, on='キー列名', how='left')
# - 右外部結合
# >> df.merge(df2, on='キー列名', how='right')

# %% [markdown]
# ### データフレームの欠損値の確認

# %%
import numpy as np
score2 = {
    '工藤':[90,70],
    '浅木':[70,80],
    '松田':[70,80],
    '瀬川':[85,np.nan],
}
df2 = pd.DataFrame(score2, index=['Python','ML'])

df2.isnull() # 欠損値の確認

# %% [markdown]
# ### 欠損値のある行や列の削除

# %%
df2.dropna(axis=0) # 欠損値のある行を削除

# %% [markdown]
# ### 欠損値のあるマスを他の値で穴埋め

# %%
df2.fillna(0)

# %% [markdown]
# ### 線形補完
# データフレーム.interpolate(limit_direction='ooo')

# %% [markdown]
# ### ダミー変数化
# pd.get_dummies(データフレーム, drop_first=True)

# %% [markdown]
# ## データの可視化

# %%
data = {
    'Tokyo':[100,121,131],
    'Osaka':[91,125,150],
}
# データフレームの作成
df3 = pd.DataFrame(data, index=['April','May','June'])

# 棒グラフの作成
df3.plot(kind='bar', title='sales')
# 箱ひげ図
df3.plot(kind='box', title='sales')
# 折れ線グラフ
df3.plot(kind='line', title='sales')
