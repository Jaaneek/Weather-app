import { AlgoliaSearchResult, CityData, GeoData, WeatherResponse, WeatherDataResponse, WeatherModel } from './interfaces';
import axios from 'axios';
import { sameDay, findTempByHour, mode, findHumidityByHour, getAvg } from './utils';

const weatherUrl = ({ lat, lng }: GeoData) =>
  `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.REACT_APP_WEATHER_API_KEY}&lat=${lat}&lon=${lng}&units=metric`;

const placesUrl = `https://places-dsn.algolia.net/1/places/query`;

export const getWeatherByGeoCords = ({ lat, lng }: GeoData): Promise<WeatherModel[] | any> => {
  return axios.get<WeatherResponse>(weatherUrl({ lat, lng })).then((res) => {
    const weatherRes = res.data.list;
    let mappedWeathers: WeatherDataResponse[][] = [];

    weatherRes.forEach((singleWeather) => {
      const foundGroup = mappedWeathers.find((groupWeather) => {
        return sameDay(groupWeather[0].dt_txt, singleWeather.dt_txt);
      });
      if (foundGroup) {
        foundGroup.push(singleWeather);
      } else {
        mappedWeathers.push([singleWeather]);
      }
    });
    const parsedWeather: WeatherModel[] = mappedWeathers.map((weatherGroup) => {
      return {
        date: new Date(weatherGroup[0].dt_txt),
        minValue: Math.min(...weatherGroup.map((x) => x.main.temp_min)),
        maxValue: Math.max(...weatherGroup.map((x) => x.main.temp_max)),
        modeValue: mode(weatherGroup.map((x) => x.main.temp)),
        dayTemperature: weatherGroup.find((x) => x.sys.pod === 'd')?.main.temp || findTempByHour(weatherGroup, 12),
        morningTemperature: findTempByHour(weatherGroup, 4),
        nightTemperature: weatherGroup.find((x) => x.sys.pod === 'n')?.main.temp || findTempByHour(weatherGroup, 20),
        humidity: findHumidityByHour(weatherGroup, 14),
        meanValue: getAvg(weatherGroup.map((x) => x.main.temp)),
      } as WeatherModel;
    });

    return parsedWeather;
  });
};

export const getCitiesSuggestions = (search: string): Promise<CityData[] | null> => {
  return axios
    .post<AlgoliaSearchResult>(placesUrl, {
      query: search,
      type: 'city',
      language: 'en',
    })
    .then((res) => {
      return res.data.hits.map(({ locale_names, country, population, postcode, _geoloc }) => {
        return { name: locale_names[0], country, population, postcode: postcode?.length ? postcode[0] : '', geoCords: _geoloc } as CityData;
      });
    })
    .catch(() => null);
};
