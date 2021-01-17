export interface CityData {
  name: string;
  country: string;
  population: number;
  postcode: string;
  geoCords: GeoData;
}

export interface AlgoliaSearchResult {
  hits: CityResponse[];
}

export interface CityResponse {
  locale_names: string[];
  postcode?: string[];
  country: string;
  population: number;
  _geoloc: GeoData;
}

export interface GeoData {
  lat: number;
  lng: number;
}

export interface WeatherResponse {
  list: WeatherDataResponse[];
}

export interface WeatherDataResponse {
  main: WeatherStatsResponse;
  dt_txt: string;
  sys: dayType;
}

type dayType = {
  pod: "n" | "d";
};

interface WeatherStatsResponse {
  humidity: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherModel {
  date: Date;
  temperature: number;
  morningTemperature: number;
  nightTemperature: number;
  humidity: number;
  maxValue: number;
  minValue: number;
  meanValue: number;
  modeValue: number;
  dayTemperature: number;
}
