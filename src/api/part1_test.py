# %% [markdown]
# # 記述統計
# %%
# %
import doctest
import unittest
from matplotlib import pyplot as plt
import seaborn as sns
from scipy import stats
import pandas as pd
import numpy as np
path = os.path.dirname(os.path.abspath(__file__))

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
# #### numpyアレイで用意
# %%
fish_length = np.array([2, 3, 3, 4, 4, 4, 4, 5, 5, 6])
fish_length

# %% [markdown]
# #### CSVファイルから読み込む
# %%
fish_length_df = pd.read_csv(path + '/data/3-4-1-fish-length.csv')
print(fish_length_df)

# %% [markdown]
# #### データフレームとアレイの返還
# %%
fish_length_df.length.to_numpy() == fish_length


# %% [markdown]
# ### サンプライズ
# %%
len(fish_length)
len(fish_length_df)

# %% [markdown]
# ### 合計値

# %% [markdown]
# #### 基本的な計算方法
# %%
np.sum(fish_length)

np.sum(fish_length_df)

# %% [markdown]
# #### その他の計算方法
# %%
fish_length.sum()

fish_length_df.sum()

# %% [markdown]
# ### 標本平均
# $$
# \bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
# $$

# %% [markdown]
# #### 計算方法の確認
# %%
n = len(fish_length)
n

sum_vlaue = np.sum(fish_length)
sum_vlaue

x_bar = sum_vlaue / n
x_bar

# %% [markdown]
# #### 関数を使った効率的な実装
# %%
np.mean(fish_length)

# %% [markdown]
# ### 標本分散

# %% [markdown]
# #### 分散の定義
# $$
# \sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2
# $$

# %% [markdown]
# ### 標本分散

# %% [markdown]
# #### 計算方法の確認
# %%
s2 = np.sum((fish_length - x_bar)**2) / n
s2

# %% [markdown]
# #### 実装コードの解読
# %%
fish_length
fish_length - x_bar
(fish_length - x_bar)**2
np.sum((fish_length - x_bar)**2)

# %% [markdown]
# #### 関数を使った効率的な実装
# %%
np.var(fish_length, ddof=0)

# %% [markdown]
# ### 不偏分散
# $$
# \sigma^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2
# $$

# %% [markdown]
# ### 不偏分散

# %% [markdown]
# #### 計算方法の確認
# %%
u2 = np.sum((fish_length - x_bar)**2) / (n - 1)
u2
round(u2, 3)

# %% [markdown]
# #### 関数を使った効率的な実装
# %%
round(np.var(fish_length, ddof=1), 3)

# %% [markdown]
# #### ライブラリの違いに注意
# %%
np.var(fish_length_df)
fish_length_df.var()
fish_length_df.var(ddof=0)

# %% [markdown]
# ### 標準偏差
# $$
# \sigma = \sqrt{\sigma^2}
# = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2}
# $$

# %% [markdown]
# ### 標準偏差

# %% [markdown]
# #### 計算方法の確認
# %%
s = np.sqrt(s2)
round(s, 3)

# %% [markdown]
# #### 関数を使った効率的な実装
# %%
round(np.std(fish_length, ddof=0), 3)

# %% [markdown]
# ### 変動係数
# $$
# CV = \frac{\sigma}{\bar{x}}
# $$

# %% [markdown]
# ### 変動係数

# %% [markdown]
# #### 計算方法の確認
# %%
cv = s / x_bar
round(cv, 3)

# %% [markdown]
# #### 関数を使った効率的な実装
# %%
round(stats.variation(fish_length), 3)
round(stats.variation(fish_length, ddof=1), 3)

# %% [markdown]
# #### 変動係数を使う注意点
# %%
winter = np.array([1, 1, 1, 2, 2, 2])
summar = np.array([29, 29, 29, 30, 30, 30])
print('冬の気温の標準偏差：', np.std(winter, ddof=0))
print('夏の気温の標準偏差：', np.std(summar, ddof=0))

print('冬の気温の変動係数：', stats.variation(winter))
print('夏の気温の変動係数：', stats.variation(summar))

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
