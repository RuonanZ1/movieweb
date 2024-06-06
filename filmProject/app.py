# @Time : 2024/6/2 18:59
from flask import Flask
from routes.__init__ import routes_bp
from filmProject.models.films_one import db  # 别的文件引用需要db.init_app(app)处理
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)  # 允许所有域名
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:username@localhost/db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


app.register_blueprint(routes_bp)

if __name__ == '__main__':
    app.run(debug=True)
