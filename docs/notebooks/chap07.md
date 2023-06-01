 # 回帰2:客船沈没事故での生存予測


```python
import unittest
import doctest
import os
from domain import CSVRepository, SQLRepository, CategoricalData, DataVisualization, convert_categoricals
import pandas as pd

path = os.path.dirname(os.path.abspath(__file__))
#repo = SQLRepository(table='Survived')
repo = CSVRepository(file= path + '/data/Survived.csv')
```

 ## データの内容
 | 列名 | 内容 |
 | --- | --- |
 | PassengerId | 乗客ID |
 | Pclass | チケットクラス（1等、2等、3等）|
 | Age | 年齢 |
 | Parch | 同乗した、自身の親と子供の総数 |
 | Fare | 運賃 |
 | Embarked | 搭乗港 |
 | Survived | 1:生存,0:死亡 |
 | Sex | 性別 |
 | SibSp | 同乗した兄弟や配偶者の総数 |
 | Ticket | チケットID |
 | Cabin | 部屋番号 |


```python
df = repo.get_data()
df.head(3)
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
    <tr>
      <th>2</th>
      <td>3</td>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



 ## 問題背景
 客船沈没事故で、どのような人が生き残ったかを分析します。このデータを用いて、客船の乗客の特徴量から生存者を予測するモデルを作成します。

 ## データ分析の方法検討
 - 乗客の特徴から沈没時に生存か死亡かに分類するモデルを作成する。また、その過程で、どのような特徴を持つ人が生き残れたかを考察する。
 - 特徴量を「チケットクラス、年齢、同乗した、自身の親と子供の総数、運賃、搭乗港、性別、同乗した兄弟や配偶者の総数、部屋番号」、目的変数を「生存」（1:生存,0:死亡）として、客船の乗客の生存を予測する。

 分析の実施

 ### データの概要


```python
df.info()
```

    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 891 entries, 0 to 890
    Data columns (total 11 columns):
     #   Column       Non-Null Count  Dtype  
    ---  ------       --------------  -----  
     0   PassengerId  891 non-null    int64  
     1   Survived     891 non-null    int64  
     2   Pclass       891 non-null    int64  
     3   Sex          891 non-null    object 
     4   Age          714 non-null    float64
     5   SibSp        891 non-null    int64  
     6   Parch        891 non-null    int64  
     7   Ticket       891 non-null    object 
     8   Fare         891 non-null    float64
     9   Cabin        204 non-null    object 
     10  Embarked     889 non-null    object 
    dtypes: float64(2), int64(5), object(4)
    memory usage: 76.7+ KB
    

 ### データの統計量


```python
df.describe()
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
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>count</th>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>714.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
      <td>891.000000</td>
    </tr>
    <tr>
      <th>mean</th>
      <td>446.000000</td>
      <td>0.383838</td>
      <td>2.308642</td>
      <td>29.699118</td>
      <td>0.523008</td>
      <td>0.381594</td>
      <td>32.204208</td>
    </tr>
    <tr>
      <th>std</th>
      <td>257.353842</td>
      <td>0.486592</td>
      <td>0.836071</td>
      <td>14.526497</td>
      <td>1.102743</td>
      <td>0.806057</td>
      <td>49.693429</td>
    </tr>
    <tr>
      <th>min</th>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>1.000000</td>
      <td>0.420000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>25%</th>
      <td>223.500000</td>
      <td>0.000000</td>
      <td>2.000000</td>
      <td>20.125000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>7.910400</td>
    </tr>
    <tr>
      <th>50%</th>
      <td>446.000000</td>
      <td>0.000000</td>
      <td>3.000000</td>
      <td>28.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>14.454200</td>
    </tr>
    <tr>
      <th>75%</th>
      <td>668.500000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>38.000000</td>
      <td>1.000000</td>
      <td>0.000000</td>
      <td>31.000000</td>
    </tr>
    <tr>
      <th>max</th>
      <td>891.000000</td>
      <td>1.000000</td>
      <td>3.000000</td>
      <td>80.000000</td>
      <td>8.000000</td>
      <td>6.000000</td>
      <td>512.329200</td>
    </tr>
  </tbody>
</table>
</div>



 ### データの特徴量の相関確認


```python
categorical_cols = ['Sex','Ticket','Cabin','Embarked']
df_conv = convert_categoricals(df, categorical_cols)
df_conv.corr()
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
      <th>PassengerId</th>
      <td>1.000000</td>
      <td>-0.005007</td>
      <td>-0.035144</td>
      <td>0.042939</td>
      <td>0.036847</td>
      <td>-0.057527</td>
      <td>-0.001652</td>
      <td>-0.056554</td>
      <td>0.012658</td>
      <td>-0.035077</td>
      <td>0.013083</td>
    </tr>
    <tr>
      <th>Survived</th>
      <td>-0.005007</td>
      <td>1.000000</td>
      <td>-0.338481</td>
      <td>-0.543351</td>
      <td>-0.077221</td>
      <td>-0.035322</td>
      <td>0.081629</td>
      <td>-0.164549</td>
      <td>0.257307</td>
      <td>-0.254888</td>
      <td>-0.163517</td>
    </tr>
    <tr>
      <th>Pclass</th>
      <td>-0.035144</td>
      <td>-0.338481</td>
      <td>1.000000</td>
      <td>0.131900</td>
      <td>-0.369226</td>
      <td>0.083081</td>
      <td>0.018443</td>
      <td>0.319869</td>
      <td>-0.549500</td>
      <td>0.684121</td>
      <td>0.157112</td>
    </tr>
    <tr>
      <th>Sex</th>
      <td>0.042939</td>
      <td>-0.543351</td>
      <td>0.131900</td>
      <td>1.000000</td>
      <td>0.093254</td>
      <td>-0.114631</td>
      <td>-0.245489</td>
      <td>0.059372</td>
      <td>-0.182333</td>
      <td>0.096681</td>
      <td>0.104057</td>
    </tr>
    <tr>
      <th>Age</th>
      <td>0.036847</td>
      <td>-0.077221</td>
      <td>-0.369226</td>
      <td>0.093254</td>
      <td>1.000000</td>
      <td>-0.308247</td>
      <td>-0.189119</td>
      <td>-0.075934</td>
      <td>0.096067</td>
      <td>-0.252331</td>
      <td>-0.025252</td>
    </tr>
    <tr>
      <th>SibSp</th>
      <td>-0.057527</td>
      <td>-0.035322</td>
      <td>0.083081</td>
      <td>-0.114631</td>
      <td>-0.308247</td>
      <td>1.000000</td>
      <td>0.414838</td>
      <td>0.079461</td>
      <td>0.159651</td>
      <td>0.043593</td>
      <td>0.066654</td>
    </tr>
    <tr>
      <th>Parch</th>
      <td>-0.001652</td>
      <td>0.081629</td>
      <td>0.018443</td>
      <td>-0.245489</td>
      <td>-0.189119</td>
      <td>0.414838</td>
      <td>1.000000</td>
      <td>0.020003</td>
      <td>0.216225</td>
      <td>-0.028324</td>
      <td>0.038322</td>
    </tr>
    <tr>
      <th>Ticket</th>
      <td>-0.056554</td>
      <td>-0.164549</td>
      <td>0.319869</td>
      <td>0.059372</td>
      <td>-0.075934</td>
      <td>0.079461</td>
      <td>0.020003</td>
      <td>1.000000</td>
      <td>-0.013885</td>
      <td>0.243696</td>
      <td>-0.006041</td>
    </tr>
    <tr>
      <th>Fare</th>
      <td>0.012658</td>
      <td>0.257307</td>
      <td>-0.549500</td>
      <td>-0.182333</td>
      <td>0.096067</td>
      <td>0.159651</td>
      <td>0.216225</td>
      <td>-0.013885</td>
      <td>1.000000</td>
      <td>-0.503355</td>
      <td>-0.221226</td>
    </tr>
    <tr>
      <th>Cabin</th>
      <td>-0.035077</td>
      <td>-0.254888</td>
      <td>0.684121</td>
      <td>0.096681</td>
      <td>-0.252331</td>
      <td>0.043593</td>
      <td>-0.028324</td>
      <td>0.243696</td>
      <td>-0.503355</td>
      <td>1.000000</td>
      <td>0.193205</td>
    </tr>
    <tr>
      <th>Embarked</th>
      <td>0.013083</td>
      <td>-0.163517</td>
      <td>0.157112</td>
      <td>0.104057</td>
      <td>-0.025252</td>
      <td>0.066654</td>
      <td>0.038322</td>
      <td>-0.006041</td>
      <td>-0.221226</td>
      <td>0.193205</td>
      <td>1.000000</td>
    </tr>
  </tbody>
</table>
</div>



 ### データの数値変数確認


```python
df.select_dtypes(include='number').columns
```




    Index(['PassengerId', 'Survived', 'Pclass', 'Age', 'SibSp', 'Parch', 'Fare'], dtype='object')



 ### データのカテゴリ変数確認


```python
df.select_dtypes(include='object').columns
```




    Index(['Sex', 'Ticket', 'Cabin', 'Embarked'], dtype='object')



 ### 性別カテゴリ


```python
sex = CategoricalData(df, 'Sex')
```


```python
sex.show()
```




    male      577
    female    314
    Name: Sex, dtype: int64




```python
sex.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換
```




    <Axes: >




    
![png](chap07_files/chap07_20_1.png)
    



```python
categorical_cols = ['Sex']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Sex')
conv_species.plot()
```




    <Axes: >




    
![png](chap07_files/chap07_21_1.png)
    


 ### チケットIDカテゴリ


```python
ticket = CategoricalData(df, 'Ticket')
```


```python
ticket.show()
```




    347082      7
    CA. 2343    7
    1601        7
    347088      6
    3101295     6
               ..
    A/5. 851    1
    PC 17599    1
    367228      1
    350050      1
    2647        1
    Name: Ticket, Length: 681, dtype: int64




```python
ticket.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換
```




    <Axes: >




    
![png](chap07_files/chap07_25_1.png)
    



```python
categorical_cols = ['Ticket']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Ticket')
conv_species.plot()
```




    <Axes: >




    
![png](chap07_files/chap07_26_1.png)
    


 ### 部屋番号カテゴリ


```python
cabin = CategoricalData(df, 'Cabin')
```


```python
cabin.show()
```




    B96 B98        4
    G6             4
    C23 C25 C27    4
    F2             3
    C22 C26        3
                  ..
    B82 B84        1
    E49            1
    B39            1
    D50            1
    B94            1
    Name: Cabin, Length: 147, dtype: int64




```python
cabin.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換
```




    <Axes: >




    
![png](chap07_files/chap07_30_1.png)
    



```python
categorical_cols = ['Cabin']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Cabin')
conv_species.plot()
```




    <Axes: >




    
![png](chap07_files/chap07_31_1.png)
    


 ### 搭乗港カテゴリ


```python
embarked = CategoricalData(df, 'Embarked')
```


```python
embarked.show()
```




    S    644
    C    168
    Q     77
    Name: Embarked, dtype: int64




```python
embarked.plot()

## %% [markdown]
# ### 種類カテゴリの数値変換
```




    <Axes: >




    
![png](chap07_files/chap07_35_1.png)
    



```python
categorical_cols = ['Embarked']
df_conv = convert_categoricals(df, categorical_cols)
conv_species = CategoricalData(df_conv, 'Embarked')
conv_species.plot()
```




    <Axes: >




    
![png](chap07_files/chap07_36_1.png)
    


 ### ダミー変数化


```python
df_dummy = pd.get_dummies(df, columns=['Survived'])
df_dummy
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
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
      <th>Survived_0</th>
      <th>Survived_1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>886</th>
      <td>887</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>211536</td>
      <td>13.0000</td>
      <td>NaN</td>
      <td>S</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>888</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>112053</td>
      <td>30.0000</td>
      <td>B42</td>
      <td>S</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>888</th>
      <td>889</td>
      <td>3</td>
      <td>female</td>
      <td>NaN</td>
      <td>1</td>
      <td>2</td>
      <td>W./C. 6607</td>
      <td>23.4500</td>
      <td>NaN</td>
      <td>S</td>
      <td>1</td>
      <td>0</td>
    </tr>
    <tr>
      <th>889</th>
      <td>890</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>111369</td>
      <td>30.0000</td>
      <td>C148</td>
      <td>C</td>
      <td>0</td>
      <td>1</td>
    </tr>
    <tr>
      <th>890</th>
      <td>891</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>370376</td>
      <td>7.7500</td>
      <td>NaN</td>
      <td>Q</td>
      <td>1</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<p>891 rows × 12 columns</p>
</div>



 ### データの可視化


```python
dv = DataVisualization(df)
dv.df_all('Survived')
```


    
![png](chap07_files/chap07_40_0.png)
    



    
![png](chap07_files/chap07_40_1.png)
    



    
![png](chap07_files/chap07_40_2.png)
    


 ## データの前処理

 ### 欠損地処理（行削除・全体代表値埋め、グループ代表値埋め）

 ### 各手法を必要に応じて実施

 - 外れ値の除外
 - 多項式特徴量・交互作用特徴量の追加
 - 特徴量の絞り込み
 - 標準化

 ## モデルの作成と学習

 ### 未学習状態モデルの生成（分類なら決定木、回帰なら線形回帰）

 ### 訓練データで学習（必要に応じて不均衡データ補正）

 ## モデルの評価

 ### 検証データで評価し指標確認（分類なら正解率、回帰なら決定係数）

 ### NG:改善案検討前処理に戻る
 ### OK:最終性能評価（テストデータで評価）

 ## 決定木における特徴量の考察


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
    




    <unittest.main.TestProgram at 0x29b39ebcee0>


