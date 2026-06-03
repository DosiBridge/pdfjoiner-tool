import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DownloadManager from '../DownloadManager';

vi.mock('../services/api', () => ({
  pdfAPI: {
    getJobStatus: vi.fn(),
    getDownloadUrl: vi.fn(() => 'http://test/download'),
  },
}));

describe('DownloadManager', () => {
  it('renders nothing when no jobId', () => {
    const { container } = render(
      <DownloadManager jobId={null} onComplete={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('shows processing state initially', () => {
    render(<DownloadManager jobId="job-1" onComplete={() => {}} />);
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.getByText('Merging your PDFs')).toBeInTheDocument();
  });
});
