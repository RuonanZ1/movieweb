import pandas as pd

df = pd.read_csv('豆瓣华语电影数据处理后.csv', encoding='gbk')
df = df.drop_duplicates()

# 定义需要去除中括号和单引号的列
columns_to_clean = ['actor', 'date', 'director', 'language', 'region', 'title', 'type']

# 遍历每个列，去除中括号和单引号
for column in columns_to_clean:
    # 去除中括号
    df[column] = df[column].str.replace('\[|\]', '', regex=True)
    # 去除单引号
    df[column] = df[column].str.replace('\'', '')

# 保存清洗后的数据到新的CSV文件中
df.to_csv('cleaned_example.csv', index=False, encoding='gbk')
