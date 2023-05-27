# %% [markdown]
# # より実践的な前処理

# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## さまざまなデータの読み込み

# %% [markdown]
# ### 表データの区切り文字

# %% [markdown]
# #### bike.tsvの各列の意味
# |列名|意味|
# |:--|:--|
# |dteday|日付|
# |weekday|曜日（0=日,...6=土）|
# |weather_id|天気|
# |holiday|祝日フラグ（普通の土日は含めない）|
# |workingday|平日フラグ|
# |cnt|利用者数|

# %% [markdown]
# #### コード10-1 bike.tsvを読み込む

# %%
import pandas as pd
df = pd.read_csv(path + '/data/bike.tsv')
df.head(3)

# %% [markdown]
# #### コード10-2 read_csv関数にパラメータ引数を追加する

# %%
df = pd.read_csv(path + '/data/bike.tsv', sep='\t')

df.head(2)

# %% [markdown]
# ### 文字コードの指定

# %% [markdown]
# #### コード10-3 read_csv関数でweather.csvを読み込む

# %%
df2 = pd.read_csv(path + '/data/weather.csv')
df2.head(3)

# %% [markdown]
# #### コード10-4 文字コードを指定する

# %%
weather = pd.read_csv(path + '/data/weather.csv', encoding='shift-jis')
weather

# %% [markdown]
# ### JSONファイルの読み込み

# %% [markdown]
# #### コード10-5 JSONファイルを読み込む

# %%
temp = pd.read_json(path + '/data/temp.json')

temp.head(2)

# %% [markdown]
# #### コード10-6 行と列を反転させる

# %%
temp.T

# %% [markdown]
# #### tempの各列の意味
# |列名|意味|
# |:--|:--|
# |atemp|体感温度|
# |hum|湿度|
# |windspeed|風速|
# |dteday|日付|
# |temp|気温|

# %% [markdown]
# ### 内部結合

# %% [markdown]
# #### コード10-7 内部結合を行う

# %%
df2 = df.merge(weather, how = 'inner', on='weather_id')
df2.head(2)

# %% [markdown]
# #### コード10-8 weatherごとのcntの平均値を集計する

# %%
df2.groupby('weather').mean()['cnt']

# %% [markdown]
# ### 外部結合

# %% [markdown]
# #### コード10-9 tempデータフレームの200行目付近を表示する

# %%
temp = temp.T
temp.loc[199:201]

# %% [markdown]
# #### コード10-10 2011-07-20を表示する

# %%
df2[df2['dteday'] == '2011-07-20']

# %% [markdown]
# #### コード10-11 merge関数で外部結合を行う

# %%
df3 = df2.merge(temp, how='left', on='dteday')

df3[df3['dteday'] == '2011-07-20']


# %% [markdown]
# ## より高度な欠損値の処理

# %% [markdown]
# ### 線形補完

# %% [markdown]
# #### コード10-12 気温に関する折れ線グラフを作成する

# %%
import matplotlib.pyplot as plt
df3['temp'].plot(kind='line')

# %% [markdown]
# #### コード10-13 temp列とhum列を折れ線グラフにして比較する

# %%
df3[['temp','hum']].plot(kind='line')

# %% [markdown]
# #### コード10-14 plotメソッドでヒストグラムを作成する

# %%
df3['temp'].plot(kind='hist')
df3['hum'].plot(kind='hist', alpha=0.5)

# %% [markdown]
# #### コード10-15 欠損値付近の折れ線グラフを作成する

# %%
# インデックス220-240を抜き出して、折れ線グラフで表示
df3['atemp'].loc[220:240].plot(kind='line')

# %% [markdown]
# #### コード10-16 欠損値を線形補完する

# %%
# atemp列の型をfloatに変換
df3['atemp'] = df3['atemp'].astype(float)
df3['atemp'] = df3['atemp'].interpolate()

df3.loc[225:235, 'atemp'].plot(kind='line')

# %% [markdown]
# ### 教師あり学習による補完

# %% [markdown]
# #### コード10-17 がく片長さを予測する重回帰の予測モデルを作成する

# %%
# 「がく片長さ」列に2個の欠損がある
iris_df = pd.read_csv(path + '/data/iris.csv')
non_df = iris_df.dropna() # 欠損値を含む行を削除
from sklearn.linear_model import LinearRegression
x = non_df.loc[:, 'がく片幅':'花弁幅']
t = non_df['がく片長さ']
model = LinearRegression()
model.fit(x, t) # 欠損値予測のためのモデルを予測

# %% [markdown]
# #### コード10-18 欠損データの本来の値を予測させる

# %%
# 欠損値の抜き出し
condition = iris_df['がく片長さ'].isnull()
non_data = iris_df[condition]

# 欠損行の入力に利用する特徴量だけを抜き出して、モデルで予測
x = non_data.loc[:, 'がく片幅':'花弁幅']
pred = model.predict(x)

# 欠損行のがく片長さのマスを抜き出して、predで代入
iris_df.loc[condition, 'がく片長さ'] = pred


# %% [markdown]
# ## より高度な外れ値の処理

# %% [markdown]
# ### マハラノビス距離

# %% [markdown]
# #### コード10-19 自転車データでマハラノビス距離を計算する

# %%
from sklearn.covariance import MinCovDet
# 試しに適当な数値列でマハラノビス距離を計算
df4 = df3.loc[:, 'atemp':'windspeed']
df4 = df4.dropna() # 欠損値を削除
# マハラノビス距離を計算するための準備
mcd = MinCovDet(random_state=0, support_fraction=0.7)
mcd.fit(df4)
# マハラノビス距離
distance = mcd.mahalanobis(df4)
distance

# %% [markdown]
# ### 中央値を用いた外れ値の判定

# %% [markdown]
# #### コード10-20 箱ひげ図で外れ値を見つける

# %%
distance = pd.Series(distance) # シリーズに変換
distance.plot(kind='box') # 箱ひげ図

# %% [markdown]
# #### コード10-21 さまざまな基本統計量を調べる

# %%
tmp = distance.describe() # さまざまな基本統計量を計算
tmp

# %% [markdown]
# #### コード10-22 四分位範囲を用いた外れ値の判定

# %%
iqr = tmp['75%'] - tmp['25%'] # IQR計算
jougen = 1.5 * (iqr) + tmp['75%'] # 上限値
kagen = tmp['25%'] - 1.5 * (iqr) # 下限値

# 上限と下限の条件をもとに、シリーズで条件検索
outlier = distance[(distance > jougen) | (distance < kagen)]
outlier

# %% [markdown]
# #### データフレームの各列のデータ型（dtype）

# %%
se = pd.Series([1,2,3,4])
print(se.dtype) # 型の確認
se2 = se.astype(float)
print(se2.dtype) # 型の確認

# %% [markdown]
# #### グラフの保存

# %%
import matplotlib.pyplot as plt
# df4は10章で利用したデータフレーム
df4.plot(kind='scatter', x='atemp', y='hum')
plt.savefig(path + '/img/test0.png') # pngファイルとして保存

# %% [markdown]
# #### subplotsによる分割

# %%
import matplotlib.pyplot as plt
# 1枚の画像を2行2列に分割、サイズは縦が6,横が10
fig, axes = plt.subplots(2, 2, figsize=(10,6))

# 画像内の0行0列の位置に配置
df4.plot(kind='scatter', x='atemp', y='hum', ax=axes[0,0])
# 画像内の1行1列の位置に配置
df4.plot(kind='scatter', x='atemp', y='windspeed', ax=axes[1,1])
plt.savefig(path + '/img/test1.png') # pngファイルとして保存


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
