import { gql } from "@apollo/client"

// creamos una consulta, una query, para obtener todos los datos de la persona
export const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }
    } 
  }
`