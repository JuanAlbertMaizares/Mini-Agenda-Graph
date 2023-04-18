import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

import { CREATE_PERSON } from '../persons/graphql-mutations'
import { ALL_PERSONS } from '../persons/graphql-queries'

export const PersonForm = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    // useMutation devuelve un array con dos elementos
    // el primer Ø recibe una query y 
    // agregamos un segundo Ø, refetchQueries que es un array con las queries que queremos refrescar
    // createPerson es la función que ejecuta la query
    const [createPerson] = useMutation(
        CREATE_PERSON, 
        { refetchQueries: [ {query: ALL_PERSONS }],
          onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
          }
        })

    // 
    const handleSubmit = (event) => {
        event.preventDefault()
        createPerson({ variables: { name, phone, street, city } })
        // limpiamos el formulario
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }
    // retornamos un formulario con los campos name, phone, street y city
    // y un botón para enviar el formulario
    return (
        <div>
            <h3>Create a new person</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder='Name' value={name} onChange={( evt) => setName(evt.target.value)} />
                <input placeholder='Phone' value={phone} onChange={( evt) => setPhone(evt.target.value)} />
                <input placeholder='Street' value={street} onChange={( evt) => setStreet(evt.target.value)} />
                <input placeholder='City' value={city} onChange={( evt) => setCity(evt.target.value)} />
                <button type="submit">create</button>
            </form>

        </div>
    )
}