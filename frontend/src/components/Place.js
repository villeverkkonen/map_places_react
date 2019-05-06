import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePlace } from '../actions/PlaceActions'
import UpdatePlaceForm from './UpdatePlaceForm'

const mapDispatchToProps = (dispatch) => {
    return {
        deletePlace: id => dispatch(deletePlace(id))
    }
}

class ConnectedPlace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            place: this.props.place,
            showPlace: false,
            showUpdateForm: false
        }

        this.handleDeletePlace = this.handleDeletePlace.bind(this)
        this.toggleShowPlace = this.toggleShowPlace.bind(this)
        this.toggleUpdatePlace = this.toggleUpdatePlace.bind(this)
    }

    componentDidMount() {
        this.setState({ place: this.props.place })
    }

    handleDeletePlace() {
        this.props.deletePlace(this.state.place.id)
    }

    toggleShowPlace() {
        this.setState({ showPlace: !this.state.showPlace })
    }

    toggleUpdatePlace() {
        this.setState({ showUpdateForm: !this.state.showUpdateForm })
    }

    render() {
        return (
            <li key={this.state.place.id}>
                <span onClick={this.toggleShowPlace} className="placeTitle">{this.state.place.title}</span>
                {this.state.showPlace ?
                    <div>
                        <span>{this.state.place.description}</span><br/>
                        <span>Open: {this.state.place.openingHours}</span><br/>
                        <span>ID: {this.state.place.id}</span><br/>
                        <button onClick={this.handleDeletePlace}>Delete</button>
                        <button onClick={this.toggleUpdatePlace}>Update</button>
                        {this.state.showUpdateForm ?
                            <UpdatePlaceForm
                                place={this.state.place}
                                toggleUpdatePlace={this.toggleUpdatePlace}
                            />
                        : null}
                    </div>
                : null}
            </li>
        )
    }
}

const Place = connect(null, mapDispatchToProps)(ConnectedPlace)

export default Place