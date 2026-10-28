import React from "react";

export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <div className="movie-poster">
        <img src={movie.posterURL} alt={`${movie.title} poster`} loading="lazy" />
        <span className="rating-badge" aria-label={`Rated ${movie.rating} out of 5`}>
          <span aria-hidden="true">★</span> {movie.rating.toFixed(1)}
        </span>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </article>
  );
}
