import * as React from "react";
import Providers from "./providers";
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <Providers>
      <Layout></Layout>
    </Providers>
  );
};
