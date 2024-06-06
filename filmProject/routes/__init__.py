# @Time : 2024/6/2 19:18
from flask import Blueprint
from filmProject.routes.films_two import films_bp

routes_bp = Blueprint('routes', __name__)
routes_bp.register_blueprint(films_bp, url_prefix='/api/films')
"""
url_prefix='/api/films': 这是一个关键字参数，
为注册到 routes_bp 的蓝图下的所有路由设置了一个共同的 URL 前缀，
即 /api/films。意味着，如果 films_bp 蓝图有一个路由 /list，当它被注册之后，
你将通过完整的URL路径 /api/films/list 来访问这个路由。
"""
