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

  it('answers are hidden (collapsed) initially', () => {
    renderWithRouter(<FAQSection items={mockItems} />);
    // With CSS grid animation the text is in the DOM but visually hidden
    const btn = screen.getByText('Is this free?').closest('button');
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands answer when question is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FAQSection items={mockItems} />);

    const btn = screen.getByText('Is this free?').closest('button');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses answer when clicked again', async () => {
    const user = userEvent.setup();
    renderWithRouter(<FAQSection items={mockItems} />);

    const btn = screen.getByText('Is this free?').closest('button');
    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');

    await user.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders with empty items array', () => {
    renderWithRouter(<FAQSection items={[]} />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
  });
});
