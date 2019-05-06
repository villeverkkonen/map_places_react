import React, { Component } from 'react'
import { connect } from "react-redux"
import { createPlace } from '../actions/PlaceActions'

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
        this.toggleFormDisplay = this.toggleFormDisplay.bind(this)
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

        this.toggleFormDisplay()
    }

    toggleFormDisplay = () => {
        let form = document.getElementById("newPlaceForm")
        form.style.display === "none" ? form.style.display = "block" : form.style.display = "none"
        document.getElementById("title").focus()
    }

    render() {
        const title = this.state.title
        const description = this.state.description
        const latitude = this.state.latitude
        const longitude = this.state.longitude
        const openingHours = this.state.openingHours

        const formStyle = {
            display: "none"
        }

        return (
            <div className="placeForm">
                <button onClick={this.toggleFormDisplay}>Add place</button>
                <div className="newPlaceForm" id="newPlaceForm" style={formStyle}>
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
            </div>
        )
    }
}

const PlaceForm = connect(null, mapDispatchToProps)(ConnectedForm)

export default PlaceForm