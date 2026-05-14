from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    dish_id = Column(Integer, ForeignKey("dishes.id"))
