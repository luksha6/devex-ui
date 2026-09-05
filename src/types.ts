export type Lifecycle = 'stable' | 'beta' | 'deprecated' | 'internal';

export type Audience = 'human' | 'agent';

export type CalloutKind = 'note' | 'caution' | 'agent-only';

export type ButtonIntent = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ControlSize = 'sm' | 'md' | 'lg';

export type ButtonSize = ControlSize;

export type ButtonFill = 'filled' | 'outline';

export type AlertKind = 'note' | 'ok' | 'caution' | 'critical';

export type ToolCallStatus = 'queued' | 'running' | 'ok' | 'fail';

export type RunPhase = 'pending' | 'running' | 'ok' | 'fail';

export type StreamUncertainty = 'none' | 'low' | 'high';

export type IconName =
  | 'check'
  | 'close'
  | 'search'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-right'
  | 'caution'
  | 'info'
  | 'plus'
  | 'minus'
  | 'copy'
  | 'external'
  | 'menu'
  | 'calendar'
  | 'upload';
