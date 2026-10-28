import React, { useState } from "react";

const emptyMovie = {
  title: "",
  description: "",
  posterURL: "",
  rating: "4.0",
};

export default function AddMovieForm({ onAddMovie, onClose }) {
  const [movie, setMovie] = useState(emptyMovie);

  function updateField(event) {
    const { name, value } = event.target;
    setMovie((currentMovie) => ({ ...currentMovie, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddMovie({ ...movie, rating: Number(movie.rating) });
  }

  return (
    <form className="add-movie-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">MAKE IT A FAVORITE</p>
          <h2>Add to your collection</h2>
        </div>
        <button
          className="icon-button close-button"
          type="button"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>
      </div>
      <label>
        Title
        <input
          name="title"
          value={movie.title}
          onChange={updateField}
          placeholder="e.g. The Holdovers"
          required
          maxLength={100}
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={movie.description}
          onChange={updateField}
          placeholder="What makes it worth watching?"
          required
          maxLength={400}
          rows={3}
        />
      </label>
      <label>
        Poster image URL
        <input
          name="posterURL"
          type="url"
          value={movie.posterURL}
          onChange={updateField}
          placeholder="https://example.com/poster.jpg"
          required
        />
      </label>
      <label>
        Your rating <span className="label-hint">(out of 5)</span>
        <input
          name="rating"
          type="number"
          value={movie.rating}
          onChange={updateField}
          min="0"
          max="5"
          step="0.1"
          required
        />
      </label>
      <div className="form-actions">
        <button className="button button-quiet" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="button button-primary" type="submit">
          Add movie <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
