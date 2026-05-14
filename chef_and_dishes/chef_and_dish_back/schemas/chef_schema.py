from pydantic import BaseModel

class ChefBase(BaseModel):
    name: str
    specialty: str | None = None

class ChefCreate(ChefBase):
    pass

class Chef(ChefBase):
    id: int

    class Config:
        orm_mode = True
