import React from 'react'
import Place from './Place'

const Places = ({ store }) => {
    return(
        <div className="placesList">
            <ul>
                {store.getState().map(place =>
                    <Place
                        key={place.id}
                        place={place}
                    />
                )}
            </ul>
        </div>
    )
}

export default Places