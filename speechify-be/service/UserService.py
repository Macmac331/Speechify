import datetime
from schema.DbTables import User, UserAuth, db
from werkzeug.security import generate_password_hash, check_password_hash
from utils.utils import get_secret_key
import jwt
from getset.UserModel import UserData
from flask import jsonify

class UserService:
    user_token = {}
    def create_user(self, data):
        firstname = data.get('firstname')
        lastname = data.get('lastname')
        userAuth = data.get('userAuth')

        if userAuth and userAuth.get('username') and userAuth.get('password'):
            username = userAuth['username']
            password = userAuth['password']

            hashed_passsword = generate_password_hash(password)

            new_user = User(firstname=firstname, lastname=lastname)
            new_user_auth = UserAuth(username=username, password=hashed_passsword, user=new_user)
            
            db.session.add(new_user)
            db.session.add(new_user_auth)
            db.session.commit()

            return jsonify({'message': "Saved Succcessfully"}), 200
        else:
            return jsonify({'message': "Invalid Data"}), 400
    
    def login_user(self, data):
        username = data.get('username')
        password = data.get('password')

        user_auth = UserAuth.query.filter_by(username=username).first()
    
        if user_auth:
            stored_password = user_auth.password
            secret_key = get_secret_key()

            if check_password_hash(stored_password,password):
                payload = {
                    'user_id' : user_auth.user_id,
                    'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
                token = jwt.encode(payload, secret_key)
                response = {
                    'token' : token,
                    'message' : 'Login Success',
                    'user_id' : user_auth.user_id
                }
                self.user_token[user_auth.user_id] = token
                return jsonify(response), 200
        
        return jsonify({'message': 'Invalid username or password'}), 401

    
