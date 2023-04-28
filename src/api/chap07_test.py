
# %% [markdown]
# # 文字列検索
# %%
from typing import Any, MutableSequence, Sequence
import unittest
import doctest


# %% [markdown]
# ## 力まかせ法
# %%

class TestBf(unittest.TestCase):
    def test_bf_match(self):
        self.assertEqual(bf_match("ABC", "ABC"), 0)
        self.assertEqual(bf_match("ABC", "ABD"), -1)
        self.assertEqual(bf_match("ABC", "ABABC"), -1)


def bf_match(txt: str, pat: str) -> int:
    """力まかせ法による文字列探索"""
    pt = 0        # txtをなぞるカーソル
    pp = 0        # patをなぞるカーソル

    while pt != len(txt) and pp != len(pat):
        if txt[pt] == pat[pp]:
            pt += 1
            pp += 1
        else:
            pt = pt - pp + 1
            pp = 0

    return pp - pp if pp == len(pat) else -1

# %% [markdown]
# ## KMP法
# %%

# %% [markdown]
# ## Boyer-Moore法
# %%


unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
# %%
