from cryptography.fernet import Fernet
import base64
import os

class DataEncryptor:
    def __init__(self, key: str = None):
        if key:
            self.key = base64.urlsafe_b64encode(key.encode()[:32].ljust(32, b'\0'))
        else:
            self.key = Fernet.generate_key()
        self.fernet = Fernet(self.key)
    
    def encrypt(self, data: str) -> str:
        return self.fernet.encrypt(data.encode()).decode()
    
    def decrypt(self, encrypted_data: str) -> str:
        return self.fernet.decrypt(encrypted_data.encode()).decode()

# Global instance
encryptor = DataEncryptor()