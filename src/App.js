import { useState } from "react";
import { Logo, Search, NumResults, NavBar } from "./Components/1-Navbar";
import { MovieList } from "./Components/2-MovieList";
import { WatchedSummary } from "./Components/5-WatchedSummary";
import { WatchedMovieList } from "./Components/6-WatchedMovieList";
import { MovieDetails } from "./Components/4-MovieDetails";
import { useMovies } from "./Components/7-useMovies";
import { useLocalStorageState } from "./Components/8-useLocalStorageState";

//-------------------------------------------------------------------------------------

export function Loader() {
  return <p className="loader">Loading...</p>;
}
//-------------------------------------------------------------------------------------

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

//-------------------------------------------------------------------------------------

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

//-------------------------------------------------------------------------------------

function Main({ children }) {
  return <main className="main">{children}</main>;
}

//-------------------------------------------------------------------------------------

export default function App() {
  //* STATE HOOKS :
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  //* Functions :

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
//-------------------------------------------------------------------------------------
