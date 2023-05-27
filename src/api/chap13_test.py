# %% [markdown]
# # さまざまな予測性能評価
# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## 回帰の予測性能評価

# %% [markdown]
# ## 分類の予測性能評価

# %% [markdown]
# ## K分割交差検証

# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
