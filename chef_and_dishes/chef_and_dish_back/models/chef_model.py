from sqlalchemy import Column, Integer, String
from database import Base

class Chef(Base):
    __tablename__ = "chefs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    specialty = Column(String, nullable=True)
