# %% [markdown]
# # 統計的仮説検定
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
# ## 母平均に関する1標本の検定

# %% [markdown]
# ### 統計的仮説検定の初歩

# %% [markdown]
# #### 母平均に関する1標本のt検定

# %% [markdown]
# #### 帰無仮説・対立仮設

# %% [markdown]
# #### 有意差

# %% [markdown]
# #### t検定の直感的な考え方

# %% [markdown]
# #### 平均値の差が大きいだけでは有意差は得られない

# %% [markdown]
# #### 検定統計量

# %% [markdown]
# #### t値の復習

# %% [markdown]
# #### ここまでのまとめその１

# %% [markdown]
# #### 第一種の過誤・第二種の過誤

# %% [markdown]
# #### 有意水準

# %% [markdown]
# #### 棄却域・受容域

# %% [markdown]
# #### p値

# %% [markdown]
# #### ここまでのまとめその２

# %% [markdown]
# #### t値とt分布の関係の復習

# %% [markdown]
# #### 片側検定・両側検定

# %% [markdown]
# #### 棄却域の計算方法

# %% [markdown]
# #### p値の計算方法

# %% [markdown]
# #### 数式を使ったまとめ

# %% [markdown]
# #### 分析の準備
# %%
junk_food = pd.read_csv(f'{path}/data/6-1-1-junk-food-weight.csv')['weight']
junk_food.head()

# %% [markdown]
# #### t値の計算
# %%
x_bar = np.mean(junk_food)
round(x_bar, 3)

n = len(junk_food)
df = n - 1
df

u = np.std(junk_food, ddof=1)
se = u / np.sqrt(n)
round(se, 3)

t_sample = (x_bar - 50) / se
round(t_sample, 3)

# %% [markdown]
# #### 棄却域の計算
# %%
round(stats.t.ppf(q=0.025, df=df), 3)

# %% [markdown]
# #### p値の計算
# %%
p_value = stats.t.cdf(x=-np.abs(t_sample), df=df) * 2
round(p_value, 3)

stats.ttest_1samp(junk_food, popmean=50)

# %% [markdown]
# #### シミュレーションによるp値の計算
# %%
n = len(junk_food)
u = np.std(junk_food, ddof=1)
t_value_array = np.zeros(50000)

np.random.seed(1)
norm_dist = stats.norm(loc=50, scale=u)
for i in range(0, 50000):
    # 標本の抽出
    sample = norm_dist.rvs(size=n)
    # t値の計算
    sample_mean = np.mean(sample)  # 標本平均
    sample_std = np.std(sample, ddof=1)  # 標本標準偏差
    sample_se = sample_std / np.sqrt(n)  # 標本平均の標準誤差
    t_value_array[i] = (sample_mean - 50) / sample_se  # t値

p_sim = (sum(t_value_array >= t_sample) / 50000) * 2
round(p_sim, 3)
# %% [markdown]
# ### 平均値の差の検定

# %% [markdown]
# #### 2群のデータに対するt検定

# %% [markdown]
# #### 対応のあるt検定

# %% [markdown]
# #### 分析の準備

# %% [markdown]
# #### 対応のあるt検定

# %% [markdown]
# #### 対応のないt検定（不等分散）

# %% [markdown]
# #### 対応のないt検定（等分散）

# %% [markdown]
# #### pハッキング

# %% [markdown]
# ### 分割表の検定

# %% [markdown]
# #### 分割表を用いるメリット

# %% [markdown]
# #### 本章で扱う例題

# %% [markdown]
# #### 期待度数との差を求める

# %% [markdown]
# #### 分析の準備

# %% [markdown]
# #### p値の計算

# %% [markdown]
# #### 分割表の検定

# %% [markdown]
# ### 検定の結果の解釈

# %% [markdown]
# #### p値が0.05以下だったときの結果の書き方

# %% [markdown]
# #### p値が0.05より大きかったときの結果の書き方

# %% [markdown]
# #### 仮説検定における、よくある間違い

# %% [markdown]
# #### p値が小さくても、差が大きいとは限らない

# %% [markdown]
# #### p値が0.05より大きくても差がないとは言えない

# %% [markdown]
# #### 検定の非対称性

# %% [markdown]
# #### 有意水準は、検定をする前に決めておく

# %% [markdown]
# #### 統計的仮説検定は必要か

# %% [markdown]
# #### 仮説は正しいか

# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
