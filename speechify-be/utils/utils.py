from app import app

def get_secret_key():
    return app.config['SECRET_KEY']