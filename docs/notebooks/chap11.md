 # さまざまな教師あり学習：回帰


```python
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))
```

 ## リッジ回帰

 ### リッジ回帰の概要

 ### バイアス・バリアンス分解

 ### バリアンスと過学習

 ### リッジ回帰の利用

 #### コード 11-1 共通する準備作業


```python
# 絶対使うであろうモジュールのインポート
import pandas as pd

from sklearn.model_selection import train_test_split

#%matplotlib inline
from sklearn.preprocessing import StandardScaler
```

 #### コード 11-2 Boston.csvを利用する


```python
df = pd.read_csv(path + '/data/Boston.csv') # csvの読み込み
df = df.fillna(df.mean()) # 欠損値補完
df = df.drop([76], axis=0) # 外れ値の行を削除

t = df[['PRICE']] # 正解データの抜き出し
x = df.loc[:,['RM', 'PTRATIO', 'LSTAT']] # 説明変数の抜き出し

# 標準化
sc = StandardScaler()
sc_x = sc.fit_transform(x)
sc2 = StandardScaler()
sc_t = sc2.fit_transform(t)
```

 #### コード 11-3 累計列と交互作用特徴量を一括追加する


```python
from sklearn.preprocessing import PolynomialFeatures

pf = PolynomialFeatures(degree=2, include_bias=False)
pf_x = pf.fit_transform(sc_x) # 2乗列と交互作用特徴量の追加
pf_x.shape # 行数と列数
```




    (99, 9)



 #### コード 11-4 列名を確認する処理


```python
pf.get_feature_names_out()
```




    array(['x0', 'x1', 'x2', 'x0^2', 'x0 x1', 'x0 x2', 'x1^2', 'x1 x2',
           'x2^2'], dtype=object)



 #### コード 11-5 線形回帰で過学習が起こることを確認


```python
from sklearn.linear_model import LinearRegression

x_train, x_test, y_train, y_test = train_test_split(pf_x, sc_t, test_size=0.3, random_state=0)
model = LinearRegression()
model.fit(x_train, y_train)

print(model.score(x_train, y_train))
model.score(x_test, y_test)
```

    0.8710525685992707
    




    0.7854929935582586




```python
# #### コード 11-6 リッジ回帰で過学習が起こるか確認
```


```python
from sklearn.linear_model import Ridge # モジュールインポート
# モデルの作成
ridgeModel = Ridge(alpha=10)
ridgeModel.fit(x_train, y_train) # 学習
print(ridgeModel.score(x_train, y_train))
print(ridgeModel.score(x_test, y_test))
```

    0.8607320524729508
    0.8458730019328173
    

 #### コード 11-7 正規化項の定数を0.01～20まで0.01刻みで検証するコード


```python
maxScore = 0
maxIndex = 0
# range関数により整数列を1～2000生成
for i in range(1, 2001):
    num = i / 100
    ridgeModel = Ridge(random_state=0,alpha=num)
    ridgeModel.fit(x_train, y_train)

    result = ridgeModel.score(x_test, y_test)
    if result > maxScore:
        maxScore = result
        maxIndex = num

print(maxIndex, maxScore)
```

    17.62 0.8528754801497631
    

 #### コード 11-8 重回帰とリッジ回帰の係数の大きさを比較する


```python
print(sum(abs(model.coef_))[0]) # 線形回帰の係数（絶対値）の合計
print(sum(abs(ridgeModel.coef_))[0]) # リッジ回帰の合計
```

    0.38642230893927604
    0.3304493713376869
    

 ## ラッソ回帰

 ### ラッソ回帰の概要

 #### コード 11-9 ラッソ回帰モデルで過学習が起きていないか確認する


```python
# ライブラリインポート
from sklearn.linear_model import Lasso

x_train, x_test, y_train, y_test = train_test_split(pf_x, sc_t, test_size=0.3, random_state=0)

# ラッソ回帰モデル作成(alphaは正則化項につく定数)
model = Lasso(alpha=0.1)
model.fit(x_train, y_train)

print(model.score(x_train, y_train)) # 訓練データの決定係数
print(model.score(x_test, y_test)) # テストデータの決定係数
```

    0.8224680202036665
    0.858846785318774
    

 #### コード 11-10 回帰式の係数を確認する


```python
weight = model.coef_ # 係数抜き出す
# 見やすいようにシリーズ変換
pd.Series(weight, index=pf.get_feature_names_out())
```




    x0       0.409426
    x1      -0.083104
    x2      -0.287714
    x0^2     0.150001
    x0 x1   -0.000000
    x0 x2   -0.037450
    x1^2    -0.000000
    x1 x2    0.000000
    x2^2     0.000000
    dtype: float64



 ## 回帰木

 ### 回帰木の概要

 #### コード 11-11 ボストンの住宅価格のデータを読み込む


```python
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv(path + '/data/Boston.csv')
df = df.fillna(df.mean())
x = df.loc[:,'ZN':'LSTAT']
t = df['PRICE']

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.3, random_state=0)
```

 #### コード 11-12 回帰木を用いた学習


```python
# ライブラリインポート（回帰木バージョン）
from sklearn.tree import DecisionTreeRegressor

# 木の深さの最大を10と設定
model = DecisionTreeRegressor(max_depth=10, random_state=0)
model.fit(x_train, y_train)
model.score(x_test, y_test) # テストデータでの決定係数
```




    0.59433275545417



 #### コード 11-13 特徴量の重要度を参照する


```python
pd.Series(model.feature_importances_, index=x.columns)
```




    ZN         0.000252
    INDUS      0.007301
    CHAS       0.000000
    NOX        0.001967
    RM         0.759547
    AGE        0.139388
    DIS        0.013635
    RAD        0.000404
    TAX        0.013975
    PTRATIO    0.001913
    B          0.003331
    LSTAT      0.058287
    dtype: float64




```python
doctest.testmod(verbose=True)
unittest.main(argv=[''], verbosity=2, exit=False)
```

    3 items had no tests:
        __main__
        __main__.__VSCODE_compute_hash
        __main__.__VSCODE_wrap_run_cell
    0 tests in 3 items.
    0 passed and 0 failed.
    Test passed.
    

    
    ----------------------------------------------------------------------
    Ran 0 tests in 0.000s
    
    OK
    




    <unittest.main.TestProgram at 0x17a7cfbba60>


