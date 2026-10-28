import React from "react";

export default function Filter({
  title,
  onTitleChange,
  minimumRating,
  onRatingChange,
}) {
  return (
    <section className="filter-bar" aria-label="Filter movies">
      <label className="search-field">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <span className="sr-only">Search by title</span>
        <input
          type="search"
          placeholder="Search titles..."
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </label>
      <label className="rating-filter">
        <span>Rating</span>
        <select
          value={minimumRating}
          onChange={(event) => onRatingChange(Number(event.target.value))}
        >
          <option value={0}>All ratings</option>
          <option value={3}>3+ stars</option>
          <option value={4}>4+ stars</option>
          <option value={4.5}>4.5+ stars</option>
        </select>
      </label>
    </section>
  );
}
