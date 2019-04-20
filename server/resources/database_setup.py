import os
import sys

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, scoped_session, sessionmaker
from sqlalchemy import create_engine

from db import db

engine = create_engine('postgresql://postgres:postgres@localhost:5432/bills')
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

class Categoria(Base):
    __tablename__ = 'categoria'
    id = Column(Integer, primary_key=True)
    nome = Column(String(50))

    @property
    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome
        }

    def json(self):
        return {'id': self.id, 'nome': self.nome}
# engine = create_engine('postgresql://scott:tiger@localhost/mydatabase')
