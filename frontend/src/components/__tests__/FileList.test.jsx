import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FileList from '../FileList';

const mockFiles = [
  {
    file_id: 'file-1',
    original_filename: 'document.pdf',
    page_count: 5,
    file_size: 1024000,
    file_size_formatted: '1 MB',
  },
  {
    file_id: 'file-2',
    original_filename: 'report.pdf',
    page_count: 12,
    file_size: 2048000,
    file_size_formatted: '2 MB',
  },
];

describe('FileList', () => {
  it('renders empty state when no files', () => {
    render(
      <FileList files={[]} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId={null} />
    );
    expect(screen.getByText('No files uploaded yet')).toBeInTheDocument();
    expect(screen.getByText('Upload PDF files to get started')).toBeInTheDocument();
  });

  it('renders file names', () => {
    render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId={null} />
    );
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
  });

  it('renders page counts', () => {
    render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId={null} />
    );
    expect(screen.getByText('5 pages')).toBeInTheDocument();
    expect(screen.getByText('12 pages')).toBeInTheDocument();
  });

  it('renders file sizes', () => {
    render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId={null} />
    );
    expect(screen.getByText('1 MB')).toBeInTheDocument();
    expect(screen.getByText('2 MB')).toBeInTheDocument();
  });

  it('calls onSelectFile when file is clicked', async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={onSelect} selectedFileId={null} />
    );

    await user.click(screen.getByText('document.pdf'));
    expect(onSelect).toHaveBeenCalledWith('file-1');
  });

  it('calls onDeleteFile when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <FileList files={mockFiles} onDeleteFile={onDelete} onSelectFile={() => {}} selectedFileId={null} />
    );

    const deleteButtons = screen.getAllByTitle('Delete file');
    await user.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith('file-1');
  });

  it('highlights selected file', () => {
    const { container } = render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId="file-1" />
    );
    const selectedCard = container.querySelector('.border-primary-500');
    expect(selectedCard).toBeTruthy();
  });

  it('has aria-label on delete buttons', () => {
    render(
      <FileList files={mockFiles} onDeleteFile={() => {}} onSelectFile={() => {}} selectedFileId={null} />
    );
    expect(screen.getByLabelText('Delete document.pdf')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete report.pdf')).toBeInTheDocument();
  });
});
