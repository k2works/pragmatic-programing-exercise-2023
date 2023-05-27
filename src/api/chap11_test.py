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
# ## より高度な欠損値の処理

# %% [markdown]
# ## より高度な外れ値の処理


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
