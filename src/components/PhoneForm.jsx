import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_NUMBER } from '../persons/graphql-mutations'

export const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('') 

    const [changeNumber, result] = useMutation(EDIT_NUMBER)
    
    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            notifyError('Person not found')
        }
    }, [result.data])
    

    const handleSubmit = (event) => {
        event.preventDefault()
        changeNumber({ variables: { name, phone } })
        // limpiamos el formulario
        setName('')
        setPhone('') 
    }
    // retornamos un formulario con los campos name, phone, street y city
    // y un botón para enviar el formulario
    return (
        <div>
            <h3>Edit phone number</h3>
            <form onSubmit={handleSubmit}>
                <input placeholder='Name' value={name} onChange={( evt) => setName(evt.target.value)} />
                <input placeholder='Phone' value={phone} onChange={( evt) => setPhone(evt.target.value)} /> 
                <button type="submit">Change number</button>
            </form>

        </div>
    )
}