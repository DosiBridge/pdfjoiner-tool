"""Helper utilities."""
import shutil
import time
from pathlib import Path
from typing import Optional
import logging

logger = logging.getLogger(__name__)


class FileCleanup:
    """File cleanup utilities."""
    
    @staticmethod
    def cleanup_session(session_id: str, base_folders: list[Path]) -> None:
        """
        Clean up all files for a session.
        
        Args:
            session_id: Session ID to clean up
            base_folders: List of folders to search
        """
        for folder in base_folders:
            session_folder = folder / session_id
            if session_folder.exists():
                try:
                    shutil.rmtree(session_folder)
                    logger.info(f"Cleaned up session folder: {session_folder}")
                except Exception as e:
                    logger.error(f"Error cleaning up {session_folder}: {e}")
    
    @staticmethod
    def cleanup_old_files(folder: Path, max_age_seconds: int) -> int:
        """
        Clean up files older than specified age.
        
        Args:
            folder: Folder to clean
            max_age_seconds: Maximum age in seconds
            
        Returns:
            int: Number of files deleted
        """
        if not folder.exists():
            return 0
        
        deleted_count = 0
        current_time = time.time()
        
        try:
            for item in folder.iterdir():
                try:
                    if item.is_file():
                        age = current_time - item.stat().st_mtime
                        if age > max_age_seconds:
                            item.unlink()
                            deleted_count += 1
                    elif item.is_dir():
                        # Recursively clean directories
                        dir_age = current_time - item.stat().st_mtime
                        if dir_age > max_age_seconds:
                            shutil.rmtree(item)
                            deleted_count += 1
                except Exception as e:
                    logger.error(f"Error cleaning up {item}: {e}")
        except Exception as e:
            logger.error(f"Error accessing folder {folder}: {e}")
        
        return deleted_count


def format_file_size(size_bytes: int) -> str:
    """
    Format file size in human-readable format.
    
    Args:
        size_bytes: Size in bytes
        
    Returns:
        str: Formatted size (e.g., "1.5 MB")
    """
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size_bytes < 1024.0:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024.0
    return f"{size_bytes:.1f} TB"


def ensure_session_folders(session_id: str, *folders: Path) -> None:
    """
    Ensure session folders exist.
    
    Args:
        session_id: Session ID
        folders: Folders to create
    """
    for folder in folders:
        session_folder = folder / session_id
        session_folder.mkdir(parents=True, exist_ok=True)

