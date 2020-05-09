import React, { useState } from 'react';

const SearchBox = ({
  setCity,
  setQueryCity,
  setTooShortCity,
  city,
  setSearchType
}) => {
  const [active, setActive] = useState(false);

  const handleCityChange = e => setCity(e.target.value.toLowerCase());

  const handleCitySubmit = (city, tooShortCityLength) => {
    setQueryCity(city);
    setTooShortCity(tooShortCityLength);
    setSearchType('search');
  };

  const handleKeyDown = e => {
    if (e.key.toLowerCase() === 'enter' && city.length >= 3) {
      handleCitySubmit(city, false);
    } else if (e.key.toLowerCase() === 'enter' && city.length < 3) {
      handleCitySubmit('', true);
    }
  };

  const handleSearchClick = () => {
    if (city && city.length >= 3) {
      handleCitySubmit(city, false);
    } else if (city && city.length < 3) {
      handleCitySubmit('', true);
    }
  };

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    if (!city) {
      setActive(false);
    }
  };

  return (
    <div className="pl-3 pr-4 search-box pb-6 flex justify-center items-center">
      <label
        className={active ? 'label-active label-custom' : 'label-custom'}
        htmlFor="city"
      >
        Location
      </label>
      <input
        value={city}
        className="input-custom"
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id="city"
        type="text"
      ></input>
      <button
        name="search"
        className="btn"
        onClick={handleSearchClick}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 ml-2 fill-current text-gray-700 transition duration-150 ease-in transform hover:text-blue-600 hover:scale-125"
        >
          <path
            className="heroicon-ui"
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBox;
