import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { Persons } from './components/Persons'
import { PersonForm } from './components/PersonForm'

import { usePersons } from './persons/custom-hooks'
import { Notify } from './components/Notify'
import { PhoneForm } from './components/PhoneForm'

// esta es la funcion principal de la app, lo que hace es llamar a los componentes
// que se van a mostrar en la pagina
function App() {
  // hooks necesarios
  const { loading, error, data } = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  // si hay error, se muestra en la pagina
  if (error) return <span style={{ color: 'red' }}>Error: {error.message}</span>
  
  // funcion 
  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  // return
  
  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GraphQL + React</h1>
      {
        loading
          ? <span>Loading...</span>
          : <Persons persons={data?.allPersons} />
      }
      <PersonForm notifyError = {notifyError} />
      <PhoneForm  notifyError={notifyError} />
    </div>
  )
}

export default App
