import pandas as pd
import seaborn as sns

class CSVRepository:
    def __init__(self, file) -> None:
        self.file = file

    def get_data(self):
        return pd.read_csv(self.file)

class SQLRepository:
    def __init__(self, table) -> None:
        self.table = table

    def get_data(self):
        from sqlalchemy import create_engine
        host = 'localhost'
        port = '5432'
        db = 'test'
        username = 'root'
        password = 'root'

        engine = create_engine(f'postgresql://{username}:{password}@{host}:{port}/{db}')
        return pd.read_sql_table(self.table, engine)

class CategoricalData:
    def __init__(self, df, col) -> None:
        self.df = df
        self.col = col

    def show(self):
        """カテゴリーデータの値の数を確認"""
        return self.df[self.col].value_counts()

    def plot(self):
        """カテゴリーデータの値の数を棒グラフで確認"""
        return self.df[self.col].value_counts().plot(kind='bar')

    def convert(self):
        """カテゴリーデータを数値に変換"""
        from sklearn.preprocessing import LabelEncoder

        encoder = LabelEncoder()
        return encoder.fit_transform(self.df[self.col])

    def pivot(self, index,value):
        """ピボットテーブルによる集計"""
        return self.df.pivot_table(index=index, columns=self.col, values=value, aggfunc='count')

    def dummy(self):
        """ダミー変数化"""
        return pd.get_dummies(self.df, columns=[self.col])

class DataVisualization:
    def __init__(self, df) -> None:
        self.df = df

    def df_hist(self):
        """データフレームのヒストグラム表示"""
        return self.df.hist(figsize=(12, 12))

    def df_scatter(self):
        """データフレームの散布図表示"""
        return pd.plotting.scatter_matrix(self.df, figsize=(12, 12))

    def df_box(self):
        """データフレームの箱ひげ図表示"""
        return self.df.boxplot(figsize=(12, 12))

    def df_pairplot(self, hue=None):
        """データフレームのペアプロット表示"""
        return sns.pairplot(self.df, hue=hue)

    def df_all(self, hue):
        """データフレームの全ての表示"""
        self.df_hist()
        self.df_scatter()
        self.df_box()
        self.df_pairplot(hue)

def convert_categoricals(df, cols):
    df_conv = df.copy()
    for c in cols:
        df_conv[c] = CategoricalData(df_conv, c).convert()
    return df_conv
