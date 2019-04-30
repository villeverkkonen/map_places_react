import React from 'react'
import Place from './Place'
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { places: state.places };
}

const ConnectedList = ({ places }) => {
    return(
        <div className="placesList">
            <ul>
                {places.map(place =>
                    <Place
                        key={place.id}
                        place={place}
                    />
                )}
            </ul>
        </div>
    )
}

const PlaceList = connect(mapStateToProps)(ConnectedList)

export default PlaceList