import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter, screen } from '../test/test-utils';
import App from '../App';

// Mock PdfTool since it requires API context
vi.mock('../components/PdfTool', () => ({
  default: () => <div data-testid="pdf-tool">PDF Tool</div>,
}));

describe('App Routing', () => {
  it('renders homepage at /', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('Merge PDF Files Online for Free')).toBeInTheDocument();
  });

  it('renders merge-pdf page', () => {
    renderWithRouter(<App />, { route: '/merge-pdf' });
    expect(screen.getByText('Merge PDF Files Online')).toBeInTheDocument();
  });

  it('renders pdf-joiner page', () => {
    renderWithRouter(<App />, { route: '/pdf-joiner' });
    expect(screen.getByRole('heading', { level: 1, name: /PDF Joiner/ })).toBeInTheDocument();
  });

  it('renders combine-pdf-files page', () => {
    renderWithRouter(<App />, { route: '/combine-pdf-files' });
    expect(screen.getByText('Combine PDF Files Into One Document')).toBeInTheDocument();
  });

  it('renders merge-pdf-online-free page', () => {
    renderWithRouter(<App />, { route: '/merge-pdf-online-free' });
    expect(screen.getByText(/Merge PDF Online Free/)).toBeInTheDocument();
  });

  it('renders merge-pdf-no-watermark page', () => {
    renderWithRouter(<App />, { route: '/merge-pdf-no-watermark' });
    expect(screen.getByText('Merge PDF Without Watermark')).toBeInTheDocument();
  });

  it('renders merge-pdf-on-mobile page', () => {
    renderWithRouter(<App />, { route: '/merge-pdf-on-mobile' });
    expect(screen.getByText('Merge PDF on Mobile')).toBeInTheDocument();
  });

  it('renders job application page', () => {
    renderWithRouter(<App />, { route: '/merge-pdf-for-job-application' });
    expect(screen.getByText('Merge PDF for Job Application')).toBeInTheDocument();
  });

  it('renders CV certificates page', () => {
    renderWithRouter(<App />, { route: '/combine-cv-and-certificates-pdf' });
    expect(screen.getByText('Combine CV and Certificates into One PDF')).toBeInTheDocument();
  });

  it('renders university documents page', () => {
    renderWithRouter(<App />, { route: '/merge-university-documents-pdf' });
    expect(screen.getByText('Merge University Documents into One PDF')).toBeInTheDocument();
  });

  it('renders scanned documents page', () => {
    renderWithRouter(<App />, { route: '/merge-scanned-documents-pdf' });
    expect(screen.getByText('Merge Scanned Documents into One PDF')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderWithRouter(<App />, { route: '/nonexistent-page' });
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders blog how-to-merge page', () => {
    renderWithRouter(<App />, { route: '/blog/how-to-merge-pdf-files-online' });
    expect(screen.getByText('How to Merge PDF Files Online')).toBeInTheDocument();
  });

  it('renders blog how-to-reorder page', () => {
    renderWithRouter(<App />, { route: '/blog/how-to-reorder-pdf-before-merging' });
    expect(screen.getByText('How to Reorder PDF Pages Before Merging')).toBeInTheDocument();
  });

  it('renders coming soon pages with placeholder', () => {
    renderWithRouter(<App />, { route: '/compress-pdf' });
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Compress PDF Online')).toBeInTheDocument();
  });

  it('renders split-pdf coming soon page', () => {
    renderWithRouter(<App />, { route: '/split-pdf' });
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('Split PDF Online')).toBeInTheDocument();
  });

  // Verify layout is always present
  it('always shows header brand', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('DOSIBridge PDF Joiner')).toBeInTheDocument();
  });

  it('always shows footer', () => {
    renderWithRouter(<App />, { route: '/merge-pdf' });
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('Free online PDF merge tool');
  });

  it('renders the PDF tool on tool pages', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByTestId('pdf-tool')).toBeInTheDocument();
  });
});
