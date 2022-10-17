import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { ContentWrapper } from "../components/content-wrapper";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SiteHeader />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
      <SiteFooter />
    </ChakraProvider>
  );
}

export default MyApp;
