"""Performance metrics and monitoring utilities."""
import time
import psutil
import logging
from pathlib import Path
from typing import Dict, Any
from collections import defaultdict, deque
from threading import Lock

logger = logging.getLogger(__name__)


class MetricsCollector:
    """Collect and track application metrics."""
    
    def __init__(self):
        self.request_times = deque(maxlen=1000)  # Last 1000 requests
        self.endpoint_counts = defaultdict(int)
        self.error_counts = defaultdict(int)
        self.thumbnail_generation_times = deque(maxlen=500)
        self.lock = Lock()
    
    def record_request(self, endpoint: str, duration: float, status_code: int):
        """Record a request metric."""
        with self.lock:
            self.request_times.append(duration)
            self.endpoint_counts[endpoint] += 1
            if status_code >= 400:
                self.error_counts[endpoint] += 1
    
    def record_thumbnail_generation(self, duration: float):
        """Record thumbnail generation time."""
        with self.lock:
            self.thumbnail_generation_times.append(duration)
    
    def get_stats(self) -> Dict[str, Any]:
        """Get current statistics."""
        with self.lock:
            request_times_list = list(self.request_times)
            
            stats = {
                'requests': {
                    'total': len(request_times_list),
                    'avg_time': sum(request_times_list) / len(request_times_list) if request_times_list else 0,
                    'min_time': min(request_times_list) if request_times_list else 0,
                    'max_time': max(request_times_list) if request_times_list else 0,
                },
                'endpoints': dict(self.endpoint_counts),
                'errors': dict(self.error_counts),
                'thumbnails': {
                    'total_generated': len(self.thumbnail_generation_times),
                    'avg_time': sum(self.thumbnail_generation_times) / len(self.thumbnail_generation_times) if self.thumbnail_generation_times else 0,
                }
            }
            
            return stats


# Global metrics collector
metrics = MetricsCollector()


def get_system_stats() -> Dict[str, Any]:
    """Get system resource statistics."""
    try:
        cpu_percent = psutil.cpu_percent(interval=0.1)
        memory = psutil.virtual_memory()
        disk = psutil.disk_usage('/')
        
        return {
            'cpu': {
                'percent': cpu_percent,
                'count': psutil.cpu_count()
            },
            'memory': {
                'total_gb': round(memory.total / (1024**3), 2),
                'available_gb': round(memory.available / (1024**3), 2),
                'used_gb': round(memory.used / (1024**3), 2),
                'percent': memory.percent
            },
            'disk': {
                'total_gb': round(disk.total / (1024**3), 2),
                'free_gb': round(disk.free / (1024**3), 2),
                'used_gb': round(disk.used / (1024**3), 2),
                'percent': disk.percent
            }
        }
    except Exception as e:
        logger.error(f"Error getting system stats: {e}")
        return {'error': str(e)}


def get_folder_size(folder: Path) -> int:
    """Get total size of a folder in bytes."""
    try:
        total = 0
        for item in folder.rglob('*'):
            if item.is_file():
                total += item.stat().st_size
        return total
    except Exception as e:
        logger.error(f"Error calculating folder size for {folder}: {e}")
        return 0

