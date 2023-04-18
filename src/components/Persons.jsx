import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'


// armamos la query que se va a ejecutar
const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
        name
        phone
        id
        address {
            street
            city
        }
    }
}   
`
// recibe persons que contiene todos los datos de las personas.
export const Persons = ({ persons }) => {
    // useLazyQuery es una función que recibe una query y devuelve un array con dos elementos
    // el primero Ø es una función para ejecutar la query: getPerson
    // la segunda Ø funcion es un objeto que contiene los datos de la query: result
    const [getPerson, result] = useLazyQuery(FIND_PERSON)
    // person es el objeto que contiene los datos de la persona que se seleccionó
    const [person, setPerson] = useState(null)
    // esta función se ejecuta cuando se hace click en el nombre de una persona
    const showPerson = name => {
        getPerson({ variables: { nameToSearch: name } })
    }
    useEffect(() => {
        if (result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])

    if (person) {
        return (
            <div>
                <h2>{person.name}</h2>
                <div>{person.phone}</div>
                <div>{person.address.street}</div>
                <div>{person.address.city}</div>
                <button onClick={() => setPerson(null)}>close</button>
            </div>
        )
    }

    if (persons === null ) return null

    return (
        <div>
            <h3>Persons</h3>
            {persons.map(p =>
                <div key={p.id} onClick={() => { showPerson(p.name) }}>
                    {p.name} {p.phone}
                    <br />
                </div>
                )
            }
        </div>
    )
}
