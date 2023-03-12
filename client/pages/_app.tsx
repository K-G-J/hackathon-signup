import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '@/context/context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </GlobalContextProvider>
  )
}
