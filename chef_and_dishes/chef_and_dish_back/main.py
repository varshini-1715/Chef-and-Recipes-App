from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 👇 CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # ✅ allow Angular frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Your route imports and includes go below
from controllers.chef_controller import chef_router
from controllers.dish_controller import dish_router
from controllers.recipe_controller import recipe_router

app.include_router(chef_router)
app.include_router(dish_router)
app.include_router(recipe_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
# To run the FastAPI application, use the command: