import React, { ReactNode } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { WeatherProvider } from "../contexts/weatherContext";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <WeatherProvider>{children}</WeatherProvider>
    </ChakraProvider>
  );
};
export default Providers;
