import React from 'react'
import { createPlace } from '../reducers/PlaceReducer'

const NewPlace = (props) => {

    const addPlace = (event) => {
        event.preventDefault()
        props.store.dispatch(
            createPlace(
                event.target
            )
        )
        event.target.title.value = ''
        event.target.description.value = ''
        event.target.latitude.value = ''
        event.target.latitude.value = ''
        event.target.longitude.value = ''
        event.target.openingHours.value = ''
    }
    return (
        <form onSubmit={addPlace}>
            <input name="title" />
            <input name="description" />
            <input name="latitude" />
            <input name="longitude" />
            <input name="openingHours" />
            <button type="submit">Save</button>
        </form>
    )
}

export default NewPlace