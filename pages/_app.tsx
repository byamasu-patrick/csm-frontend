import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next';
import { mainStore } from '../libs/store';
import { configureApp } from '../libs/configureApp';
import { Provider } from 'react-redux';
import React from "react" 

configureApp(mainStore);

React.useLayoutEffect = React.useEffect 

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Provider store={mainStore}> {
        
          getLayout(<Component {...pageProps} />) }

        </Provider>  
}

export default MyApp
