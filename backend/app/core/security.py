from argon2 import PasswordHasher

ph = PasswordHasher()

def hash_password(password: str):
    """Hash the password before storing in database."""
    return ph.hash(password)

def verify_password(hashed_password, password: str):
   """Verify the password."""
   return ph.verify(hashed_password, password)