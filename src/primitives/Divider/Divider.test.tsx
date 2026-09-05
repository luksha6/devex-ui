import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('is a separator', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('[role="separator"], hr')).toBeTruthy();
  });

  it('names a vertical rule', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const rule = container.querySelector('[role="separator"]');
    expect(rule).toHaveAttribute('aria-orientation', 'vertical');
  });
});
