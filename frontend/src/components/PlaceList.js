import React from 'react'
import Place from './Place'
import { connect } from 'react-redux'
import { fetchPlaces } from '../actions/PlaceActions'

const mapStateToProps = state => ({
    places: state.placeReducer.places,
    placesByQuery: state.placeReducer.placesByQuery,
    loading: state.placeReducer.loading,
    error: state.placeReducer.error
})

class ConnectedPlaceList extends React.Component {
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
                {this.props.placesByQuery.length > 0
                ?
                    this.props.placesByQuery.map(place =>
                        <Place
                            key={place.id}
                            place={place}
                        />
                    )
                :
                    this.props.places.map(place =>
                        <Place
                            key={place.id}
                            place={place}
                        />
                    )
                }
            </div>
        )
    }
}

const PlaceList = connect(mapStateToProps)(ConnectedPlaceList)

export default PlaceList