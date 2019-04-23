from db import db


class UserModel:
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    password = db.Column(db.String(50))

    def __init__(self, _id, username, password):
        self.id = _id
        self.username = username
        self.password = password
    
    def json(self):
        return {'name': self.username, 'password': self.password}
