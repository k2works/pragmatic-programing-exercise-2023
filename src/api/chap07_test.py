# %% [markdown]
# # 文字列検索
# %%
from typing import Any, MutableSequence, Sequence
import unittest
import doctest


# %% [markdown]
# ## 力まかせ法

# %% [markdown]
# ### 文字列探索

# %% [markdown]
# ### 力まかせ法（単純法）

# %% [markdown]
# #### List 7-1 力まかせ法による文字列探索
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

# %% [markdown]
# ### KMP法

# %% [markdown]
# #### List 7-2 KMP法による文字列探索
# %%


class TestKmp(unittest.TestCase):
    def test_kmp_match(self):
        self.assertEqual(kmp_match("ABC", "ABC"), 0)
        self.assertEqual(kmp_match("ABC", "ABD"), -1)
        self.assertEqual(kmp_match("ABC", "ABABC"), -1)


def kmp_match(txt: str, pat: str) -> int:
    """KMP法による文字列探索"""
    pr = 1  # txtをなぞるカーソル
    pt = 0  # patをなぞるカーソル
    skip = [0] * (len(pat) + 1)  # スキップテーブル

    # スキップテーブルの作成
    skip[pr] = 0
    while pr != len(pat):
        if pat[pr] == pat[pt]:
            pr += 1
            pt += 1
            skip[pr] = pt
        elif pt == 0:
            pr += 1
            skip[pr] = pt
        else:
            pt = skip[pt]

    # 探索
    pt = pr = 0
    while pt != len(txt) and pr != len(pat):
        if txt[pt] == pat[pr]:
            pt += 1
            pr += 1
        elif pr == 0:
            pt += 1
        else:
            pr = skip[pr]

    return pt - pr if pr == len(pat) else -1

# %% [markdown]
# ## Boyer-Moore法

# %% [markdown]
# ### Boyer-Moore法

# %% [markdown]
# #### List 7-3 Boyer-Moore法による文字列探索(対象は0-255の文字）
# %%


class TestBm(unittest.TestCase):
    def test_bm_match(self):
        self.assertEqual(bm_match("ABC", "ABC"), 0)
        self.assertEqual(bm_match("ABC", "ABD"), -1)
        self.assertEqual(bm_match("ABC", "ABABC"), -1)


def bm_match(txt: str, pat: str) -> int:
    """Boyer-Moore法による文字列探索"""
    skip = [None] * 256  # スキップテーブル

    # スキップテーブルの作成
    for pt in range(256):
        skip[pt] = len(pat)
    for pt in range(len(pat)):
        skip[ord(pat[pt])] = len(pat) - pt - 1

    # 探索
    while pt < len(txt):
        pp = len(pat) - 1
        while txt[pt] == pat[pp]:
            if pp == 0:
                return pt
            pt -= 1
            pp -= 1
        pt += skip[ord(txt[pt])] if skip[ord(txt[pt])] > len(pat) - pp \
            else len(pat) - pp

    return -1


# %%
unittest.main(argv=[''], verbosity=2, exit=False)
doctest.testmod(verbose=True)
