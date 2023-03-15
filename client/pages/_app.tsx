import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'
import type { AppProps } from 'next/app'
import { GlobalContextProvider } from '@/context/context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalContextProvider>
      <ApolloProvider client={client}>
        <Header />
        <div className="flex flex-col overflow-auto h-screen">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ApolloProvider>
    </GlobalContextProvider>
  )
}
