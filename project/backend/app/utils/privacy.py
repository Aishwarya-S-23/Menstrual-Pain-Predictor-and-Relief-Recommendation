import hashlib

def anonymize_user_id(user_id: str) -> str:
    return hashlib.sha256(user_id.encode()).hexdigest()

def should_retain_data(consent_flags: dict) -> bool:
    return consent_flags.get('analytics', False)