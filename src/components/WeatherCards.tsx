import { Box, Center, Flex, Skeleton, Stack } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { IWeatherContext, WeatherContext } from '../contexts/weatherContext';
import { TemperatureTypeSwitcher } from './TemperatureTypeSwitcher';
import { TemperatureEnum } from './types';
import WeatherCard from './WeatherCard';

const WeatherCards: React.FC = () => {
  const { weatherList, loading } = useContext(WeatherContext) as IWeatherContext;
  const [temperatureType, setTemperatureType] = useState<TemperatureEnum>(TemperatureEnum.C);
  const isCelcius = () => {
    return temperatureType === TemperatureEnum.C;
  };
  return (
    <Skeleton isLoaded={!loading}>
      <Center>
        <Box m="5" border="1" w={['340px', '360px', '400px', '900px', '900px']} alignSelf="center">
          <Flex direction="column" w="100%">
            <TemperatureTypeSwitcher
              alignSelf={'flex-end'}
              aria-label="Weather information dashboard"
              temperatureType={temperatureType}
              switchType={() => setTemperatureType(isCelcius() ? TemperatureEnum.F : TemperatureEnum.C)}></TemperatureTypeSwitcher>
            <Stack direction={['column', 'column', 'column', 'row', 'row']} spacing="24px" justifyContent="space-around" alignItems="center">
              {weatherList.slice(0, 5).map((x) => (
                <WeatherCard key={x.date.toString() + x.dayTemperature + x.minValue} format={temperatureType} {...x}></WeatherCard>
              ))}
            </Stack>
          </Flex>
        </Box>
      </Center>
    </Skeleton>
  );
};

export default WeatherCards;