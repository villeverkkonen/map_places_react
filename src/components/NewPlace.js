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
        <div className="newPlaceForm">
            <form onSubmit={addPlace}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input name="description" />
                </div>
                <div>
                    <label htmlFor="latitude">Latitude</label>
                    <input name="latitude" />
                </div><div>
                    <label htmlFor="longitude">Longitude</label>
                    <input name="longitude" />
                </div>
                <div>
                    <label htmlFor="openingHours">Opening hours</label>
                    <input name="openingHours" />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default NewPlace