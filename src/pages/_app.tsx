import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

import { ContentWrapper } from '../components/ContentWrapper'
import { SiteHeader } from '../components/SiteHeader'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SiteHeader />
      <ContentWrapper>
        <Component {...pageProps} />
      </ContentWrapper>
    </ChakraProvider>
  )
}

export default MyApp
