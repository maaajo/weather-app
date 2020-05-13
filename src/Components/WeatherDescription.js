import React, { useEffect, useState } from 'react';
import { weatherIconObj, translation } from '../Base/Constants';
import {
  toProperCase,
  roundFloat,
  getLocalTime,
  debounce
} from '../Utils/Utils';
import LeafletMap from './LeafletMap';

const WeatherDescription = ({
  queryCity,
  setSearchType,
  searchType,
  setCity,
  mapCoord,
  setMapCoord,
  language
}) => {
  const [weatherData, setWeatherData] = useState();
  const { lat, lng } = mapCoord;

  useEffect(
    function getRequestedWeatherData() {
      const getWeatherData = async searchType => {
        let endPoint = `/.netlify/functions/token-hider?q=${queryCity}&lang=${language}&units=metric`;
        if (searchType === 'map') {
          endPoint = `/.netlify/functions/token-hider?lat=${lat}&lon=${lng}&lang=${language}&units=metric`;
        }
        const response = await fetch(endPoint);
        const data = await response.json();
        if (searchType === 'map') {
          setCity(data.name.toLowerCase() || '');
        }
        setWeatherData(data);
      };

      if (
        (searchType === 'search' && queryCity) ||
        (searchType === 'map' && lat && lng)
      ) {
        const debouncedGetData = debounce(getWeatherData, 500);
        debouncedGetData(searchType);
      } else {
        setWeatherData(null);
      }
    },
    [lat, lng, queryCity, searchType, setCity, language]
  );

  if (weatherData) {
    if (parseInt(weatherData.cod) === 200) {
      return (
        <div className="weather-description">
          <div className="weather-description__icon flex items-center justify-center px-1">
            <div className="text-2xl tracking-wide text-right">
              <p>{roundFloat(weatherData.main.temp)}°C</p>
              <p className="text-xs">
                {translation[`feels-${language}`]}:{' '}
                {roundFloat(weatherData.main.feels_like)}°C
              </p>
            </div>
            <img
              className="w-20 h-20"
              alt={weatherData.weather[0].description}
              title="weather-icon"
              src={`../icons/weather/${
                weatherIconObj[parseInt(weatherData.weather[0].id)]
              }.svg`}
            />
            <p className="description text-lg lg:text-2xl tracking-wide lowercase leading-tight text-left lg:text-center lg:max-w-full">
              {toProperCase(weatherData.weather[0].description)}
            </p>
          </div>
          <div className="flex justify-center mb-4">
            <p className="inline-block lowercase tracking-wider">
              {translation[`time-${language}`]}:{' '}
              {getLocalTime(weatherData.timezone)}
            </p>
          </div>
          <div className="weather-description__details flex justify-evenly sm:justify-center mb-4">
            <div className="flex justify-center items-center badge p-1 sm:mr-4 lg:p-2">
              <img
                className="w-10 h-10 mr-1"
                src="../icons/weather/sunrise.svg"
                alt="sunrise"
              />
              <p className="text-sm lg:text-base">
                {translation[`sunrise-${language}`]}:{' '}
                {getLocalTime(weatherData.timezone, weatherData.sys.sunrise)}
              </p>
            </div>
            <div className="flex justify-center items-center badge p-1 lg:p-2">
              <img
                className="w-10 h-10 mr-1"
                src="../icons/weather/sunset.svg"
                alt="sunrise"
              />
              <p className="text-sm lg:text-base">
                {translation[`sunset-${language}`]}:{' '}
                {getLocalTime(weatherData.timezone, weatherData.sys.sunset)}
              </p>
            </div>
          </div>
          <LeafletMap
            {...weatherData.coord}
            setMapCoord={setMapCoord}
            setSearchType={setSearchType}
          />
        </div>
      );
    } else {
      return (
        <p className="text-center text-sm pb-4 font-semibold">{`We couldn't find city ${
          searchType === 'search' ? queryCity : 'you selected on the map'
        }. Please try again.`}</p>
      );
    }
  }

  return null;
};

export default WeatherDescription;
