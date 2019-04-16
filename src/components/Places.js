import React from 'react'
import Place from './Place'
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { places: state.places };
}

const PlacesList = ({ places }) => {
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

const Places = connect(mapStateToProps)(PlacesList)

export default Places