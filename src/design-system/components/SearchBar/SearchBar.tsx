import { createContext, useContext, type FormEvent, type ReactNode } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Select, type SelectOption } from '../Select/Select';
import { cx } from '../../utils/cx';
import styles from './SearchBar.module.css';

export interface SearchBarValues {
  keyword: string;
  platform: string;
  genre: string;
}

interface SearchBarContextValue extends SearchBarValues {
  platformOptions: readonly SelectOption[];
  genreOptions: readonly SelectOption[];
  onKeywordChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onGenreChange: (value: string) => void;
}

const SearchBarContext = createContext<SearchBarContextValue | null>(null);

function useSearchBarContext(): SearchBarContextValue {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error('SearchBar compound parts must be rendered inside SearchBar');
  }
  return context;
}

export interface SearchBarProps extends SearchBarValues {
  children: ReactNode;
  platformOptions: readonly SelectOption[];
  genreOptions: readonly SelectOption[];
  onKeywordChange: (value: string) => void;
  onPlatformChange: (value: string) => void;
  onGenreChange: (value: string) => void;
  onSubmit: (values: SearchBarValues) => void;
  className?: string;
}

function SearchBarRoot({
  children,
  keyword,
  platform,
  genre,
  platformOptions,
  genreOptions,
  onKeywordChange,
  onPlatformChange,
  onGenreChange,
  onSubmit,
  className,
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ keyword, platform, genre });
  }

  return (
    <SearchBarContext.Provider
      value={{
        keyword,
        platform,
        genre,
        platformOptions,
        genreOptions,
        onKeywordChange,
        onPlatformChange,
        onGenreChange,
      }}
    >
      <form className={cx(styles.form, className)} onSubmit={handleSubmit} role="search">
        {children}
      </form>
    </SearchBarContext.Provider>
  );
}

function Keyword({ placeholder = 'Search by title' }: { placeholder?: string }) {
  const { keyword, onKeywordChange } = useSearchBarContext();
  return (
    <Input
      label="Keyword"
      value={keyword}
      onChange={(event) => onKeywordChange(event.target.value)}
      placeholder={placeholder}
    />
  );
}

function Platform() {
  const { platform, platformOptions, onPlatformChange } = useSearchBarContext();
  return (
    <Select
      label="Platform"
      options={platformOptions}
      value={platform}
      onChange={onPlatformChange}
    />
  );
}

function Genre() {
  const { genre, genreOptions, onGenreChange } = useSearchBarContext();
  return <Select label="Genre" options={genreOptions} value={genre} onChange={onGenreChange} />;
}

function Submit({ children = 'Filter' }: { children?: ReactNode }) {
  return (
    <Button type="submit" intent="primary">
      {children}
    </Button>
  );
}

export const SearchBar = Object.assign(SearchBarRoot, {
  Keyword,
  Platform,
  Genre,
  Submit,
});
