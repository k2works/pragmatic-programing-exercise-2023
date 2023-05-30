 # さまざまな教師あり学習：分類


```python
import unittest
import doctest
import os
path = os.path.dirname(os.path.abspath(__file__))
```

 ## ロジスティック回帰

 ### ロジスティック回帰の概要

 #### コード 12-1 分類木の予測結果を確率として出力する


```python
import pandas as pd
from sklearn import tree
df = pd.read_csv(path + '/data/KvsT.csv')
x = df.loc[:, '体重':'年代']
t = df['派閥']
model = tree.DecisionTreeClassifier(max_depth=1, random_state=0)
model.fit(x, t)

data = [[65, 20]] # 予測用未知データ
print(model.predict(data)) # 予測派閥
model.predict_proba(data) # 派閥の確率
```

    ['きのこ']
    

    c:\Users\kakim\Projects\github\k2works\programing_introduce_2023\.venv\lib\site-packages\sklearn\base.py:439: UserWarning: X does not have valid feature names, but DecisionTreeClassifier was fitted with feature names
      warnings.warn(
    c:\Users\kakim\Projects\github\k2works\programing_introduce_2023\.venv\lib\site-packages\sklearn\base.py:439: UserWarning: X does not have valid feature names, but DecisionTreeClassifier was fitted with feature names
      warnings.warn(
    




    array([[0.6, 0.4]])



 ### ロジスティック回帰の実装

 #### コード 12-2 データの読み込み


```python
import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv(path + '/data/iris.csv')
df.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>がく片長さ</th>
      <th>がく片幅</th>
      <th>花弁長さ</th>
      <th>花弁幅</th>
      <th>種類</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.22</td>
      <td>0.63</td>
      <td>0.08</td>
      <td>0.04</td>
      <td>Iris-setosa</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.17</td>
      <td>0.42</td>
      <td>0.35</td>
      <td>0.04</td>
      <td>Iris-setosa</td>
    </tr>
  </tbody>
</table>
</div>



 #### コード 12-3 欠損値を穴埋めする


```python
df_mean = df.mean()
trains2 = df.fillna(df_mean)

# 特徴量と正解データに分割
x = trains2.loc[:, :'花弁幅']
t = trains2['種類']

# 特徴量の標準化
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
new = sc.fit_transform(x)
```

 #### コード 12-4 訓練データと検証用データに分割する


```python
# 訓練データと検証用データに分割
x_train, x_val, y_train, y_val = train_test_split(new, t, test_size=0.2, random_state=0)
```

 #### コード 12-5 ロジスティック回帰による学習


```python
from sklearn.linear_model import LogisticRegression

model = LogisticRegression(random_state=0,C=0.1,multi_class='auto',solver='lbfgs')
```

 #### コード 12-6 正解率を確認する


```python
model.fit(x_train, y_train)
print(model.score(x_train, y_train))
model.score(x_val, y_val)
```

    0.8666666666666667
    




    0.8333333333333334



 #### コード 12-7 係数を確認する


```python
model.coef_ # 係数の確認
```




    array([[-0.53209541,  0.48584036, -0.52629135, -0.83192326],
           [ 0.09494378, -0.44720771, -0.00110969, -0.04413366],
           [ 0.43715163, -0.03863265,  0.52740105,  0.87605692]])



 #### コード 12-8 新規データで予測する


```python
x_new = [[1,2,3,4]] # 新規データ

model.predict(x_new) # 新規データで予測
```




    array(['Iris-virginica'], dtype=object)



 #### コード 12-9 確率の予測結果を確認する


```python
model.predict_proba(x_new)
```




    array([[4.03394997e-05, 3.02965489e-03, 9.96930006e-01]])



 ## ランダムフォレスト

 ### ランダムフォレストの概要

 ### ランダムフォレストの実装

 #### コード 12-10 pandasのモジュールを読み込む


```python
import pandas as pd
from sklearn.model_selection import train_test_split
#%matplotlib inline
```

 #### コード 12-11 Survived.csvを読み込む


```python
df = pd.read_csv(path + '/data/Survived.csv') # csvファイルの読み込み
# 確認する
df.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>PassengerId</th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
  </tbody>
</table>
</div>



 #### コード 12-12 欠損値を穴埋めする


```python
jo1 = df['Pclass'] == 1
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 43

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 35

jo1 = df['Pclass'] == 2
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 26

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 20

jo1 = df['Pclass'] == 3
jo2 = df['Survived'] == 0
jo3 = df['Age'].isnull()
df.loc[jo1 & jo2 & jo3, 'Age'] = 43

jo2 = df['Survived'] == 1
df.loc[jo1 & jo2 & jo3, 'Age'] = 35
```

 #### コード 12-13 文字データの列を数値に変換する


```python
# 特徴量として利用する列のリスト
col = ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']

x = df[col]
t = df['Survived']

# Sex列は文字の列なのでダミー変数化
dummy = pd.get_dummies(df['Sex'], drop_first=True)
x = pd.concat([x, dummy], axis=1)
x.head(2)
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>male</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>1</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>



 #### コード 12-14 ランダムフォレスト


```python
# ランダムフォレストのインポート
from sklearn.ensemble import RandomForestClassifier
x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)
model = RandomForestClassifier(n_estimators=200,random_state=0)
```

 #### コード 12-15 モデルの学習


```python
model.fit(x_train, y_train)

print(model.score(x_train, y_train))
print(model.score(x_test, y_test))
```

    0.9887640449438202
    0.8715083798882681
    

 #### コード 12-16 単純な決定木分類と比較する


```python
from sklearn import tree
model2 = tree.DecisionTreeClassifier(max_depth=3, random_state=0)
model2.fit(x_train, y_train)

print(model2.score(x_train, y_train))
print(model2.score(x_test, y_test))
```

    0.8426966292134831
    0.8212290502793296
    

 #### コード 12-17 特徴量の重要度を確認する


```python
importance = model.feature_importances_ # 特徴量重要度
# 列と対応が分かりやすいようにシリーズ変換
pd.Series(importance, index=x.columns)
```




    Pclass    0.079546
    Age       0.323012
    SibSp     0.045682
    Parch     0.032854
    Fare      0.265573
    male      0.253334
    dtype: float64



 ## アダブースト

 ### バギングとブースティング

 ### アダブーストの概要

 ### アダブーストの実装

 #### コード 12-18 アダブーストを実装する


```python
# アダブーストのインポート
from sklearn.ensemble import AdaBoostClassifier
# ベースとなるモデル
from sklearn.tree import DecisionTreeClassifier

x_train, x_test, y_train, y_test = train_test_split(x, t, test_size=0.2, random_state=0)
# 最大の深さ5の決定木を何個も作っていく
base_model = DecisionTreeClassifier(max_depth=5, random_state=0)

# 決定木を500個作っていく
model = AdaBoostClassifier(base_estimator=base_model, n_estimators=500, random_state=0)
model.fit(x_train, y_train) # 学習

print(model.score(x_train, y_train)) # 訓練データの正解率
print(model.score(x_test, y_test)) # テストデータの正解率
```

    c:\Users\kakim\Projects\github\k2works\programing_introduce_2023\.venv\lib\site-packages\sklearn\ensemble\_base.py:166: FutureWarning: `base_estimator` was renamed to `estimator` in version 1.2 and will be removed in 1.4.
      warnings.warn(
    

    0.9887640449438202
    0.8379888268156425
    

 ### ランダムフォレストやアダブーストで回帰

 #### コード 12-19 ランダムフォレストで回帰モデルを作る


```python
df = pd.read_csv(path + '/data/cinema.csv')
df = df.fillna(df.mean())
x = df.loc[:, 'SNS1':'original']
t = df['sales']
x_train, x_test, y_train, y_test = train_test_split(x, t,
 test_size = 0.2, random_state = 0)

# ランダムフォレスト回帰
from sklearn.ensemble import RandomForestRegressor
# 100個のモデルで並列学習
model = RandomForestRegressor(random_state = 0,
n_estimators = 100)
model.fit(x_train, y_train)
model.score(x_test, y_test) # 決定係数
```




    0.5563347234627347



 #### コード 12-20 アダブーストで回帰モデルを作る


```python
# アダブースト回帰
from sklearn.ensemble import AdaBoostRegressor
# ベースモデルとしての回帰木
from sklearn.tree import DecisionTreeRegressor
base = DecisionTreeRegressor(max_depth = 3, random_state = 0)

# 100個のモデルで並列学習
model = AdaBoostRegressor(random_state=0, n_estimators=100, base_estimator=base)
model.fit(x_train, y_train)
model.score(x_test, y_test) # 決定係数
```

    c:\Users\kakim\Projects\github\k2works\programing_introduce_2023\.venv\lib\site-packages\sklearn\ensemble\_base.py:166: FutureWarning: `base_estimator` was renamed to `estimator` in version 1.2 and will be removed in 1.4.
      warnings.warn(
    




    0.6748482902800903




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
    




    <unittest.main.TestProgram at 0x249f7856850>


