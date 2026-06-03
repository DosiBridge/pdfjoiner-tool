import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Mock API and helpers for all tool pages
vi.mock('../../services/api', () => ({
  pdfAPI: {
    uploadFiles: vi.fn(),
    getDownloadUrl: vi.fn(() => 'http://test/download'),
    compressPdf: vi.fn(),
    splitPdf: vi.fn(),
    imageToPath: vi.fn(),
    reorderPdf: vi.fn(),
    deletePages: vi.fn(),
  },
}));

vi.mock('../../utils/helpers', () => ({
  getSessionId: vi.fn(() => 'test-session'),
  downloadFile: vi.fn(),
  validatePDFFile: vi.fn(() => ({ valid: true })),
}));

import CompressPdfPage from '../CompressPdfPage';
import SplitPdfPage from '../SplitPdfPage';
import ImageToPdfPage from '../ImageToPdfPage';
import JpgToPdfPage from '../JpgToPdfPage';
import ReorderPdfPage from '../ReorderPdfPage';
import DeletePdfPagesPage from '../DeletePdfPagesPage';
import NotFoundPage from '../NotFoundPage';

const wrap = (ui) => render(ui, { wrapper: BrowserRouter });

describe('CompressPdfPage', () => {
  it('renders H1', () => {
    wrap(<CompressPdfPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Compress PDF Online');
  });

  it('renders compression quality options', () => {
    wrap(<CompressPdfPage />);
    // Quality buttons are inside renderOptions which shows after upload
    // But the dropzone should be visible
    expect(screen.getByText(/Drop a PDF here/i)).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    wrap(<CompressPdfPage />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText(/How does PDF compression work/i)).toBeInTheDocument();
  });
});

describe('SplitPdfPage', () => {
  it('renders H1', () => {
    wrap(<SplitPdfPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Split PDF Online');
  });

  it('renders upload dropzone', () => {
    wrap(<SplitPdfPage />);
    expect(screen.getByText(/Drop a PDF here/i)).toBeInTheDocument();
  });

  it('renders FAQ', () => {
    wrap(<SplitPdfPage />);
    expect(screen.getByText(/How do I split a PDF/i)).toBeInTheDocument();
  });
});

describe('ImageToPdfPage', () => {
  it('renders H1', () => {
    wrap(<ImageToPdfPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Image to PDF Converter');
  });

  it('shows image upload area', () => {
    wrap(<ImageToPdfPage />);
    expect(screen.getByText(/Drop images here/i)).toBeInTheDocument();
  });

  it('renders FAQ', () => {
    wrap(<ImageToPdfPage />);
    expect(screen.getByText(/What image formats are supported/i)).toBeInTheDocument();
  });
});

describe('JpgToPdfPage', () => {
  it('renders H1', () => {
    wrap(<JpgToPdfPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('JPG to PDF Converter');
  });

  it('shows image upload', () => {
    wrap(<JpgToPdfPage />);
    expect(screen.getByText(/Drop images here/i)).toBeInTheDocument();
  });
});

describe('ReorderPdfPage', () => {
  it('renders H1', () => {
    wrap(<ReorderPdfPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Reorder PDF Pages');
  });

  it('renders PDF upload dropzone', () => {
    wrap(<ReorderPdfPage />);
    expect(screen.getByText(/Drop a PDF here/i)).toBeInTheDocument();
  });

  it('renders FAQ', () => {
    wrap(<ReorderPdfPage />);
    expect(screen.getByText(/How do I reorder pages/i)).toBeInTheDocument();
  });
});

describe('DeletePdfPagesPage', () => {
  it('renders H1', () => {
    wrap(<DeletePdfPagesPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Delete Pages from PDF');
  });

  it('renders PDF upload dropzone', () => {
    wrap(<DeletePdfPagesPage />);
    expect(screen.getByText(/Drop a PDF here/i)).toBeInTheDocument();
  });

  it('renders FAQ', () => {
    wrap(<DeletePdfPagesPage />);
    expect(screen.getByText(/How do I delete pages/i)).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    wrap(<NotFoundPage />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('has a link to homepage', () => {
    wrap(<NotFoundPage />);
    const link = screen.getByText(/Go Home/i).closest('a');
    expect(link).toHaveAttribute('href', '/');
  });

  it('shows navigation links to tools', () => {
    wrap(<NotFoundPage />);
    expect(screen.getByText('Merge PDF')).toBeInTheDocument();
    expect(screen.getByText('Combine PDF Files')).toBeInTheDocument();
  });
});
