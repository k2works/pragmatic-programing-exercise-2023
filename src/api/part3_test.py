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
