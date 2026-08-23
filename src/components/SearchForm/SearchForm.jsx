import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, searchKeyword }) {
  const [keyword, setKeyword] = useState(searchKeyword || "");
  const [error, setError] = useState("");

  function handleChange(event) {
    setKeyword(event.target.value);

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(trimmedKeyword);
  }

  return (
    <form className="search-form" noValidate onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        name="keyword"
        value={keyword}
        placeholder="Enter topic"
        aria-label="Enter a news topic"
        aria-invalid={Boolean(error)}
        aria-describedby="search-keyword-error"
        onChange={handleChange}
      />

      <button className="search-form__button" type="submit">
        Search
      </button>

      <span
        className="search-form__error"
        id="search-keyword-error"
        role="alert"
      >
        {error}
      </span>
    </form>
  );
}

export default SearchForm;
