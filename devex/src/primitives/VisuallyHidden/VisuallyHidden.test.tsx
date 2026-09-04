import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('keeps the text in the document', () => {
    render(<VisuallyHidden>Skip to content</VisuallyHidden>);
    expect(screen.getByText('Skip to content')).toBeInTheDocument();
  });
});
