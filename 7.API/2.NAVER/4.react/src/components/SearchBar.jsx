export default function SearchBar({ onSearch, setQuery }) {

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        onChange={e => setQuery(e.target.value)}
      />
      <button>검색</button>
    </form>
  )
}
