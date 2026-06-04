import { describe, it, expect, vi } from 'vitest';
import { renderWithRouter, screen } from '../test/test-utils';
import App from '../App';

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

  it('redirects /pdf-joiner to /merge-pdf', () => {
    renderWithRouter(<App />, { route: '/pdf-joiner' });
    // Should show merge-pdf content after redirect
    expect(screen.getByText('Merge PDF Files Online')).toBeInTheDocument();
  });

  it('redirects /combine-pdf-files to /merge-pdf', () => {
    renderWithRouter(<App />, { route: '/combine-pdf-files' });
    expect(screen.getByText('Merge PDF Files Online')).toBeInTheDocument();
  });

  it('redirects /jpg-to-pdf to /image-to-pdf', () => {
    renderWithRouter(<App />, { route: '/jpg-to-pdf' });
    expect(screen.getByText('Image to PDF Converter')).toBeInTheDocument();
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

  it('renders 404 page for unknown routes', () => {
    renderWithRouter(<App />, { route: '/nonexistent-page' });
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders compress-pdf tool page', () => {
    renderWithRouter(<App />, { route: '/compress-pdf' });
    expect(screen.getByText('Compress PDF Online')).toBeInTheDocument();
  });

  it('renders split-pdf tool page', () => {
    renderWithRouter(<App />, { route: '/split-pdf' });
    expect(screen.getByText('Split PDF Online')).toBeInTheDocument();
  });

  it('renders image-to-pdf tool page', () => {
    renderWithRouter(<App />, { route: '/image-to-pdf' });
    expect(screen.getByText('Image to PDF Converter')).toBeInTheDocument();
  });

  it('renders reorder-pdf tool page', () => {
    renderWithRouter(<App />, { route: '/reorder-pdf' });
    expect(screen.getByText('Reorder PDF Pages')).toBeInTheDocument();
  });

  it('renders delete-pdf-pages tool page', () => {
    renderWithRouter(<App />, { route: '/delete-pdf-pages' });
    expect(screen.getByText('Delete Pages from PDF')).toBeInTheDocument();
  });

  it('always shows header brand', () => {
    renderWithRouter(<App />, { route: '/' });
    expect(screen.getByText('DOSIBridge PDF Joiner')).toBeInTheDocument();
  });

  it('always shows footer', () => {
    renderWithRouter(<App />, { route: '/merge-pdf' });
    const footer = document.querySelector('footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('DOSIBridge PDF Joiner');
  });
});
