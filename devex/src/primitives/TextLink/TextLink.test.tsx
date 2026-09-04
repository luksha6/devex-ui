import { render, screen } from '@testing-library/react';
import { TextLink } from './TextLink';

describe('TextLink', () => {
  it('is a real anchor, not a button', () => {
    render(<TextLink href="/llms.txt">/llms.txt</TextLink>);
    expect(screen.getByRole('link', { name: '/llms.txt' })).toHaveAttribute('href', '/llms.txt');
  });
});
