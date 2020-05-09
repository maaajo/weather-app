import React, { useState, useEffect } from 'react';
import SearchBox from './Components/SearchBox';
import WeatherDescription from './Components/WeatherDescription';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  const [city, setCity] = useState('');
  const [queryCity, setQueryCity] = useState('');
  const [searchType, setSearchType] = useState('');
  const [tooShortCity, setTooShortCity] = useState();
  const [mapCoord, setMapCoord] = useState({});

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
          <header className="text-center font-bold p-6 text-3xl lowercase tracking-wider text-gray-900">
            <h2>Weather App</h2>
          </header>
          <SearchBox
            setQueryCity={setQueryCity}
            city={city}
            setCity={setCity}
            setTooShortCity={setTooShortCity}
            setSearchType={setSearchType}
          />
          <WeatherDescription
            queryCity={queryCity}
            setSearchType={setSearchType}
            searchType={searchType}
            setCity={setCity}
            mapCoord={mapCoord}
            setMapCoord={setMapCoord}
          />
        </div>
      </main>
    </ErrorBoundary>
  );
}

export default App;
