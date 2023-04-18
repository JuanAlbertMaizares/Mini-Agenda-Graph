// Aca cargamos el compo

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql } from '@apollo/client'

// con una instancia de ApolloClient podemos hacer consultas a nuestro servidor graphql
// el parametro link es la url de nuestro servidor
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
})


// client.query({ query: query })
//   .then(res => console.log(res.data))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>  
  </React.StrictMode>,
)
