import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";
import Results from "./Results";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [delaySearch, setDelaySearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setDelaySearch(searchInput);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="container">
      <div className="search-div">
        <div className="icon-input">
          <BiSearch className="icon" size={45} />
          <input
            id="searchInput"
            name="searchInput"
            value={searchInput}
            placeholder="Search for an anime"
            className="search-input"
            onChange={onChange}
            onKeyDown={handleKeyDown}
          ></input>
          <FaArrowRight className="arrow-icon" size={10} />
        </div>
        <Results searchInput={delaySearch} />
      </div>
    </div>
  );
};

export default Search;
