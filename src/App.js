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
  const [units, setUnits] = useState('metric');

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
      e.target.parentElement.children.pl.classList.add('font-bold');
      e.target.parentElement.children.en.classList.remove('font-bold');
    } else {
      setLanguage('en');
      e.target.parentElement.children.en.classList.add('font-bold');
      e.target.parentElement.children.pl.classList.remove('font-bold');
    }
  };

  const handleUnitsClick = e => {
    if (e.target.id === 'imperial') {
      setUnits('imperial');
      e.target.parentElement.children.imperial.classList.add('font-bold');
      e.target.parentElement.children.metric.classList.remove('font-bold');
    } else {
      setUnits('metric');
      e.target.parentElement.children.metric.classList.add('font-bold');
      e.target.parentElement.children.imperial.classList.remove('font-bold');
    }
  };

  return (
    <ErrorBoundary>
      <main className="App antialiased font-display mx-auto bg-white rounded-md shadow-2xl text-gray-700">
        <div>
          <div className="text-right p-2 mr-2 text-sm lg:text-base">
            <button
              id="en"
              name="language-en"
              type="button"
              className="tracking-wider mr-1 hover:underline font-bold"
              onClick={handleLanguageClick}
            >
              en
            </button>
            <span>|</span>
            <button
              id="pl"
              name="language-pl"
              type="button"
              className="tracking-wider ml-1 hover:underline"
              onClick={handleLanguageClick}
            >
              pl
            </button>
            <span className="ml-6"></span>
            <button
              id="metric"
              name="units-metric"
              type="button"
              className="tracking-wider mr-1 hover:underline font-bold"
              onClick={handleUnitsClick}
            >
              metric
            </button>
            <span>|</span>
            <button
              id="imperial"
              name="units-imperial"
              type="button"
              className="tracking-wider ml-1 hover:underline"
              onClick={handleUnitsClick}
            >
              imperial
            </button>
          </div>
          <header className="text-center font-bold p-6 pt-4 lg:pt-6 text-3xl lowercase tracking-wider text-gray-900">
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
            units={units}
          />
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
