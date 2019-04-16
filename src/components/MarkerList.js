import React from 'react'
import { Marker } from 'google-maps-react'

const MarkerList = ({ places }) => {
    console.log(places.length)
    return(
        <div>
            {places.map(place =>
                <Marker
                    key={place.id}
                    position={{lat: place.latitude, lng: place.longitude}}
                />
            )}
        </div>
    )
}

export default MarkerList