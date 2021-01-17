import * as React from "react";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { RiFahrenheitLine, RiCelsiusLine } from "react-icons/ri";
import { TemperatureEnum } from "./types";

interface TemperatureTypeProps {
  switchType: () => void;
  temperatureType: TemperatureEnum;
}

export const TemperatureTypeSwitcher: React.FC<TemperatureTypeProps & Partial<IconButtonProps>> = ({
  switchType,
  temperatureType,
  ...props
}) => {
  const isCelcius = () => {
    return temperatureType === TemperatureEnum.C;
  };
  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={switchType}
      icon={isCelcius() ? <RiCelsiusLine /> : <RiFahrenheitLine></RiFahrenheitLine>}
      aria-label={`Switch to ${isCelcius() ? "fahrenheit" : "celsius"} mode`}
      {...props}
    />
  );
};
