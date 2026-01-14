import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import searchNaverBlog from './api/naverBlogApi';

function App() {
  const [query, setQuery] = useState(''); // 검색어를 저장할 상태 변수
  const [results, setResults] = useState([]); // 검색 결과 저장

  const handleSearch = async (nextQuery) => {
    // e.preventDefault();
    setQuery(nextQuery);
    // console.log('haha');

    // useEffect(() => {
    //   search({ query, setResults });
    // }, []);

    try {
      const data = searchNaverBlog({ nextQuery });

      setResults(data.items);
    } catch (err) {
      console.log(err);
    }
    /* 
        try {
          const res = await fetch(`http://127.0.0.1:3000/api/search?query=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.items);
        } catch (err) {
          console.error(err);
        }
         */
  };

  return (
    <div>
      <h1>Naver Blog 검색</h1>

      <SearchBar onSearch={handleSearch} setQuery={setQuery} />
      {/* 결과창 */}
      <SearchResults results={results} />

    </div >
  )
  /* 
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            onChange={e => setQuery(e.target.value)}
          />
          <button>검색</button>
        </form>
         
        <ul>
          {results.map((item, index) => (
            <li key={index}>
              <a href={item.link} target="_blank"><h5>{item.title}</h5></a>
              <p>{item.description}</p>
              <small>{item.postdate}</small>
            </li>
          ))}
        </ul>
     */
}

export default App;
