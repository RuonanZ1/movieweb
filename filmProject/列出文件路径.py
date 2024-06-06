# @Time : 2024/6/2 20:06
import os

# 设定你想要列出文件的目录
directory = '../filmProject'

# 使用 os.listdir() 列出文件和目录，只能列出当前层级
entries = os.listdir(directory)
for entry in entries:
    print(entry)

# 使用 os.walk() 递归列出所有子目录和文件
for dirpath, dirnames, filenames in os.walk(directory):
    print(f'Found directory: {dirpath}')
    for filename in filenames:
        print(f'\t{filename}')