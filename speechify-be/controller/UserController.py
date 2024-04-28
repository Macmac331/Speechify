from flask import Blueprint, request, jsonify
from service.UserService import UserService

user_controller = Blueprint('user_controller', __name__)
user_service = UserService()
USER_API_BASE_URL = '/api/v1/user/'

@user_controller.route(USER_API_BASE_URL + "create", methods=['POST'])
def createUser():
    data = request.json
    return user_service.create_user(data)


@user_controller.route(USER_API_BASE_URL + "login", methods=['POST'])
def loginUser():
    data = request.json
    return user_service.login_user(data)

