# %% [markdown]
# # 統計的推定
# %%
# %
import numpy as np
import pandas as pd
from scipy import stats
import seaborn as sns
from matplotlib import pyplot as plt
import unittest
import doctest
from matplotlib import rcParams
import os
import warnings
warnings.simplefilter('ignore', FutureWarning)
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 統計的推測の考え方

# %% [markdown]
# ### サンプリング

# %% [markdown]
# ### 単純ランダムサンプリング

# %% [markdown]
# ### 湖と釣りの例

# %% [markdown]
# ### 標本と確率変数

# %% [markdown]
# ### 標本が得られるプロセスとしての母集団分析

# %% [markdown]
# ### 母集団分からの標本抽出の言い換え

# %% [markdown]
# ### モデルの利用

# %% [markdown]
# ### 壺のモデル

# %% [markdown]
# ### 標本が得られるプロセスの抽象化としてのモデル

# %% [markdown]
# ### 母集団分布と母集団の相対度数分布

# %% [markdown]
# ### もう少し現実的な、湖と釣りの例

# %% [markdown]
# ### 仮定を置くということ

# %% [markdown]
# ### 母集団分布に正規分布を仮定する

# %% [markdown]
# ### 確率分布のパラメータ（母数）

# %% [markdown]
# ### パラメトリックなモデル・ノンパラメトリックなモデル

# %% [markdown]
# ### 統計的推定

# %% [markdown]
# ### 母集団分布に正規分布を仮定した場合の手続き

# %% [markdown]
# ### まとめ：統計的推測の考え方

# %% [markdown]
# ### 次章からの開設の流れ

# %% [markdown]
# ### 仮定を置くｎということの是非

# %% [markdown]
# ## 母集団からの標本平均シミュレーション

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### データが得られるプロセス

# %% [markdown]
# ### 5尾の魚しかいない湖からの標本抽出
# %%
fish_5 = np.array([2, 3, 4, 5, 6])
fish_5

# 乱数の種
np.random.seed(1)

# 標本抽出
sample_1 = np.random.choice(fish_5, size=3, replace=False)
sample_1
round(np.mean(sample_1), 3)

# %% [markdown]
# ### もっとたくさんの魚がいる湖からの標本抽出

# %% [markdown]
# #### データの読み込み
# %%
fish_100000 = pd.read_csv(
    path + '/data/5-2-1-fish_length_100000.csv')['length']
# 先頭行の取得
fish_100000.head(3)

# %% [markdown]
# #### 標本抽出
# %%
# 乱数の種
np.random.seed(2)
# 標本抽出
sample_2 = np.random.choice(fish_100000, size=500, replace=False)
round(np.mean(sample_2), 3)
sns.histplot(sample_2, bins=10, color='black')

# %% [markdown]
# ### 母集団分布の可視化
# %%
print('平均    :', round(np.mean(fish_100000), 3))
print('分散    :', round(np.var(fish_100000), 3))
print('標準偏差:', round(np.std(fish_100000), 3))

sns.histplot(fish_100000, color='gray')

# %% [markdown]
# ### 母集団分布と正規分布の確率密度関数
# %%
# 確率変数
x = np.arange(start=1, stop=8.1, step=0.1)
# 確率密度
density = stats.norm.pdf(x=x, loc=4, scale=0.8)

# データフレームにまとめる
density_df = pd.DataFrame({'x': x, 'density': density})

# 先頭行の取得
print(density_df.head(3))

# 母集団のヒストグラム
sns.histplot(fish_100000, stat='density', color='gray')
# 折れ線グラフ（正規分布の確率密度関数）
sns.lineplot(x=x, y=density, data=density_df, color='black', linewidth=2.0)

# %% [markdown]
# ### データが得られるプロセスの抽象化
# %%
# 乱数の種
np.random.seed(1)
# 正規分布に従う乱数の生成
sample_norm = stats.norm.rvs(loc=4, scale=0.8, size=10)
sample_norm
round(np.mean(sample_norm), 3)

# %% [markdown]
# ### 議論の補足

# %% [markdown]
# ### 母集団分布を正規分布とみなして良いのか

# %% [markdown]
# ## 母分散の推定

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 母分散の用意

# %% [markdown]
# ### 母分散の推定量としての標本分散・不偏分散

# %% [markdown]
# ### 標本分散と不偏分散を計算する

# %% [markdown]
# ### 標本分散の平均値

# %% [markdown]
# ### 不偏分散の平均値

# %% [markdown]
# ### 母分散の不偏推定量としての不偏分散

# %% [markdown]
# ### サンプルサイズを大きくしたときの不偏分散

# %% [markdown]
# ## 正規母集団から派生した確率分布

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 標本分布

# %% [markdown]
# ### 正規分布の活用

# %% [markdown]
# ### χ２分布

# %% [markdown]
# ### シミュレーションの準備

# %% [markdown]
# ### χ２分布

# %% [markdown]
# ### 標本平均が従う確率分布

# %% [markdown]
# ### 標本平均の標準化

# %% [markdown]
# ### t分布

# %% [markdown]
# ### t分布

# %% [markdown]
# ### F分布

# %% [markdown]
# ### F分布

# %% [markdown]
# ## 区間推定

# %% [markdown]
# ### 分析の準備

# %% [markdown]
# ### 点推定・区間推定

# %% [markdown]
# ### 点推定

# %% [markdown]
# ### 信頼係数・信頼区間

# %% [markdown]
# ### 信頼限界

# %% [markdown]
# ### 母平均の区間推定

# %% [markdown]
# ### 母分散の区間推定

# %% [markdown]
# ### 信頼区間の幅を決める要素

# %% [markdown]
# ### 区間推定の結果の解釈

# %% [markdown]
# ### 母分散の区間推定

# %% [markdown]
# ### 母平均の区間推定