import { render, screen } from '@testing-library/react';
import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('is a real anchor, not a button', () => {
    render(<TextLink href="/llms.txt">/llms.txt</TextLink>);
    expect(screen.getByRole('link', { name: '/llms.txt' })).toHaveAttribute('href', '/llms.txt');
  });

  it('does not keep an unsafe href', () => {
    render(<TextLink href="javascript:alert(1)">Open</TextLink>);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Open')).not.toHaveAttribute('href');
  });

  it('renders a custom element for a router link', () => {
    render(
      <TextLink as="span" href="/docs">
        Docs
      </TextLink>,
    );
    expect(screen.getByText('Docs').tagName).toBe('SPAN');
    expect(screen.getByText('Docs')).toHaveAttribute('href', '/docs');
  });

  it('adds rel when the link opens a new tab', () => {
    render(
      <TextLink href="https://example.com" target="_blank">
        Docs
      </TextLink>,
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
  });
});
