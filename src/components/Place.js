import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePlace } from '../reducers/PlaceReducer'

const mapDispatchToProps = (dispatch) => {
    return {
        deletePlace: id => dispatch(deletePlace(id))
    }
}

class ConnectedPlace extends Component {
    constructor(props) {
        super(props);

        this.handleDeletePlace = this.handleDeletePlace.bind(this)
    }

    handleDeletePlace() {
        this.props.deletePlace(this.props.place.id)
    }

    render() {
        return (
            <li key={this.props.place.id}>
                {this.props.place.title}
                <button onClick={this.handleDeletePlace}>x</button>
            </li>
        )
    }
}

const Place = connect(null, mapDispatchToProps)(ConnectedPlace)

export default Place