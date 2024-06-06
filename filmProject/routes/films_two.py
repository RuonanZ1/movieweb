# @Time : 2024/6/2 19:19
from flask import Blueprint, jsonify, request, abort
from filmProject.models.films_one import FilmInfo, db, Comment, User
import logging

logging.basicConfig(filename='films_api.log', level=logging.DEBUG)
films_bp = Blueprint('films', __name__)


@films_bp.route('/total', methods=['GET'])
def get_total_num():
    try:
        total_num = len(FilmInfo.query.all())
        return jsonify({'total_num': total_num}), 200
    except Exception as e:
        logging.error(f'Error occurred while retrieving data from the database. Error message: {str(e)}')
        return jsonify({'error': str(e)}), 500


@films_bp.route('/detail/<string:id>', methods=['GET'])
def get_detail(id):
    film = FilmInfo.query.filter_by(id=id).first()
    if not film:
        return jsonify({'error': 'Not found'}), 404
    searchfilm = {
        'actor': film.actor,
        'date': film.date,
        'director': film.director,
        'id': film.id,
        'language': film.language,
        'rate': film.rate,
        'rating_num': film.rating_num,
        'region': film.region,
        'runtime': film.runtime,
        'title': film.title,
        'type': film.type,
        'year': film.year,
    }
    print(searchfilm)
    return jsonify({'film': searchfilm}), 200


@films_bp.route('/searchFilms', methods=['GET'])
def get_search_films():
    try:
        name = request.args.get('filmName')
        films_in_sql = FilmInfo.query.filter(FilmInfo.title.like(f'%{name}%')).all()
        print(len(films_in_sql))
        # 准备作为JSON返回的列表
        films_list = [{
            'actor': film.actor,
            'date': film.date,
            'director': film.director,
            'id': film.id,
            'language': film.language,
            'rate': film.rate,
            'rating_num': film.rating_num,
            'region': film.region,
            'runtime': film.runtime,
            'title': film.title,
            'type': film.type,
            'year': film.year,
        } for film in films_in_sql]
        return jsonify(films_list), 200
    except Exception as e:
        logging.error(f'Error occurred {e}')
        return jsonify({'error': str(e)}), 500


@films_bp.route('/', methods=['GET'])
def get_films():
    # 获取页码和每页数量参数，默认值为第1页和每页10条
    page = request.args.get('page', 1, type=int)
    pageSize = request.args.get('pageSize', 10, type=int)
    try:
        # 使用paginate实现分页，这里修改了paginate的调用方式
        pagination = FilmInfo.query.paginate(page=page, per_page=pageSize, error_out=False)
        films = pagination.items
        total = pagination.total

        # 将每个电影信息转化为字典形式
        results = [film.to_dict() for film in films]

        logging.info(f'Page {page} of films were successfully retrieved from the database.')
        # 返回当前页面的电影信息和总数量
        return jsonify({'films': results, 'total': total}), 200
    except Exception as e:
        logging.error(f'Error occurred while retrieving data from the database. Error message: {str(e)}')
        return jsonify({'error': str(e)}), 500


@films_bp.route('/count_by_year', methods=['GET'])
def count_by_year():
    try:
        result = FilmInfo.count_by_year()
        logging.info('获得各年份电影数量序列')
        return jsonify(result)
    except Exception as e:
        logging.error('Error occurred while retrieving datas from the database. Error message: {}'.format(str(e)))
        return jsonify({"error": str(e)})


@films_bp.route('/avg_rate_by_region', methods=['GET'])
def avg_rate_by_region():
    try:
        result = FilmInfo.avg_rate_by_region()
        logging.info('返回按年统计的中国大陆、中国香港、中国台湾每年电影的平均得分，,返回的json数据格式如下所示')
        return jsonify(result)
    except Exception as e:
        logging.error('Error occurred while retrieving datas from the database. Error message: {}'.format(str(e)))
        return jsonify({"error": str(e)})


@films_bp.route('/id=<string:movie_id>/addComment', methods=['POST'])
def add_comment(movie_id):
    # 检查电影ID是否存在
    movie = FilmInfo.query.filter_by(id=movie_id).first()
    print(movie)
    if not movie:
        # 如果电影不存在，返回404错误
        abort(404, description="Movie not found")
    data = request.get_json()
    new_comment = Comment(like=0, dislike=0, content=data['content'], movie_id=movie_id, user_id=20220986)
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'id': new_comment.id, 'content': new_comment.content, 'movie_id': new_comment.movie_id,
                    'like': new_comment.like, 'dislike': new_comment.dislike}), 200


@films_bp.route('/id=<string:movie_id>/comments', methods=['GET'])
def get_comments(movie_id):
    """获取指定电影的所有评论"""
    comments = Comment.query.filter_by(movie_id=movie_id).all()
    # user = User.query.filter_by(id=comment.user_id for comment in comments).first()
    return jsonify([{'id': comment.id, 'content': comment.content, 'movie_id': comment.movie_id,
                     'user_id': comment.user_id, 'like': comment.like,
                     'dislike': comment.dislike} for comment in comments]), 200


@films_bp.route('/id=<string:user_id>/like', methods=['GET'])
def like_comment(user_id):
    comments = Comment.query.filter_by(user_id=user_id).first()
    if comments:
        comments.like += 1
        db.session.commit()
    return jsonify({'like': comments.like}), 200


@films_bp.route('/id=<string:user_id>/dislike', methods=['GET'])
def dislike_comment(user_id):
    comments = Comment.query.filter_by(user_id=user_id).first()
    if comments:
        comments.dislike += 1
        db.session.commit()
    return jsonify({'dislike': comments.dislike}), 200
