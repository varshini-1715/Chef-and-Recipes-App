from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Dish(Base):
    __tablename__ = "dishes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    chef_id = Column(Integer, ForeignKey("chefs.id"))
