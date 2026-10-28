import React, { useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AddMovieForm from "./components/AddMovieForm.jsx";
import Filter from "./components/Filter.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import MovieList from "./components/MovieList.jsx";
import { initialMovies } from "./data/movies.js";

export default function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [isAddingMovie, setIsAddingMovie] = useState(false);

  function addMovie(movie) {
    setMovies((currentMovies) => [
      { ...movie, id: crypto.randomUUID() },
      ...currentMovies,
    ]);
    setIsAddingMovie(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="bellamymovies home">
          <span className="brand-mark" aria-hidden="true">
            ▶
          </span>
          <span className="brand-name">bellamy<span>movies</span></span>
        </Link>
        <span className="topbar-note">A little collection of big stories</span>
        <button
          className="button button-primary topbar-add"
          onClick={() => setIsAddingMovie(true)}
        >
          <span aria-hidden="true">＋</span> Add a movie
        </button>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              onAddMovie={addMovie}
              isAddingMovie={isAddingMovie}
              onCloseAddMovie={() => setIsAddingMovie(false)}
            />
          }
        />
        <Route path="/movies/:movieId" element={<MovieDetails movies={movies} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer className="page-footer">
        <span>Made for movie nights.</span>
        <span>Keep the good ones close <span aria-hidden="true">✳</span></span>
      </footer>
    </main>
  );
}

function HomePage({ movies, onAddMovie, isAddingMovie, onCloseAddMovie }) {
  const [titleFilter, setTitleFilter] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);

  const filteredMovies = useMemo(() => {
    const normalizedTitle = titleFilter.trim().toLowerCase();
    return movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(normalizedTitle) &&
        movie.rating >= minimumRating,
    );
  }, [movies, titleFilter, minimumRating]);

  return (
    <>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> YOUR PERSONAL WATCHLIST</p>
          <h1>Stories worth<br />coming back to<span>.</span></h1>
          <p className="hero-description">
            Keep the films and shows you love, all in one place.
          </p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-disc"><span>▶</span></div>
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">✦</span>
          <span className="art-caption">your next<br />favorite thing</span>
        </div>
      </section>

      <section className="collection">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2>Your collection <span>{movies.length.toString().padStart(2, "0")}</span></h2>
          </div>
          <Filter
            title={titleFilter}
            onTitleChange={setTitleFilter}
            minimumRating={minimumRating}
            onRatingChange={setMinimumRating}
          />
        </div>
        <MovieList movies={filteredMovies} />
      </section>

      {isAddingMovie && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onCloseAddMovie();
          }}
        >
          <AddMovieForm
            onAddMovie={onAddMovie}
            onClose={onCloseAddMovie}
          />
        </div>
      )}
    </>
  );
}

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="eyebrow">NOT FOUND</p>
      <h1>This story isn't in your collection<span>.</span></h1>
      <Link className="button button-primary" to="/">Back to home</Link>
    </section>
  );
}
