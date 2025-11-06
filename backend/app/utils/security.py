"""Security utilities."""
import hashlib
import secrets
import time
from pathlib import Path
from typing import Optional


class SecurityUtils:
    """Security-related utilities."""
    
    @staticmethod
    def generate_session_id() -> str:
        """Generate a secure session ID."""
        timestamp = str(time.time())
        random_bytes = secrets.token_bytes(32)
        combined = timestamp.encode() + random_bytes
        return hashlib.sha256(combined).hexdigest()
    
    @staticmethod
    def generate_file_id() -> str:
        """Generate a unique file ID."""
        return secrets.token_urlsafe(16)
    
    @staticmethod
    def generate_job_id() -> str:
        """Generate a unique job ID for merge operations."""
        return secrets.token_urlsafe(20)
    
    @staticmethod
    def is_safe_path(base_path: Path, target_path: Path) -> bool:
        """
        Check if target path is within base path (prevent directory traversal).
        
        Args:
            base_path: The base directory
            target_path: The target path to check
            
        Returns:
            bool: True if safe, False otherwise
        """
        try:
            base_path = base_path.resolve()
            target_path = target_path.resolve()
            return target_path.is_relative_to(base_path)
        except (ValueError, RuntimeError):
            return False
    
    @staticmethod
    def hash_file(file_path: Path) -> str:
        """
        Calculate SHA-256 hash of a file.
        
        Args:
            file_path: Path to file
            
        Returns:
            str: Hex digest of file hash
        """
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

