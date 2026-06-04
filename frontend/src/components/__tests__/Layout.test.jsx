import { describe, it, expect } from 'vitest';
import { renderWithRouter, screen } from '../../test/test-utils';
import Layout from '../Layout';

describe('Layout', () => {
  it('renders children content', () => {
    renderWithRouter(<Layout><div>Child Content</div></Layout>);
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders the brand name in header', () => {
    renderWithRouter(<Layout><div /></Layout>);
    expect(screen.getByText('DOSIBridge PDF Joiner')).toBeInTheDocument();
  });

  it('renders the skip-to-content link', () => {
    renderWithRouter(<Layout><div /></Layout>);
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });

  it('renders the main element with id', () => {
    renderWithRouter(<Layout><div /></Layout>);
    expect(document.getElementById('main-content')).toBeTruthy();
  });

  it('renders footer with tool links', () => {
    renderWithRouter(<Layout><div /></Layout>);
    expect(screen.getByText('Merge PDF')).toBeInTheDocument();
    expect(screen.getByText('Compress PDF')).toBeInTheDocument();
  });

  it('renders footer with DOSIBridge external links', () => {
    renderWithRouter(<Layout><div /></Layout>);
    const homepageLink = screen.getByText('Homepage');
    expect(homepageLink.closest('a')).toHaveAttribute('href', 'https://dosibridge.com');
  });

  it('has banner role on header', () => {
    renderWithRouter(<Layout><div /></Layout>);
    expect(document.querySelector('[role="banner"]')).toBeTruthy();
  });

  it('renders home link on brand name', () => {
    renderWithRouter(<Layout><div /></Layout>);
    const brandLink = screen.getByText('DOSIBridge PDF Joiner').closest('a');
    expect(brandLink).toHaveAttribute('href', '/');
  });
});
