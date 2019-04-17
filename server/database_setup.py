import os
import sys

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

Base = declarative_base()

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

# engine = create_engine('postgresql://scott:tiger@localhost/mydatabase')