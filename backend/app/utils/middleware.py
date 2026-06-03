"""Middleware utilities for request tracking and performance monitoring."""
import time
import uuid
import logging
from functools import wraps
from flask import request, g, jsonify
from typing import Callable, Any

logger = logging.getLogger(__name__)


def add_request_id():
    """Add unique request ID to each request."""
    g.request_id = str(uuid.uuid4())[:8]
    g.start_time = time.time()


def get_request_id() -> str:
    """Get current request ID."""
    return getattr(g, 'request_id', 'unknown')


def log_request_time():
    """Log request processing time."""
    if hasattr(g, 'start_time'):
        duration = time.time() - g.start_time
        logger.info(
            f"Request {get_request_id()} completed in {duration:.3f}s - "
            f"{request.method} {request.path}"
        )


def timing_middleware(func: Callable) -> Callable:
    """Decorator to measure function execution time."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        try:
            result = func(*args, **kwargs)
            duration = time.time() - start
            logger.debug(f"{func.__name__} executed in {duration:.3f}s")
            return result
        except Exception as e:
            duration = time.time() - start
            logger.error(f"{func.__name__} failed after {duration:.3f}s: {e}")
            raise
    return wrapper


def handle_errors(func: Callable) -> Callable:
    """Decorator for better error handling."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValueError as e:
            logger.warning(f"Validation error in {func.__name__}: {e}")
            return jsonify({
                'error': 'Validation error',
                'detail': str(e),
                'request_id': get_request_id()
            }), 400
        except FileNotFoundError as e:
            logger.warning(f"File not found in {func.__name__}: {e}")
            return jsonify({
                'error': 'File not found',
                'detail': str(e),
                'request_id': get_request_id()
            }), 404
        except PermissionError as e:
            logger.error(f"Permission error in {func.__name__}: {e}")
            return jsonify({
                'error': 'Permission denied',
                'detail': str(e),
                'request_id': get_request_id()
            }), 403
        except Exception as e:
            logger.error(f"Unexpected error in {func.__name__}: {e}", exc_info=True)
            return jsonify({
                'error': 'Internal server error',
                'detail': str(e) if logger.level <= logging.DEBUG else 'An unexpected error occurred',
                'request_id': get_request_id()
            }), 500
    return wrapper

