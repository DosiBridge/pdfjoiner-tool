"""File management service."""
import logging
import shutil
from pathlib import Path
from typing import Dict, Optional
from datetime import datetime, timedelta
import json

logger = logging.getLogger(__name__)


class FileManager:
    """Manage uploaded files and sessions."""
    
    def __init__(self, base_folder: Path):
        """
        Initialize file manager.
        
        Args:
            base_folder: Base folder for file storage
        """
        self.base_folder = base_folder
        self.sessions: Dict[str, dict] = {}
    
    def create_session(self, session_id: str) -> Path:
        """
        Create a new session folder.
        
        Args:
            session_id: Unique session identifier
            
        Returns:
            Path: Session folder path
        """
        session_folder = self.base_folder / session_id
        session_folder.mkdir(parents=True, exist_ok=True)
        
        self.sessions[session_id] = {
            'created_at': datetime.now(),
            'files': {},
            'folder': session_folder
        }
        
        logger.info(f"Created session: {session_id}")
        return session_folder
    
    def get_session_folder(self, session_id: str) -> Optional[Path]:
        """Get session folder path."""
        if session_id in self.sessions:
            return self.sessions[session_id]['folder']
        
        # Check if folder exists even if not in memory
        session_folder = self.base_folder / session_id
        if session_folder.exists():
            return session_folder
        
        return None
    
    def add_file(
        self,
        session_id: str,
        file_id: str,
        file_path: Path,
        metadata: dict
    ) -> None:
        """
        Add file to session.
        
        Args:
            session_id: Session ID
            file_id: Unique file ID
            file_path: Path to file
            metadata: File metadata
        """
        if session_id not in self.sessions:
            logger.warning(f"Session {session_id} not found, creating new")
            self.create_session(session_id)
        
        self.sessions[session_id]['files'][file_id] = {
            'path': file_path,
            'metadata': metadata,
            'added_at': datetime.now()
        }
        
        logger.debug(f"Added file {file_id} to session {session_id}")
    
    def get_file(self, session_id: str, file_id: str) -> Optional[dict]:
        """
        Get file information.
        Checks in-memory first, then filesystem if not found.
        """
        # Check in-memory first
        if session_id in self.sessions:
            file_info = self.sessions[session_id]['files'].get(file_id)
            if file_info:
                return file_info
        
        # If not in memory, check filesystem
        # This handles cases where the server restarted but files still exist
        session_folder = self.get_session_folder(session_id)
        if session_folder and session_folder.exists():
            # Look for files matching the file_id pattern
            for file_path in session_folder.glob(f"{file_id}_*"):
                if file_path.is_file() and file_path.suffix.lower() == '.pdf':
                    # Reconstruct file info from filesystem
                    # Extract original filename from path
                    filename = file_path.name[len(file_id) + 1:]  # Remove "file_id_"
                    
                    # Try to get metadata from PDF
                    try:
                        from app.services.pdf_processor import PDFProcessor
                        page_count = PDFProcessor.get_page_count(file_path)
                        file_size = file_path.stat().st_size
                        
                        # Re-add to in-memory session for future lookups
                        if session_id not in self.sessions:
                            self.create_session(session_id)
                        
                        metadata = {
                            'filename': filename,
                            'original_filename': filename,
                            'page_count': page_count,
                            'file_size': file_size
                        }
                        
                        file_info = {
                            'path': file_path,
                            'metadata': metadata,
                            'added_at': datetime.fromtimestamp(file_path.stat().st_mtime)
                        }
                        
                        self.sessions[session_id]['files'][file_id] = file_info
                        logger.info(f"Restored file {file_id} from filesystem for session {session_id}")
                        return file_info
                    except Exception as e:
                        logger.warning(f"Could not restore file {file_id} from filesystem: {e}")
                        continue
        
        return None
    
    def get_session_files(self, session_id: str) -> Dict[str, dict]:
        """
        Get all files in session.
        Checks in-memory first, then filesystem if not found.
        """
        # Check in-memory first
        if session_id in self.sessions and self.sessions[session_id]['files']:
            return self.sessions[session_id]['files']
        
        # If not in memory, check filesystem and restore
        session_folder = self.get_session_folder(session_id)
        if session_folder and session_folder.exists():
            files = {}
            try:
                from app.services.pdf_processor import PDFProcessor
                
                # Ensure session exists in memory
                if session_id not in self.sessions:
                    self.create_session(session_id)
                
                # Scan for PDF files and restore them
                for file_path in session_folder.glob("*.pdf"):
                    # Extract file_id from filename (format: "file_id_filename.pdf")
                    if '_' in file_path.stem:
                        file_id = file_path.stem.split('_')[0]
                        filename = '_'.join(file_path.stem.split('_')[1:]) + file_path.suffix
                        
                        try:
                            page_count = PDFProcessor.get_page_count(file_path)
                            file_size = file_path.stat().st_size
                            
                            metadata = {
                                'filename': filename,
                                'original_filename': filename,
                                'page_count': page_count,
                                'file_size': file_size
                            }
                            
                            file_info = {
                                'path': file_path,
                                'metadata': metadata,
                                'added_at': datetime.fromtimestamp(file_path.stat().st_mtime)
                            }
                            
                            files[file_id] = file_info
                            self.sessions[session_id]['files'][file_id] = file_info
                        except Exception as e:
                            logger.warning(f"Could not restore file {file_path.name}: {e}")
                            continue
                
                if files:
                    logger.info(f"Restored {len(files)} files from filesystem for session {session_id}")
                
            except Exception as e:
                logger.error(f"Error restoring session files from filesystem: {e}")
            
            return files
        
        return {}
    
    def delete_file(self, session_id: str, file_id: str) -> bool:
        """
        Delete a file from session.
        
        Args:
            session_id: Session ID
            file_id: File ID to delete
            
        Returns:
            bool: True if successful
        """
        try:
            if session_id in self.sessions:
                file_info = self.sessions[session_id]['files'].get(file_id)
                if file_info:
                    file_path = file_info['path']
                    if file_path.exists():
                        file_path.unlink()
                    
                    del self.sessions[session_id]['files'][file_id]
                    logger.info(f"Deleted file {file_id} from session {session_id}")
                    return True
            return False
        except Exception as e:
            logger.error(f"Error deleting file {file_id}: {e}")
            return False
    
    def cleanup_session(self, session_id: str) -> bool:
        """
        Clean up entire session.
        
        Args:
            session_id: Session ID to clean up
            
        Returns:
            bool: True if successful
        """
        try:
            session_folder = self.get_session_folder(session_id)
            if session_folder and session_folder.exists():
                shutil.rmtree(session_folder)
                logger.info(f"Cleaned up session folder: {session_folder}")
            
            if session_id in self.sessions:
                del self.sessions[session_id]
            
            return True
            
        except Exception as e:
            logger.error(f"Error cleaning up session {session_id}: {e}")
            return False
    
    def cleanup_old_sessions(self, max_age_hours: int = 24) -> int:
        """
        Clean up sessions older than specified age.
        
        Args:
            max_age_hours: Maximum age in hours
            
        Returns:
            int: Number of sessions cleaned up
        """
        cutoff_time = datetime.now() - timedelta(hours=max_age_hours)
        cleaned_count = 0
        
        # Clean up in-memory sessions
        sessions_to_remove = []
        for session_id, session_data in self.sessions.items():
            if session_data['created_at'] < cutoff_time:
                if self.cleanup_session(session_id):
                    sessions_to_remove.append(session_id)
                    cleaned_count += 1
        
        for session_id in sessions_to_remove:
            if session_id in self.sessions:
                del self.sessions[session_id]
        
        # Clean up orphaned folders
        try:
            for item in self.base_folder.iterdir():
                if item.is_dir():
                    folder_age = datetime.now() - datetime.fromtimestamp(
                        item.stat().st_mtime
                    )
                    if folder_age > timedelta(hours=max_age_hours):
                        shutil.rmtree(item)
                        cleaned_count += 1
                        logger.info(f"Cleaned up orphaned folder: {item}")
        except Exception as e:
            logger.error(f"Error cleaning orphaned folders: {e}")
        
        logger.info(f"Cleaned up {cleaned_count} old sessions")
        return cleaned_count
    
    def get_session_info(self, session_id: str) -> Optional[dict]:
        """Get session information."""
        if session_id in self.sessions:
            session_data = self.sessions[session_id]
            return {
                'session_id': session_id,
                'created_at': session_data['created_at'].isoformat(),
                'file_count': len(session_data['files']),
                'files': {
                    file_id: {
                        'filename': file_info['metadata'].get('filename'),
                        'page_count': file_info['metadata'].get('page_count'),
                        'file_size': file_info['metadata'].get('file_size')
                    }
                    for file_id, file_info in session_data['files'].items()
                }
            }
        return None

