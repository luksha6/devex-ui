import { render, screen } from '@testing-library/react';
import { Page } from './Page';

describe('Page', () => {
  it('keeps the article as the reading unit', () => {
    render(
      <Page nav={<p>Nav</p>} rail={<p>tok 2,100</p>}>
        <h1>Backoff policy</h1>
      </Page>,
    );
    expect(screen.getByRole('article')).toHaveTextContent('Backoff policy');
    expect(screen.getByRole('article')).toHaveAttribute('id', 'devex-main');
    expect(screen.getByRole('link', { name: 'Skip to content' })).toHaveAttribute(
      'href',
      '#devex-main',
    );
    expect(screen.getByRole('complementary')).toHaveTextContent('tok 2,100');
  });
});
