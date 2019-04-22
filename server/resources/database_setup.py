import os
import sys

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey, Sequence, Float
from sqlalchemy.orm import relationship, scoped_session, sessionmaker, backref
from sqlalchemy import create_engine
from sqlalchemy.dialects.postgresql import MONEY

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

    def __init__(self, id, nome):
        self.id = id
        self.nome = nome

    @property
    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome
        }

    def json(self):
        return {'id': self.id, 'nome': self.nome}
# engine = create_engine('postgresql://scott:tiger@localhost/mydatabase')


# Inicio Lancamento
class Lancamento(Base):
    __tablename__ = 'lancamento'
    id = Column(Integer, Sequence('lancamento_id_seq'),primary_key=True)
    estabelecimento = Column(String(100), nullable=False)
    data = Column(DateTime, nullable=False)
    valor = Column(Float, nullable=False)
    categoria_id = Column(Integer, ForeignKey('categoria.id'))
    categoria = relationship(
        Categoria,
        backref=backref('lancamento',
                        uselist=True,
                        cascade='delete,all'))


    def __init__(self, id, estabelecimento, data, valor, categoria):
        self.id = id
        self.nome = estabelecimento
        self.data = data
        self.valor = valor
        self.categoria = categoria

    @property
    def serialize(self):
      return {
        'id': self.id,
        'estabelecimento': self.estabelecimento,
        'data': self.data,
        'valor': self.valor,
        'categoria': self.categoria.serialize
      }

    def json(self):
      return {
              'id': self.id,
              'estabelecimento': self.estabelecimento,
              'data': self.data,
              'valor': self.valor,
              'categoria': {
                  'id': self.id,
                  'nome': self.nome
              }
             }
