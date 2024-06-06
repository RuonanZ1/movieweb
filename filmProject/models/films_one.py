# @Time : 2024/6/2 19:00
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}}, supports_credentials=True)  # 允许所有域名
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:username@localhost/db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class FilmInfo(db.Model):
    __tablename__ = 'filminfo'
    id = db.Column(db.Integer, primary_key=True)
    actor = db.Column(db.String(255))
    date = db.Column(db.String(255), nullable=False)
    director = db.Column(db.String(255), nullable=False)
    language = db.Column(db.String(255), nullable=False)
    rate = db.Column(db.String(255), nullable=False)
    rating_num = db.Column(db.String(255), nullable=False)
    region = db.Column(db.String(255), nullable=False)
    runtime = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    year = db.Column(db.String(255), nullable=False)
    # 设置与Comment的关系
    comments = db.relationship('Comment', backref='filminfo', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'actor': self.actor,
            'date': self.date,
            'director': self.director,
            'language': self.language,
            'rate': self.rate,
            'rating_num': self.rating_num,
            'region': self.region,
            'runtime': self.runtime,
            'title': self.title,
            'type': self.type,
            'year': self.year
        }

    @staticmethod
    def count_by_year():
        films_per_year = db.session.query(
            FilmInfo.year,
            db.func.count(FilmInfo.year).label('count')
        ).group_by(FilmInfo.year).all()

        # 使用字典推导式改写返回结果，以年份为键，电影数为值
        return {str(year): count for year, count in films_per_year}

    @staticmethod
    def avg_rate_by_region():
        # 查询中国大陆、中国香港、中国台湾每年电影的平均得分
        avg_rate_per_year_per_region = db.session.query(
            FilmInfo.region,
            FilmInfo.year,
            db.func.coalesce(db.func.avg(FilmInfo.rate), 0).label('average_rate')
        ).filter(
            or_(
                FilmInfo.region.contains("中国大陆"),
                FilmInfo.region.contains("中国香港"),
                FilmInfo.region.contains("中国台湾")
            )
        ).group_by(
            FilmInfo.region, FilmInfo.year
        ).order_by(
            FilmInfo.region, FilmInfo.year.desc()
        ).all()

        result_dict = {"cn": {}, "hk": {}, "tw": {}}

        for row in avg_rate_per_year_per_region:
            region, year, average_rate = row

            # 根据地区来决定键值
            region_key = ""
            if "中国大陆" in region:
                region_key = "cn"
            elif "中国香港" in region:
                region_key = "hk"
            elif "中国台湾" in region:
                region_key = "tw"

            # 更新平均评分，保留小数点后两位，如果平均评分为0，则赋值为None
            result_dict[region_key][year] = None if average_rate == 0 else round(average_rate, 2)

        return result_dict


# 评论实体模型
class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer, primary_key=True)
    like = db.Column(db.Integer, default=0)
    dislike = db.Column(db.Integer, default=0)
    content = db.Column(db.Text, nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('filminfo.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('userinfo.id'), nullable=False)


class User(db.Model):
    __tablename__ = "userinfo"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    comments = db.relationship("Comment", backref="userinfo", lazy=True)


# 创建表格
with app.app_context():
    db.create_all()
