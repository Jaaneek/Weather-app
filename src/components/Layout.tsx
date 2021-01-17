import { Center, Flex } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import SearchBar from './SearchBar';
import WeatherCards from './WeatherCards';

export const Layout: React.FC = () => {
  return (
    <Flex minH="100vh" p={3} direction="column">
      <ColorModeSwitcher alignSelf="flex-end" />
      <Center w="100%">
        <Flex direction="column" w="100%">
          <SearchBar></SearchBar>
          <WeatherCards></WeatherCards>
        </Flex>
      </Center>
    </Flex>
  );
};
