import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageReorderer from '../PageReorderer';

vi.mock('../../services/api', () => ({
  pdfAPI: {
    getThumbnailUrl: vi.fn(() => 'http://test/thumb.jpg'),
  },
}));

const mockPages = [
  { fileId: 'f1', pageNumber: 1, filename: 'doc.pdf' },
  { fileId: 'f1', pageNumber: 2, filename: 'doc.pdf' },
  { fileId: 'f2', pageNumber: 1, filename: 'report.pdf' },
];

describe('PageReorderer', () => {
  it('shows empty state when no pages', () => {
    render(
      <PageReorderer pages={[]} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByText('No pages selected')).toBeInTheDocument();
    expect(screen.getByText(/Select pages from your PDFs/i)).toBeInTheDocument();
  });

  it('renders page count', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByText('Selected Pages (3)')).toBeInTheDocument();
  });

  it('shows drag instruction', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByText('Drag to reorder')).toBeInTheDocument();
  });

  it('renders page filenames', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getAllByText('doc.pdf')).toHaveLength(2);
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
  });

  it('renders page number labels', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    // Page numbers are rendered as "Page {n}" inside <p> tags
    const pageLabels = screen.getAllByText(/^Page \d+$/);
    expect(pageLabels.length).toBeGreaterThanOrEqual(3);
  });

  it('calls onRemove with correct index when remove button clicked', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={onRemove} sessionId="s1" />
    );

    const removeButtons = screen.getAllByTitle('Remove page');
    await user.click(removeButtons[1]); // remove second page
    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it('has aria-labels on remove buttons', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByLabelText('Remove page 1 from doc.pdf')).toBeInTheDocument();
    expect(screen.getByLabelText('Remove page 1 from report.pdf')).toBeInTheDocument();
  });

  it('has aria-labels on drag handles', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByLabelText(/Drag to reorder page 1 from doc.pdf/)).toBeInTheDocument();
  });

  it('renders order numbers', () => {
    render(
      <PageReorderer pages={mockPages} onReorder={() => {}} onRemove={() => {}} sessionId="s1" />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
