import React, { Component } from 'react'
import { connect } from "react-redux"
import { createPlace } from '../reducers/PlaceReducer'

function mapDispatchToProps(dispatch) {
    return {
        createPlace: place => dispatch(createPlace(place))
    }
}

class ConnectedForm extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            description: "",
            latitude: "",
            longitude: "",
            openingHours: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const title = this.state.title
        const description = this.state.description
        const latitude = this.state.latitude
        const longitude = this.state.longitude
        const openingHours = this.state.openingHours

        this.props.createPlace({
            title,
            description,
            latitude,
            longitude,
            openingHours
        })

        this.setState({
            title: "",
            description: "",
            latitude: "",
            longitude: "",
            openingHours: ""
        })
    }

    render() {
        const title = this.state.title
        const description = this.state.description
        const latitude = this.state.latitude
        const longitude = this.state.longitude
        const openingHours = this.state.openingHours

        return (
            <div className="newPlaceForm">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" value={title} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitude">Latitude</label>
                        <input type="text" className="form-control" id="latitude" value={latitude} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="longitude">Longitude</label>
                        <input type="text" className="form-control" id="longitude" value={longitude} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="openingHours">Opening hours</label>
                        <input type="text" className="form-control" id="openingHours" value={openingHours} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">Save</button>
                </form>
            </div>
        )
    }
}

const PlaceForm = connect(null, mapDispatchToProps)(ConnectedForm)

export default PlaceForm