import * as React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider, GlobalStyle, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      ul: {
        listStyleType: "none !important",
      },
    },
  },
});

const AllProviders = ({ children }: { children?: React.ReactNode }) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;

const customRender = (ui: React.ReactElement, options?: RenderOptions) => render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
