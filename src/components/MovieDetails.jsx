import React from "react";
import { Link, useParams } from "react-router-dom";

export default function MovieDetails({ movies }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => String(item.id) === movieId);

  if (!movie) {
    return (
      <section className="not-found-page">
        <p className="eyebrow">NOT FOUND</p>
        <h1>This story isn't in your collection<span>.</span></h1>
        <Link className="button button-primary" to="/">Back to home</Link>
      </section>
    );
  }

  return (
    <section className="movie-details">
      <Link className="back-link" to="/">
        <span aria-hidden="true">←</span> Back to home
      </Link>
      <div className="movie-details-content">
        <div className="movie-details-copy">
          <p className="eyebrow">YOUR COLLECTION</p>
          <h1>{movie.title}<span>.</span></h1>
          <p className="details-rating">
            <span aria-hidden="true">★</span> {movie.rating.toFixed(1)} / 5
          </p>
          <h2>About this story</h2>
          <p className="details-description">{movie.description}</p>
        </div>
        <div className="trailer-section">
          <h2>Watch the trailer</h2>
          <div className="trailer-frame">
            <iframe
              src={movie.trailerURL}
              title={`${movie.title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
