from db import db


class UserModel:
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    password = db.Column(db.String(50))

    def __init__(self, _id, name, password):
        self.id = _id
        self.name = name
        self.password = password
    
    def json(self):
        return {'name': self.name, 'password': self.password}
