import { useToast } from '@chakra-ui/react';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getWeatherByGeoCords } from '../apiService';
import { CityData, WeatherModel } from '../apiService/interfaces';

export interface IWeatherContext {
  weatherList: WeatherModel[];
  loading: boolean;
  city: CityData;
  setCity: (city: CityData) => void;
}

export const WeatherContext = createContext<IWeatherContext | null>(null);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherList, setWeatherList] = useState<WeatherModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [city, setCity] = useState<CityData>({
    name: 'Wrocław',
    postcode: '25-215',
    population: 637683,
    country: 'Poland',
    geoCords: { lat: 51.109, lng: 17.0327 },
  });

  useEffect(() => {
    setLoading(true);
    getWeatherByGeoCords(city.geoCords)
      .then((res) => setWeatherList(res))
      .catch(() =>
        toast({
          position: 'bottom-left',
          title: 'Fetching weather data failed. ',
          description: 'Please try later.',
          status: 'error',
          duration: 30000,
          isClosable: false,
        })
      )
      .finally(() => setLoading(false));
    //eslint-disable-next-line
  }, [city]);

  return <WeatherContext.Provider value={{ weatherList, loading, city, setCity }}>{children}</WeatherContext.Provider>;
};
