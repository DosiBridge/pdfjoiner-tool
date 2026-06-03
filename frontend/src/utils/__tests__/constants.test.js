import { describe, it, expect } from 'vitest';
import {
  APP_NAME,
  MAX_FILE_SIZE,
  MAX_FILES,
  ALLOWED_FILE_TYPES,
  VIEW_MODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
} from '../constants';

describe('Constants', () => {
  it('APP_NAME is a non-empty string', () => {
    expect(typeof APP_NAME).toBe('string');
    expect(APP_NAME.length).toBeGreaterThan(0);
  });

  it('MAX_FILE_SIZE is 50MB', () => {
    expect(MAX_FILE_SIZE).toBe(50 * 1024 * 1024);
  });

  it('MAX_FILES is a positive number', () => {
    expect(MAX_FILES).toBeGreaterThan(0);
    expect(MAX_FILES).toBe(20);
  });

  it('ALLOWED_FILE_TYPES includes PDF', () => {
    expect(ALLOWED_FILE_TYPES).toHaveProperty('application/pdf');
    expect(ALLOWED_FILE_TYPES['application/pdf']).toContain('.pdf');
  });

  it('VIEW_MODES has grid and list', () => {
    expect(VIEW_MODES.GRID).toBe('grid');
    expect(VIEW_MODES.LIST).toBe('list');
  });

  it('ERROR_MESSAGES has required keys', () => {
    expect(ERROR_MESSAGES).toHaveProperty('UPLOAD_FAILED');
    expect(ERROR_MESSAGES).toHaveProperty('INVALID_FILE');
    expect(ERROR_MESSAGES).toHaveProperty('FILE_TOO_LARGE');
    expect(ERROR_MESSAGES).toHaveProperty('MERGE_FAILED');
    expect(ERROR_MESSAGES).toHaveProperty('NO_FILES');
    expect(ERROR_MESSAGES).toHaveProperty('NO_PAGES');
  });

  it('SUCCESS_MESSAGES has required keys', () => {
    expect(SUCCESS_MESSAGES).toHaveProperty('UPLOAD_SUCCESS');
    expect(SUCCESS_MESSAGES).toHaveProperty('MERGE_SUCCESS');
    expect(SUCCESS_MESSAGES).toHaveProperty('FILE_DELETED');
  });
});
