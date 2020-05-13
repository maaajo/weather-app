import React, { useState, useEffect } from 'react';
import SearchBox from './Components/SearchBox';
import WeatherDescription from './Components/WeatherDescription';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  const [city, setCity] = useState('');
  const [queryCity, setQueryCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [mapCoord, setMapCoord] = useState({});
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const runUserLocation = position => {
      setSearchType('map');
      setMapCoord({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    };

    navigator.geolocation.getCurrentPosition(runUserLocation);
  }, []);

  const handleLanguageClick = e => {
    if (e.target.id === 'pl') {
      setLanguage('pl');
    } else {
      setLanguage('en');
    }
  };

  return (
    <ErrorBoundary>
      <main className="App antialiased font-display mx-auto bg-white rounded-md shadow-2xl text-gray-700">
        <div>
          <div className="text-right p-2 mr-2">
            <button
              id="en"
              name="language-en"
              type="button"
              className="tracking-wider mr-1 hover:underline"
              onClick={handleLanguageClick}
            >
              en
            </button>
            <span> | </span>
            <button
              id="pl"
              name="language-pl"
              type="button"
              className="tracking-wider ml-1 hover:underline"
              onClick={handleLanguageClick}
            >
              pl
            </button>
          </div>
          <header className="text-center font-bold p-6 text-3xl lowercase tracking-wider text-gray-900">
            <h2>Weather App</h2>
          </header>
          <SearchBox
            setQueryCity={setQueryCity}
            city={city}
            setCity={setCity}
            setSearchType={setSearchType}
            language={language}
          />
          <WeatherDescription
            queryCity={queryCity}
            setSearchType={setSearchType}
            searchType={searchType}
            setCity={setCity}
            mapCoord={mapCoord}
            setMapCoord={setMapCoord}
            language={language}
          />
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
