import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

const platformOptions = [
  { value: 'all', label: 'All platforms' },
  { value: 'pc', label: 'PC' },
];

const genreOptions = [
  { value: 'all', label: 'All genres' },
  { value: 'rpg', label: 'RPG' },
];

function Example({ onSubmit = vi.fn() }: { onSubmit?: (values: unknown) => void }) {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('all');
  const [genre, setGenre] = useState('all');

  return (
    <SearchBar
      keyword={keyword}
      platform={platform}
      genre={genre}
      platformOptions={platformOptions}
      genreOptions={genreOptions}
      onKeywordChange={setKeyword}
      onPlatformChange={setPlatform}
      onGenreChange={setGenre}
      onSubmit={onSubmit}
    >
      <SearchBar.Keyword />
      <SearchBar.Platform />
      <SearchBar.Genre />
      <SearchBar.Submit />
    </SearchBar>
  );
}

describe('SearchBar', () => {
  it('renders keyword, platform, and genre as one search landmark', () => {
    render(<Example />);
    expect(screen.getByRole('search')).toBeInTheDocument();
    expect(screen.getByLabelText('Keyword')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /platform/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /genre/i })).toBeInTheDocument();
  });

  it('submits the current compound values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Example onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText('Keyword'), 'Hades');
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(onSubmit).toHaveBeenCalledWith({
      keyword: 'Hades',
      platform: 'all',
      genre: 'all',
    });
  });
});
