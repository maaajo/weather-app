import React, { useState, useEffect } from 'react';
import SearchBox from './Components/SearchBox';
import WeatherDescription from './Components/WeatherDescription';
import ErrorBoundary from './Components/ErrorBoundary';
import UserOptions from './Components/UserOptions';
import OptionsContext from './Components/OptionsContext';

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

  return (
    <ErrorBoundary>
      <main className="App antialiased font-display mx-auto bg-white rounded-md shadow-2xl text-gray-700">
        <div>
          <OptionsContext.Provider
            value={{ language, units, setLanguage, setUnits }}
          >
            <UserOptions />
          </OptionsContext.Provider>
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
