import React from 'react'
import Place from './Place'

const Places = ({ store }) => {
    return(
        <ul>
            {store.getState().map(place =>
                <Place
                    key={place.id}
                    place={place}
                />
            )}
        </ul>
    )
}

export default Places