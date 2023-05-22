# %% [markdown]
# # 練習問題:金融機関のキャンペーン分析

# %%
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))

# %% [markdown]
# ## データの内容
# |列名|意味|
# |:--|:--|
# |id|顧客ID|
# |age|年齢|
# |job|職種|
# |education|最終学歴|
# |marital|既婚／未婚／離別など
# |loan|個人ローンの有無|
# |housing|住宅ローンの有無|
# |amount|年間キャンペーン終了時点での、総投資信託購入額|
# |default|債務不履行の有無|
# |previous|キャンペーン前に接触した回数|
# |campaign|現キャンペーン内での接触回数|
# |day|最終接触日|
# |month|最終接触月|
# |duration|接触時のへ平均時間（秒）|
# |y|今回のキャンペーンの結果（1:購入、0:未購入|


# %% [markdown]
# ## 問題背景

# %% [markdown]
# ## データ分析の方法検討

# %% [markdown]
# 分析の実施

# %% [markdown]
# ## データの前処理

# %% [markdown]
# ### 欠損地処理（行削除・全体代表値埋め、グループ代表値埋め）

# %% [markdown]
# ### 各手法を必要に応じて実施

# %% [markdown]
# - 外れ値の除外
# - 多項式特徴量・交互作用特徴量の追加
# - 特徴量の絞り込み
# - 標準化

# %% [markdown]
# ## モデルの作成と学習

# %% [markdown]
# ### 未学習状態モデルの生成（分類なら決定木、回帰なら線形回帰）

# %% [markdown]
# ### 訓練データで学習（必要に応じて不均衡データ補正）

# %% [markdown]
# ## モデルの評価

# %% [markdown]
# ### 検証データで評価し指標確認（分類なら正解率、回帰なら決定係数）

# %% [markdown]
# ### NG:改善案検討前処理に戻る
# ### OK:最終性能評価（テストデータで評価）

# %% [markdown]
# ## 決定木における特徴量の考察


# %%
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
