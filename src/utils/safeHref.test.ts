import { isSafeHref, isSafeImageSrc } from './safeHref';

describe('isSafeHref', () => {
  it('allows http, relative, hash, mailto', () => {
    expect(isSafeHref('https://example.com/docs')).toBe(true);
    expect(isSafeHref('/docs')).toBe(true);
    expect(isSafeHref('./docs')).toBe(true);
    expect(isSafeHref('#backoff')).toBe(true);
    expect(isSafeHref('mailto:ops@example.com')).toBe(true);
  });

  it('rejects script and protocol-relative urls', () => {
    expect(isSafeHref('javascript:alert(1)')).toBe(false);
    expect(isSafeHref('//evil.example/x')).toBe(false);
    expect(isSafeHref('data:text/html,hi')).toBe(false);
  });
});

describe('isSafeImageSrc', () => {
  it('allows http, relative, and image data', () => {
    expect(isSafeImageSrc('/backoff.svg')).toBe(true);
    expect(isSafeImageSrc('https://cdn.example/a.png')).toBe(true);
    expect(isSafeImageSrc('data:image/png;base64,aaaa')).toBe(true);
  });

  it('rejects script and non-image data', () => {
    expect(isSafeImageSrc('javascript:alert(1)')).toBe(false);
    expect(isSafeImageSrc('data:text/html,hi')).toBe(false);
  });
});
