import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MergeOptions from '../MergeOptions';

const defaultOptions = {
  output_filename: 'merged.pdf',
  add_page_numbers: false,
  watermark_text: '',
  password: '',
};

describe('MergeOptions', () => {
  it('renders the title', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    expect(screen.getByText('Merge Options')).toBeInTheDocument();
  });

  it('renders output filename input with default value', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    const input = screen.getByPlaceholderText('merged.pdf');
    expect(input).toHaveValue('merged.pdf');
  });

  it('calls onOptionsChange when filename changes', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MergeOptions options={defaultOptions} onOptionsChange={onChange} />);

    const input = screen.getByPlaceholderText('merged.pdf');
    await user.clear(input);
    await user.type(input, 'report.pdf');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders page numbers toggle as switch', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('toggles page numbers on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MergeOptions options={defaultOptions} onOptionsChange={onChange} />);

    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ add_page_numbers: true })
    );
  });

  it('renders watermark input', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    expect(screen.getByPlaceholderText('Enter watermark text')).toBeInTheDocument();
  });

  it('renders password input', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
  });

  it('shows helper text for password', () => {
    render(<MergeOptions options={defaultOptions} onOptionsChange={() => {}} />);
    expect(screen.getByText('Leave empty for no password protection')).toBeInTheDocument();
  });
});
