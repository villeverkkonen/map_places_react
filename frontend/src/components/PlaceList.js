import React from 'react'
import Place from './Place'
import { connect } from 'react-redux'
import { fetchPlaces } from '../actions/PlaceActions'

const mapStateToProps = state => ({
    places: state.placeReducer.places,
    loading: state.placeReducer.loading,
    error: state.placeReducer.error
})

class ConnectedList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchPlaces())
    }

    render() {
        const { error, loading, places } = this.props
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (loading && places.length > 0) {
            return <div>Loading...</div>
        }
        return(
            <div className="placesList">
                {places ?
                    places.map(place =>
                        <Place
                            key={place.id}
                            place={place}
                        />
                    )
                : null}
            </div>
        )
    }
}

const PlaceList = connect(mapStateToProps)(ConnectedList)

export default PlaceList