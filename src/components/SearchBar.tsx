import React, { useContext, useState } from 'react';
import {
  Box,
  FormControl,
  FormErrorIcon,
  FormLabel,
  Input,
  Icon,
  useColorModeValue,
  InputGroup,
  Button,
  InputRightElement,
  Center,
  useToast,
} from '@chakra-ui/react';
import Autosuggest, { InputProps, OnSuggestionSelected, RenderSuggestionParams, RenderSuggestionsContainerParams } from 'react-autosuggest';
import { getCitiesSuggestions } from '../apiService';
import { CityData } from '../apiService/interfaces';
import { FaCity } from 'react-icons/fa';
import { GiVillage } from 'react-icons/gi';
import { WeatherContext, IWeatherContext } from '../contexts/weatherContext';
interface SearchBarProps {}

const getSuggestions = (searchTerm: string, cities: CityData[]) => {
  const inputValue = searchTerm.trim().toLowerCase();
  const inputLength = inputValue.length;
  return inputLength === 0 ? [] : cities.filter((city) => city.name.toLowerCase().slice(0, inputLength) === inputValue).slice(0, 6);
};

const getSuggestionValue = (suggestion: CityData) => suggestion.name;

const SearchBar: React.FC<SearchBarProps> = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [selected, setSelected] = useState<CityData | null>(null);
  const toast = useToast();
  const { setCity } = useContext(WeatherContext) as IWeatherContext;

  // @ts-ignore
  const onChange = (_, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    getCitiesSuggestions(value).then((citySuggestions) => {
      if (citySuggestions !== null) setSuggestions(getSuggestions(value, citySuggestions));
      else
        toast({
          position: 'bottom-left',
          title: 'Fetch failed. ',
          description: 'Please try later.',
          status: 'error',
          duration: 30000,
          isClosable: false,
        });
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const highlightedBg = useColorModeValue('gray.50', 'gray.700');
  const color = useColorModeValue('gray.800', 'gray.200');
  const globalBg = useColorModeValue('white', '#1A202C');
  const renderSuggestion = (suggestion: CityData, { isHighlighted }: RenderSuggestionParams) => {
    return (
      <Box
        cursor="pointer"
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={isHighlighted ? highlightedBg : globalBg}
        p={0.5}
        pl={2}
        fontSize="sm"
        d="flex"
        alignItems="baseline">
        <Icon as={suggestion.population >= 100000 ? FaCity : GiVillage}></Icon>
        <Box m="2">
          {suggestion.name}
          <Box as="span" color={color} fontSize="sm" fontWeight="100">
            {' ' + suggestion.country}
          </Box>
        </Box>
      </Box>
    );
  };

  const inputProps = {
    placeholder: 'City name',
    value,
    onChange: onChange,
  };

  const updateCurrentCity = () => {
    if (selected) {
      setCity(selected);
    } else {
      let foundSuggestion = suggestions.find((x) => x.name === value);
      if (foundSuggestion) setCity(foundSuggestion);
    }
  };
  const onSuggestionSelected: OnSuggestionSelected<CityData> = (_, { suggestion }) => {
    setSelected(suggestion);
  };

  const renderInputComponent = (inputProps: InputProps<CityData> | any) => {
    return (
      <InputGroup>
        <Input {...inputProps}></Input>
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" mr={2} onClick={updateCurrentCity}>
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    );
  };

  function renderSuggestionsContainer({ containerProps, children }: RenderSuggestionsContainerParams) {
    return (
      <Box {...containerProps} pos="fixed" w="330px" overflow="hidden">
        {children}
      </Box>
    );
  }
  return (
    <Center>
      <FormControl pos="relative" w="330px" id="City searchbar" overflow="hidden">
        <FormLabel>City</FormLabel>
        <Autosuggest
          id="Searchbar"
          renderSuggestionsContainer={renderSuggestionsContainer}
          renderInputComponent={renderInputComponent}
          onSuggestionSelected={onSuggestionSelected}
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <FormErrorIcon></FormErrorIcon>
      </FormControl>
    </Center>
  );
};
export default SearchBar;
