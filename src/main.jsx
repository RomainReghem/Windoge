import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react"
import '@fontsource/sora/700.css'
import '@fontsource/encode-sans/700.css'
import '@fontsource/inter/700.css'

const theme = extendTheme({
  fonts:{
    heading:`'Inter', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'base', // Normally, it is "semibold"
      },
    }
  },
  colors: {
    celadon:
    {
      50: '#e2f6ff',
      100: '#c2deee',
      200: '#a1c7dc',
      300: '#7eb1cd',
      400: '#5b9abd',
      500: '#4281a4',
      600: '#316480',
      700: '#20485d',
      800: '#0d2c3b',
      900: '#001019',
    },
    verdigris:
    {
      50: '#dffafa',
      100: '#c2eae8',
      200: '#a2dad8',
      300: '#80cac7',
      400: '#5ebab8',
      500: '#45a19e',
      600: '#327d7b',
      700: '#205a59',
      800: '#0c3736',
      900: '#001515',
    },
    timberwolf: {
      50: '#f8f1eb',
      100: '#dfd9d3',
      200: '#c7bfb8',
      300: '#b1a69c',
      400: '#9b8d7f',
      500: '#827466',
      600: '#65594e',
      700: '#494038',
      800: '#2c2620',
      900: '#130c04',
    },
    tan:
    {
      50: '#fcf4e2',
      100: '#edddc2',
      200: '#dfc69f',
      300: '#d1af7a',
      400: '#c49856',
      500: '#aa7e3c',
      600: '#85622e',
      700: '#5f4620',
      800: '#3a2a11',
      900: '#180d00',
    },
    fuzzy:
    {
      50: '#ffe9e9',
      100: '#efc7c8',
      200: '#dda3a6',
      300: '#cd7f84',
      400: '#bd5c61',
      500: '#a34248',
      600: '#803238',
      700: '#5d2427',
      800: '#391417',
      900: '#1b0305',
    },
  },
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>
)
