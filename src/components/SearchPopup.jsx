import "./scss/SearchPopup.scss";
import { useProductStore } from "../store/ProductStore";
import { useNavigate } from "react-router-dom";

const SearchPopup = () => {
  const {
    searchWord,
    setSearchWord,
    closeSearch,
    addRecentSearch,
    recentSearch,
    clearRecentSearch,
    deleteOneRecentSearch,
  } = useProductStore();

  const navigate = useNavigate();

  const handleSearch = () => {
    const word = searchWord.trim();
    if (!word) return;

    addRecentSearch(word);
    navigate(`/search?word=${word}`);
    closeSearch();
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Search-wrap">
      <div className="inner-wrap">
        <div className="inner">
          <h2>Search</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={onKeyPress}
            />
            <button onClick={handleSearch}>
              <img src="/images/search-grey.svg" alt="search" />
            </button>
          </div>
          <div className="search-word">
            <p>최근 검색어</p>
            <button onClick={clearRecentSearch}>전체 삭제</button>
          </div>
          <div className="search-history">
            {recentSearch.length === 0 && <p>최근 검색어가 없습니다.</p>}

            {recentSearch.map((word) => (
              <div className="word" key={word}>
                <p
                  onClick={() => {
                    navigate(`/search?word=${word}`);
                    setSearchWord("");
                    closeSearch();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {word}
                </p>

                <button onClick={() => deleteOneRecentSearch(word)}>
                  <img src="/images/close-grey.svg" alt="delete" />
                </button>
              </div>
            ))}
          </div>
          <div className="close-wrap">
            <button className="close-btn" onClick={closeSearch}>
              닫기
              <img src="/images/up-grey.svg" alt="close-btn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPopup;
