import { Box, Divider, Flex, Icon, Tooltip } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { TemperatureEnum } from './types';
import { WiHumidity, WiDaySunny } from 'react-icons/wi';
import { FaTemperatureHigh, FaTemperatureLow } from 'react-icons/fa';
import { TiWeatherNight } from 'react-icons/ti';

interface WeatherBoxProps {
  format: TemperatureEnum;
  morningTemperature: number;
  humidity: number;
  maxValue: number;
  minValue: number;
  modeValue: number;
  dayTemperature: number;
  nightTemperature: number;
  meanValue: number;
  date: Date;
}

const WeatherBox: React.FC<WeatherBoxProps> = ({
  format,
  morningTemperature,
  humidity,
  maxValue,
  minValue,
  modeValue,
  dayTemperature,
  nightTemperature,
  meanValue,
  date,
}) => {
  function formatTemperature(celsius: number): string {
    const isF = format === TemperatureEnum.F;
    return isF ? Math.ceil((celsius * 9) / 5 + 32).toString() + '°F' : Math.ceil(celsius).toString() + '°C';
  }

  const NightTemperature = () => (
    <Tooltip label="Temperature at night">
      <Box>
        {formatTemperature(nightTemperature) + ' '} <Icon as={TiWeatherNight} boxSize={6} />
      </Box>
    </Tooltip>
  );
  const DayTemperature = () => (
    <Tooltip label="Temperature at day">
      <Box>
        <Icon as={WiDaySunny} boxSize={6} /> {' ' + formatTemperature(dayTemperature)}
      </Box>
    </Tooltip>
  );
  const MorningTemperature = () => (
    <Tooltip label="Temperature at morning">
      <Box>
        <Box>{'Morning: '}</Box>
        <Box>{formatTemperature(morningTemperature)}</Box>{' '}
      </Box>
    </Tooltip>
  );

  const Humidity = () => (
    <Tooltip label="Humidity">
      <Box>
        <Icon as={WiHumidity} boxSize={6} /> {humidity}
      </Box>
    </Tooltip>
  );

  const MaxTemperature = () => (
    <Tooltip label="Maximum temperature">
      <Box>
        <Icon as={FaTemperatureHigh} boxSize={6} />
        {'  ' + formatTemperature(maxValue)}
      </Box>
    </Tooltip>
  );

  const MiniTemperature = () => (
    <Tooltip label="Minimum temperature">
      <Box>
        {formatTemperature(minValue) + '  '}
        <Icon as={FaTemperatureLow} boxSize={6} />
      </Box>
    </Tooltip>
  );

  const ModeTemperature = () => (
    <Tooltip label="Mode temperature">
      <Box>
        <Box>{'Mode: '}</Box>
        <Box>{formatTemperature(modeValue)}</Box>
      </Box>
    </Tooltip>
  );

  const MeanTemperature = () => (
    <Tooltip label="Mean temperature">
      <Box ml={2}>
        <Box>{'Mean: '}</Box>
        <Box>{formatTemperature(meanValue)}</Box>
      </Box>
    </Tooltip>
  );

  return (
    <Box minW="160px" maxW="160px" borderWidth="1px" borderRadius="lg" overflow="hidden" fontSize="m">
      <Flex direction={'column'} p={2}>
        <Box fontWeight="bold" mb={1}>
          {date.toLocaleDateString('en-us', { weekday: 'long' })}
        </Box>
        <WeatherCardRow leftChildren={<MaxTemperature />} rightChildren={<MiniTemperature />}></WeatherCardRow>
        <Separator />
        <WeatherCardRow leftChildren={<DayTemperature />} rightChildren={<NightTemperature />}></WeatherCardRow>
        <Separator />
        <WeatherCardRow isText={true} leftChildren={<ModeTemperature />} rightChildren={<MeanTemperature />}></WeatherCardRow>
        <Separator />
        <WeatherCardRow isText={true} leftChildren={<MorningTemperature />} rightChildren={<Humidity />}></WeatherCardRow>
      </Flex>
    </Box>
  );
};

const Separator = () => <Divider opacity={1} pt={1} pb={1} />;
interface WeatherCardRowProps {
  leftChildren: ReactNode;
  rightChildren: ReactNode;
  isText?: boolean;
}

export const WeatherCardRow: React.FC<WeatherCardRowProps> = ({ leftChildren, rightChildren, isText = false }) => {
  return (
    <Flex direction="row" justifyContent="space-between">
      <Box flexDirection={isText ? 'column' : 'row'}> {leftChildren}</Box>
      <Box flexDirection={isText ? 'column' : 'row'}>{rightChildren}</Box>
    </Flex>
  );
};

export default WeatherBox;
