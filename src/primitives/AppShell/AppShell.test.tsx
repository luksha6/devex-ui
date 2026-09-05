import { render, screen } from '@testing-library/react';
import { Nav } from '../Nav/Nav';
import { NavItem } from '../Nav/NavItem';
import { Text } from '../Text/Text';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('keeps the skip link first and names the sidebar', () => {
    const { container } = render(
      <AppShell
        nav={
          <Nav brand="Platform" links={[{ href: '#corpora', label: 'Corpora', current: true }]} />
        }
        sidebar={
          <>
            <NavItem href="#backoff" current>
              Backoff
            </NavItem>
            <NavItem href="#retries">Retries</NavItem>
          </>
        }
        rail={<Text variant="mono">tok 2,100</Text>}
      >
        <Text variant="section">Corpora</Text>
      </AppShell>,
    );
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    expect(container.firstChild?.firstChild).toBe(skip);
    expect(skip).toHaveAttribute('href', '#devex-main');
    expect(screen.getByRole('article')).toHaveAttribute('id', 'devex-main');
    expect(screen.getByRole('complementary', { name: 'Sections' })).toBeInTheDocument();
  });
});
