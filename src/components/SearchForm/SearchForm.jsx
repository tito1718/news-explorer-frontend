import "./SearchForm.css";

function SearchForm() {
  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        name="keyword"
        placeholder="Enter topic"
        aria-label="Enter a news topic"
        required
      />
      <button className="search-form__button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
