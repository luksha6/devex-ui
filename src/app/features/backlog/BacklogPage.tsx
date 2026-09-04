import { useMemo, useState } from 'react';
import {
  Button,
  EmptyState,
  FriendActivityRow,
  GameCard,
  Pagination,
  PLATFORM_LABELS,
  PLATFORMS,
  SearchBar,
  StatCard,
  Tabs,
  useToast,
  type SelectOption,
} from '../../../design-system';
import { GameDetailModal } from './GameDetailModal';
import { PAGE_SIZE, friends } from './seed';
import type { Game, LibraryTab } from './types';
import { useGames } from './useGames';
import styles from './BacklogPage.module.css';

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'library', label: 'Library' },
  { id: 'backlog', label: 'Backlog' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'completed', label: 'Completed' },
];

const PLATFORM_OPTIONS: SelectOption[] = [
  { value: 'all', label: 'All platforms' },
  ...PLATFORMS.map((platform) => ({ value: platform, label: PLATFORM_LABELS[platform] })),
];

function matchesTab(game: Game, tab: LibraryTab): boolean {
  if (tab === 'library') {
    return game.status !== 'wishlist';
  }
  return game.status === tab;
}

export function BacklogPage() {
  const toast = useToast();
  const { games, achievements, genres, completeGame, rateGame } = useGames();
  const [tab, setTab] = useState<LibraryTab>('library');
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState('all');
  const [genre, setGenre] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const genreOptions: SelectOption[] = useMemo(
    () => [
      { value: 'all', label: 'All genres' },
      ...genres.map((item) => ({ value: item, label: item })),
    ],
    [genres],
  );

  const filtered = useMemo(() => {
    const query = keyword.trim().toLowerCase();
    return games.filter((game) => {
      if (!matchesTab(game, tab)) {
        return false;
      }
      if (platform !== 'all' && game.platform !== platform) {
        return false;
      }
      if (genre !== 'all' && game.genre !== genre) {
        return false;
      }
      if (query && !game.title.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });
  }, [games, genre, keyword, platform, tab]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const selectedGame = games.find((game) => game.id === selectedId) ?? null;
  const selectedAchievements = achievements.filter((item) => item.gameId === selectedId);

  const totalHours = games.reduce((sum, game) => sum + game.hoursPlayed, 0);
  const completedCount = games.filter((game) => game.status === 'completed').length;
  const backlogCount = games.filter((game) => game.status === 'backlog').length;

  function resetFilters() {
    setKeyword('');
    setPlatform('all');
    setGenre('all');
    setPage(1);
  }

  function handleComplete(id: string) {
    const result = completeGame(id);
    if (!result) {
      return;
    }
    toast({
      title: `Marked as completed: ${result.title}`,
      tone: 'success',
    });
    if (result.firstInGenre) {
      toast({
        title: `Achievement unlocked: ${result.genre} Pioneer`,
        description: `First completed ${result.genre} game in your library.`,
        tone: 'success',
      });
    }
  }

  const emptyCopy = {
    library: {
      title: 'No games match',
      message: 'Try a different keyword, platform, or genre.',
    },
    backlog: {
      title: 'Backlog is clear',
      message: 'Nothing waiting. Add a title, or loosen the filters.',
    },
    wishlist: {
      title: 'Wishlist is empty',
      message: 'No saved titles in this view. Clear filters to see the full list.',
    },
    completed: {
      title: 'No completed games',
      message: 'Finish a campaign and it will land here.',
    },
  }[tab];

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.kicker}>Personal library</p>
        <h1>What you are playing, finishing, and saving for later.</h1>
        <p className={styles.lede}>
          Hours, completion, and rarity-tiered achievements — the same four-band scale on every
          card.
        </p>
      </header>

      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.stats} aria-label="Library stats">
            <StatCard label="Total hours" value={totalHours} hint="Logged across the library" />
            <StatCard label="Games completed" value={completedCount} hint="Campaigns closed" />
            <StatCard label="In the backlog" value={backlogCount} hint="Owned, not started" />
          </section>

          <SearchBar
            keyword={keyword}
            platform={platform}
            genre={genre}
            platformOptions={PLATFORM_OPTIONS}
            genreOptions={genreOptions}
            onKeywordChange={(value) => {
              setKeyword(value);
              setPage(1);
            }}
            onPlatformChange={(value) => {
              setPlatform(value);
              setPage(1);
            }}
            onGenreChange={(value) => {
              setGenre(value);
              setPage(1);
            }}
            onSubmit={() => setPage(1)}
          >
            <SearchBar.Keyword placeholder="Search by title" />
            <SearchBar.Platform />
            <SearchBar.Genre />
            <SearchBar.Submit>Filter</SearchBar.Submit>
          </SearchBar>

          <Tabs
            tabs={TABS}
            value={tab}
            onChange={(id) => {
              setTab(id as LibraryTab);
              setPage(1);
            }}
            aria-label="Library views"
          />

          {pageItems.length === 0 ? (
            <EmptyState
              title={emptyCopy.title}
              message={emptyCopy.message}
              action={
                <Button intent="secondary" onClick={resetFilters}>
                  Clear filters
                </Button>
              }
            />
          ) : (
            <>
              <div className={styles.grid}>
                {pageItems.map((game) => (
                  <GameCard
                    key={game.id}
                    title={game.title}
                    platform={game.platform}
                    hoursPlayed={game.hoursPlayed}
                    completion={game.completion}
                    rating={game.status === 'completed' ? game.rating : null}
                    onClick={() => setSelectedId(game.id)}
                  />
                ))}
              </div>
              <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
            </>
          )}
        </div>

        <aside className={styles.aside} aria-labelledby="friends-heading">
          <h2 id="friends-heading" className={styles.asideTitle}>
            Friends
          </h2>
          <div className={styles.friends}>
            {friends.map((friend) => (
              <FriendActivityRow
                key={friend.id}
                name={friend.name}
                gameTitle={friend.gameTitle}
                online={friend.online}
                action={friend.action}
              />
            ))}
          </div>
        </aside>
      </div>

      <GameDetailModal
        game={selectedGame}
        achievements={selectedAchievements}
        onClose={() => setSelectedId(null)}
        onComplete={handleComplete}
        onRate={rateGame}
      />
    </div>
  );
}
