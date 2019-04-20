from db import db


class CategoriaModel(db.Model):
    __tablename__ = 'categoria'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(50))

    def __init__(self, _id, nome):
        self.id = _id
        self.nome = nome

    @classmethod
    def find_by_id(cls, id):
        return CategoriaModel.query.filter_by(id=id) # select * from categoria where id = id

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delet(self)
        db.session.commit()
