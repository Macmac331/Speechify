from flask import Flask
from flask_cors import CORS
from schema.DbTables import db
from config import SQLALCHEMY_DATABASE_URI, SECRET_KEY

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SECRET_KEY"] = SECRET_KEY


db.init_app(app)
CORS(app)

if __name__ == "__main__":
    from controller.UserController import user_controller
    from controller.TranscriptionController import transcription_controller
    from controller.AnalyzerController import analyzer_controller
    app.register_blueprint(user_controller)
    app.register_blueprint(transcription_controller)
    app.register_blueprint(analyzer_controller)
    app.run(debug=True, port=5000)
