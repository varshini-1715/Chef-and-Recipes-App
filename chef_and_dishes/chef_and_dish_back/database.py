from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"  # or your actual database URL

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()  # <---- This is the Base class you import in models

# Dependency function to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
