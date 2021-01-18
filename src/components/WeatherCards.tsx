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
    <Center>
      <Box m="5" border="1" w={['340px', '340px', '340px', '900px', '900px']} alignSelf="center">
        <Flex direction="column" w="100%">
          <TemperatureTypeSwitcher
            alignSelf={'flex-end'}
            aria-label="Weather information dashboard"
            temperatureType={temperatureType}
            switchType={() => setTemperatureType(isCelcius() ? TemperatureEnum.F : TemperatureEnum.C)}></TemperatureTypeSwitcher>
          <Stack direction={['column', 'column', 'column', 'row', 'row']} spacing="24px" justifyContent="space-around" alignItems="center">
            {weatherList.slice(0, 5).map((x) => (
              <Skeleton isLoaded={!loading}>
                <WeatherCard key={x.date.toString() + x.dayTemperature + x.minValue} format={temperatureType} {...x}></WeatherCard>
              </Skeleton>
            ))}
          </Stack>
        </Flex>
      </Box>
    </Center>
  );
};

export default WeatherCards;
