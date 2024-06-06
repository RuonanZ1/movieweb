# @Time : 2024/6/3 9:14
import chardet


def detect_encoding(file_path):
    with open(file_path, 'rb') as file:
        result = chardet.detect(file.read())
        print(result)
        return result['encoding']


# 使用函数检测CSV文件的编码
file_path = '豆瓣华语电影数据处理后.csv'
encoding = detect_encoding(file_path)
print(f"Detected encoding: {encoding}")
