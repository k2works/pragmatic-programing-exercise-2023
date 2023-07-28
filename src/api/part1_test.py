# %% [markdown]
# # 記述統計
# %%
import seaborn as sns
from matplotlib import pyplot as plt
import unittest
import doctest

# %% [markdown]
# ## データの分離

# %% [markdown]
# ### 数量データ・カテゴリーデータ

# %% [markdown]
# ### 離散型のデータ・連続型のデータ

# %% [markdown]
# ### 2個データ・多値データ

# %%  [markdown]
# ### 名義尺度・順序尺度・間隔尺度・比例尺度

# %%  [markdown]
# ### 1変量データ・多変量データ

# %%  [markdown]
# ### 時系列データ・クロスセクションデータ

# %% [markdown]
# ## 数式の読み方

# %% [markdown]
# ### 表現の技法としての数式

# %% [markdown]
# ### 標本を数式で表記する
# $$
# {x_i}^{n}_{i=1} = { x_1, x_2, \ldots, x_n }
# $$

# %% [markdown]
# ### なぜ数式で表記するのか

# %% [markdown]
# ### 足し算とΣ記号

# %% [markdown]
# ### 標本平均を数式で表記する
# $$
# \bar{x} = \frac{1}{n} \sum_{i=1}^{n} x_i
# $$

# %% [markdown]
# ### 掛け算とΠ記号

# %% [markdown]
# ## 度数分布

# %% [markdown]
# ### さまざまな集計の方法を学ぶのか

# %% [markdown]
# ### 度数・度数分布

# %% [markdown]
# ### 階級・階級値

# %% [markdown]
# ### 分析の準備
# %%
import numpy as np
import pandas as pd
path = os.path.dirname(os.path.abspath(__file__))


# %% [markdown]
# ### 度数分布

# %% [markdown]
# #### カテゴリーデータの度数分布
# %%
category_data = pd.read_csv(path + '/data/3-3-1-fish-species.csv')
print(category_data)
category_data.species.value_counts()

# %% [markdown]
# #### 数量データの度数分布
# %%
numeric_data = pd.read_csv(path + '/data/3-3-2-fish-length.csv')
print(numeric_data)

numeric_data.length.value_counts(bins=3)

np.arange(0, 6, 1)
freq = numeric_data.length.value_counts(
    bins=np.arange(0, 6, 1), sort=False)
freq

# %% [markdown]
# #### numpyの関数を使う
# %%
np.histogram(numeric_data.length, bins=3)
np.histogram(numeric_data.length, bins=np.arange(0, 6, 1))

# %% [markdown]
# ### 相対度数分布・累積度数分布

# %% [markdown]
# ### 相対度数分布・累積度数分布
# %%
rel_freq = freq / sum(freq)
rel_freq

numeric_data.length.value_counts(
    bins=np.arange(0, 6, 1), sort=False, normalize=True)

np.histogram(numeric_data.length, bins=np.arange(0, 6, 1), density=True)

# %% [markdown]
# #### 累積度数分布
# %%
freq.cumsum()

freq_np = np.histogram(numeric_data.length, bins=np.arange(0, 6, 1))[0]
np.cumsum(freq_np)

# %% [markdown]
# #### 累積早退度数分布
# %%
rel_freq.cumsum()

# %% [markdown]
# ### ヒストグラム

# %% [markdown]
# #### グラフ描画とmatplotlib-seaborn
# %%
# グラフを描画するライブラリ
sns.set()

# %% [markdown]
# #### ヒストグラム
# %%
sns.histplot(x='length', data=numeric_data,
             color='gray', bins=np.arange(0, 6, 1))

sns.histplot(x='length', data=numeric_data,
             color='gray', bins=np.arange(0, 6, 1), stat='density')

# %% [markdown]
# ### 階級の幅が異なるヒストグラム
# %%
np.histogram(numeric_data.length, bins=[0, 1, 2, 5], density=True)
sns.histplot(x='length', data=numeric_data,
             color='gray', bins=[0, 1, 2, 5], stat='density')

# %% [markdown]
# ### カーネル密度推定

# %% [markdown]
# ### カーネル密度推定

# %% [markdown]
# #### 基本的な実装
# %%
sns.kdeplot(data=numeric_data.length, fill=True, color='gray')

# %% [markdown]
# #### バンド幅の変更
# %%
sns.kdeplot(data=numeric_data.length, color='black', label='default')
sns.kdeplot(data=numeric_data.length, bw_adjust=0.4,
            linestyle='dashed', label='bw_adjust=0.2')
sns.kdeplot(data=numeric_data.length, color='black',
            bw_adjust=2, linestyle='dotted', label='bw_adjust=2')
plt.legend()  # 凡例

# %% [markdown]
# ## １変量データの統計量

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 分析の対象となるデータの用意

# %% [markdown]
# ### サンプライズ

# %% [markdown]
# ### 合計値

# %% [markdown]
# ### 標本平均

# %% [markdown]
# ### 標本分散

# %% [markdown]
# ### 不偏分散

# %% [markdown]
# ### 不偏分散

# %% [markdown]
# ### 標準偏差

# %% [markdown]
# ### 標準偏差

# %% [markdown]
# ### 変動係数

# %% [markdown]
# ### 変動係数

# %% [markdown]
# ### 標準化

# %% [markdown]
# ### 標準化

# %% [markdown]
# ### 最小値・最大値・中央値・四分位点

# %% [markdown]
# ### 最小値・最大値・中央値・四分位点

# %% [markdown]
# ### 最小値・最大値

# %% [markdown]
# ### 中央値

# %% [markdown]
# ### 四分位点

# %% [markdown]
# ### 最頻値

# %% [markdown]
# ### pandasのdescribe関数の利用

# %% [markdown]
# ## 多変量データの統計量

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 分析の対象となるデータの用意

# %% [markdown]
# ### 共分散

# %% [markdown]
# ### 分散共分散行列

# %% [markdown]
# ### ピアソンの積率相関係数

# %% [markdown]
# ### 相関行列が役に立たないとき

# %% [markdown]
# ### クロス集計表

# %% [markdown]
# ### クロス集計表

# %% [markdown]
# ## 層別分析

# %% [markdown]
# ### 層別分析

# %% [markdown]
# ### 整然データ

# %% [markdown]
# ### 雑然データ

# %% [markdown]
# ### 雑然データの例

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 分析対象となるデータの用意

# %% [markdown]
# ### グループ別の統計量の計算

# %% [markdown]
# ### ペンギンデータの読み込み

# %% [markdown]
# ### ペンギンデータの層別分析

# %% [markdown]
# ### 欠損値の扱いに注意

# %% [markdown]
# ### 単純なヒストグラム

# %% [markdown]
# ### グループ別のヒストグラム

# %% [markdown]
# ## グラフの活用

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### matplotlib・seaborn

# %% [markdown]
# ### 分析対象となるデータの読み込み

# %% [markdown]
# ### 散布図

# %% [markdown]
# ### グラフの装飾と保存

# %% [markdown]
# ### 折れ線グラフ

# %% [markdown]
# ### 棒グラフ

# %% [markdown]
# ### 箱ひげ図

# %% [markdown]
# ### バイオリンプロット

# %% [markdown]
# ### axis-leve関数とfigure-leve関数

# %% [markdown]
# ### 種類・性別のバイオリンプロット

# %% [markdown]
# ### ペアプロット

# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)

# %%
