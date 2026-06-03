import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  formatFileSize,
  generateId,
  validatePDFFile,
  getSessionId,
  clearSession,
  debounce,
  groupPagesByFile,
  calculateTotalPages,
} from '../helpers';

describe('formatFileSize', () => {
  it('formats bytes', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
    expect(formatFileSize(500)).toBe('500 Bytes');
  });

  it('formats kilobytes', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  it('formats megabytes', () => {
    expect(formatFileSize(1048576)).toBe('1 MB');
    expect(formatFileSize(5242880)).toBe('5 MB');
  });

  it('formats gigabytes', () => {
    expect(formatFileSize(1073741824)).toBe('1 GB');
  });

  it('handles zero', () => {
    expect(formatFileSize(0)).toBe('0 Bytes');
  });
});

describe('generateId', () => {
  it('returns a non-empty string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('generates unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe('validatePDFFile', () => {
  it('accepts a valid PDF file', () => {
    const file = new File(['content'], 'test.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 1024 });
    const result = validatePDFFile(file);
    expect(result.valid).toBe(true);
  });

  it('rejects non-PDF file type', () => {
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    Object.defineProperty(file, 'size', { value: 1024 });
    const result = validatePDFFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it('rejects file exceeding max size', () => {
    const file = new File(['content'], 'big.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 60 * 1024 * 1024 }); // 60MB
    const result = validatePDFFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('50');
  });

  it('accepts file at exactly max size', () => {
    const file = new File(['content'], 'exact.pdf', { type: 'application/pdf' });
    Object.defineProperty(file, 'size', { value: 50 * 1024 * 1024 }); // 50MB
    const result = validatePDFFile(file);
    expect(result.valid).toBe(true);
  });
});

describe('getSessionId / clearSession', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('creates and returns a session ID', () => {
    const id = getSessionId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('returns the same session ID on subsequent calls', () => {
    const first = getSessionId();
    const second = getSessionId();
    expect(first).toBe(second);
  });

  it('generates a new ID after clearSession', () => {
    const first = getSessionId();
    clearSession();
    const second = getSessionId();
    expect(second).not.toBe(first);
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets delay on repeated calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);

    debounced();
    vi.advanceTimersByTime(100);
    debounced(); // reset
    vi.advanceTimersByTime(100);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('groupPagesByFile', () => {
  it('groups pages by fileId', () => {
    const pages = [
      { fileId: 'a', pageNumber: 1 },
      { fileId: 'b', pageNumber: 1 },
      { fileId: 'a', pageNumber: 2 },
    ];
    const result = groupPagesByFile(pages);
    expect(Object.keys(result)).toHaveLength(2);
    expect(result['a']).toHaveLength(2);
    expect(result['b']).toHaveLength(1);
  });

  it('returns empty object for empty array', () => {
    expect(groupPagesByFile([])).toEqual({});
  });
});

describe('calculateTotalPages', () => {
  it('sums selected pages across files', () => {
    const selections = [
      { file_id: 'f1', pages: [1, 2, 3] },
      { file_id: 'f2', pages: [1, 5] },
    ];
    expect(calculateTotalPages(selections)).toBe(5);
  });

  it('returns 0 for empty selections', () => {
    expect(calculateTotalPages([])).toBe(0);
  });
});
