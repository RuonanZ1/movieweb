# @Time : 2024/6/2 20:53
import pandas as pd
from sqlalchemy import create_engine
df = pd.read_csv('cleaned_example.csv', encoding='gbk')  # 你可能需要根据你的CSV文件调整编码
# 使用你的数据库配置来替换下面的占位符
username = 'root'
password = 'username'
host = 'localhost'
dbname = 'db'
# 如果你的MySQL服务器运行在默认端口上，你可以忽略端口号，或根据实际情况修改
engine = create_engine(f'mysql+pymysql://{username}:{password}@{host}/{dbname}')
table_name = 'filminfo'
df.to_sql(name=table_name, con=engine, if_exists='append', index=False)


