import { describe, it, expect } from 'vitest';
import { renderWithRouter, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import FAQSection from '../FAQSection';

const mockItems = [
  { question: 'Is this free?', answer: 'Yes, completely free.' },
  { question: 'Does it add watermarks?', answer: 'No watermarks ever.' },
];

describe('FAQSection', () => {
  it('renders the default title', () => {
    renderWithRouter(<FAQSection items={mockItems} />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    renderWithRouter(<FAQSection items={mockItems} title="PDF FAQ" />);
    expect(screen.getByText('PDF FAQ')).toBeInTheDocument();
  });

  it('renders all questions', () => {
    renderWithRouter(<FAQSection items={mockItems} />);
    expect(screen.getByText('Is this free?')).toBeInTheDocument();
    expect(screen.getByText('Does it add watermarks?')).toBeInTheDocument();
  });

  it('does not show answers initially', () => {
    renderWithRouter(<FAQSection items={mockItems} />);
    expect(screen.queryByText('Yes, completely free.')).not.toBeInTheDocument();
  });

  it('shows answer when question is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FAQSection items={mockItems} />);

    await user.click(screen.getByText('Is this free?'));
    expect(screen.getByText('Yes, completely free.')).toBeInTheDocument();
  });

  it('hides answer when clicked again', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FAQSection items={mockItems} />);

    await user.click(screen.getByText('Is this free?'));
    expect(screen.getByText('Yes, completely free.')).toBeInTheDocument();

    await user.click(screen.getByText('Is this free?'));
    expect(screen.queryByText('Yes, completely free.')).not.toBeInTheDocument();
  });

  it('renders with empty items array', () => {
    renderWithRouter(<FAQSection items={[]} />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });
});
