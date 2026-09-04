import { render, screen } from '@testing-library/react';
import { ToolCall } from './ToolCall';

describe('ToolCall', () => {
  it('exposes the tool name and running status', () => {
    render(
      <ToolCall name="corpus.status" status="running" args="id=knowledge-prod" latencyMs={42} />,
    );
    expect(screen.getByText('corpus.status')).toBeInTheDocument();
    expect(screen.getByText('Running')).toBeInTheDocument();
    expect(screen.getByText('42ms')).toBeInTheDocument();
  });

  it('names fail in type, not color alone', () => {
    render(<ToolCall name="corpus.cutover" status="fail" result="replica lag 32s" />);
    expect(screen.getByText('Fail')).toBeInTheDocument();
    expect(screen.getByText('replica lag 32s')).toBeInTheDocument();
  });
});
