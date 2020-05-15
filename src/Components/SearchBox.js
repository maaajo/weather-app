import React, { useState, useEffect } from 'react';
import { translation } from '../Base/Constants';

const SearchBox = ({
  setCity,
  setQueryCity,
  city,
  setSearchType,
  language
}) => {
  const [tooShortCity, setTooShortCity] = useState();
  const handleCityChange = e => {
    setCity(e.target.value.toLowerCase());
  };

  const handleCitySubmit = (city, tooShortCityLength) => {
    setQueryCity(city);
    setTooShortCity(tooShortCityLength);
    setSearchType('search');
  };

  const handleKeyDown = e => {
    if (e.key.toLowerCase() === 'enter' && city.length >= 3) {
      handleCitySubmit(city, false);
    }
  };

  const handleSearchClick = () => {
    if (city && city.length >= 3) {
      handleCitySubmit(city, false);
    } else if (city && city.length < 3) {
      handleCitySubmit('', true);
    }
  };

  useEffect(() => {
    if (city.length > 0 && city.length < 3) {
      setTooShortCity(true);
    } else {
      setTooShortCity(false);
    }
  }, [city, setTooShortCity]);

  return (
    <div className="pl-3 pr-4 search-box pb-6 flex justify-center">
      <label className="label-custom text-base pr-2 mt-2" htmlFor="city">
        {translation[`location-${language}`]}
      </label>
      <div>
        <input
          value={city}
          className={`input-custom w-48 lg:w-64 ${
            tooShortCity ? 'focus:border-red-600' : null
          }`}
          onChange={handleCityChange}
          onKeyDown={handleKeyDown}
          id="city"
          type="text"
        ></input>
        <p
          className={`text-sm mt-1 w-48 lg:w-64 text-red-600 ${
            tooShortCity ? 'block' : 'hidden'
          }`}
        >
          {language === 'en'
            ? 'Location must have at least 3 chars'
            : 'Miejsce musi zawierać przynajmniej 3 znaki'}
        </p>
      </div>
      <button
        name="search"
        className="btn flex mt-1"
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
