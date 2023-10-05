# %% [markdown]
# # 統計モデルの基礎
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
# ## 統計モデル

# %% [markdown]
# ## 線形モデルの作り方

# %% [markdown]
# ## データの表現とモデルの名称

# %% [markdown]
# ## パラメータ推定：尤度の最大化

# %% [markdown]
# ## パラメータ推定；損失の最大化

# %% [markdown]
# ## 予測精度の評価と変数選択

# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
