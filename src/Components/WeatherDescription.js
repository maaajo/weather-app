import React, { useEffect, useState } from 'react';
import { weatherIconObj, translation } from '../Base/Constants';
import {
  toProperCase,
  roundFloat,
  getLocalTime,
  debounce
} from '../Utils/Utils';
import LeafletMap from './LeafletMap';
import Badge from './Badge';

const WeatherDescription = ({
  queryCity,
  setSearchType,
  searchType,
  setCity,
  mapCoord,
  setMapCoord,
  language,
  units
}) => {
  const [weatherData, setWeatherData] = useState();
  const [loading, setLoading] = useState(false);
  const { lat, lng } = mapCoord;

  useEffect(
    function getRequestedWeatherData() {
      const getWeatherData = async searchType => {
        setLoading(true);
        let endPoint = `/.netlify/functions/token-hider?q=${queryCity}&lang=${language}&units=${units}`;
        if (searchType === 'map') {
          endPoint = `/.netlify/functions/token-hider?lat=${lat}&lon=${lng}&lang=${language}&units=${units}`;
        }
        const response = await fetch(endPoint);
        const data = await response.json();
        if (searchType === 'map') {
          setCity(data.name.toLowerCase() || '');
        }
        setWeatherData(data);
        setLoading(false);
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
    [lat, lng, queryCity, searchType, setCity, language, units]
  );

  if (weatherData) {
    if (parseInt(weatherData.cod) === 200) {
      return (
        <div className="weather-description">
          <div className="weather-description__icon flex items-center justify-center px-1">
            <div className="text-2xl tracking-wide text-right">
              {loading ? (
                <img src="../icons/loading.svg" alt="loading" title="loading" />
              ) : (
                <p>
                  {`${roundFloat(weatherData.main.temp)}°${
                    units === 'metric' ? 'C' : 'F'
                  }`}
                </p>
              )}
              {loading ? (
                <img src="../icons/loading.svg" alt="loading" title="loading" />
              ) : (
                <p className="text-xs">
                  {translation[`feels-${language}`]}:{' '}
                  {roundFloat(weatherData.main.feels_like)}°
                  {units === 'metric' ? 'C' : 'F'}
                </p>
              )}
            </div>
            <img
              className="w-20 h-20"
              alt={weatherData.weather[0].description}
              title="weather-icon"
              src={`../icons/weather/${
                weatherIconObj[parseInt(weatherData.weather[0].id)]
              }.svg`}
            />
            {loading ? (
              <img src="../icons/loading.svg" alt="loading" title="loading" />
            ) : (
              <p className="description text-base lg:text-2xl tracking-wide lowercase leading-tight text-center lg:text-center lg:max-w-full">
                {toProperCase(weatherData.weather[0].description)}
              </p>
            )}
          </div>
          <div className="flex justify-center mb-4">
            <p className="inline-block lowercase tracking-wider">
              {translation[`time-${language}`]}:{' '}
              {getLocalTime(weatherData.timezone)}
            </p>
          </div>
          <div className="weather-description__details flex justify-evenly sm:justify-center mb-4">
            <Badge
              language={language}
              timezone={weatherData.timezone}
              time={weatherData.sys.sunrise}
              iconSrc="../icons/weather/sunrise.svg"
              alt="sunrise"
            />
            <Badge
              language={language}
              timezone={weatherData.timezone}
              time={weatherData.sys.sunset}
              iconSrc="../icons/weather/sunset.svg"
              alt="sunset"
            />
          </div>
          <LeafletMap
            {...weatherData.coord}
            setMapCoord={setMapCoord}
            setSearchType={setSearchType}
            language={language}
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
