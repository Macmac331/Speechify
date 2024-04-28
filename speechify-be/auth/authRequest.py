from flask import request, jsonify
from functools import wraps
from service.UserService import UserService

def token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not validate_token(token):
            return jsonify({"error": "Unauthorized Access"}), 401
        return func(*args, **kwargs)
    return wrapper

def validate_token(token):
    user_tokens = UserService.user_token
    return token in user_tokens.values()