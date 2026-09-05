const ALLOWED = new Set(['http:', 'https:', 'mailto:', 'tel:']);

export function isSafeHref(href: string): boolean {
  const value = href.trim();
  if (value === '' || value.startsWith('#')) {
    return true;
  }
  if (value.startsWith('/') && !value.startsWith('//')) {
    return true;
  }
  if (value.startsWith('./') || value.startsWith('../')) {
    return true;
  }
  try {
    return ALLOWED.has(new URL(value).protocol);
  } catch {
    return false;
  }
}

export function isSafeImageSrc(src: string): boolean {
  const value = src.trim();
  if (value.startsWith('data:image/')) {
    return true;
  }
  if (value.startsWith('data:')) {
    return false;
  }
  return (
    isSafeHref(value) &&
    !value.toLowerCase().startsWith('mailto:') &&
    !value.toLowerCase().startsWith('tel:')
  );
}
