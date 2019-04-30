import React, { Component } from 'react'
import { connect } from "react-redux"
import { updatePlace } from '../reducers/PlaceReducer'

function mapDispatchToProps(dispatch) {
    return {
        updatePlace: place => dispatch(updatePlace(place))
    }
}

class ConnectedUpdateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            description: "",
            latitude: "",
            longitude: "",
            openingHours: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        this.setState({
            title: this.props.place.title,
            description: this.props.place.description,
            latitude: this.props.place.latitude,
            longitude: this.props.place.longitude,
            openingHours: this.props.place.openingHours,
            id: this.props.place.id
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleUpdate(event) {
        event.preventDefault()
        const title = this.state.title
        const description = this.state.description
        const latitude = this.state.latitude
        const longitude = this.state.longitude
        const openingHours = this.state.openingHours
        const id = this.state.id

        this.props.updatePlace({
            title,
            description,
            latitude,
            longitude,
            openingHours,
            id
        })

        this.setState({
            title: "",
            description: "",
            latitude: "",
            longitude: "",
            openingHours: ""
        })

        this.props.toggleUpdatePlace()
    }

    render() {
        const title = this.state.title
        const description = this.state.description
        const latitude = this.state.latitude
        const longitude = this.state.longitude
        const openingHours = this.state.openingHours

        return (
            <div className="updatePlaceForm" id="updatePlaceForm">
                <form onSubmit={this.handleUpdate}>
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

const UpdatePlaceForm = connect(null, mapDispatchToProps)(ConnectedUpdateForm)

export default UpdatePlaceForm