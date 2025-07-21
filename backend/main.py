# main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os
from dotenv import load_dotenv

from supabase_client import supabase
from pet_routes import router as pet_router
from thinker import start_pet_thinker

load_dotenv()  # ✅ load .env

app = FastAPI()
auth_scheme = HTTPBearer(auto_error=False)

SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")

def get_current_user(
    cred: HTTPAuthorizationCredentials = Depends(auth_scheme),
):
    if not cred or cred.scheme.lower() != "bearer":
        raise HTTPException(401, "Missing token")

    try:
        payload = jwt.decode(
            cred.credentials,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        return payload
    except jwt.PyJWTError as e:
        raise HTTPException(401, f"Invalid token: {str(e)}")

# ✅ Route registration (no global Depends)
app.include_router(pet_router, prefix="/pet")

# ✅ Start thinker
start_pet_thinker(app, supabase)
