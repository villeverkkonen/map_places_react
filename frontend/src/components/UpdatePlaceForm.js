import React, { Component } from 'react'
import { connect } from "react-redux"
import { updatePlace } from '../actions/PlaceActions'

function mapDispatchToProps(dispatch) {
    return {
        updatePlace: place => dispatch(updatePlace(place))
    }
}

class ConnectedUpdateForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updateTitle: "",
            updateDescription: "",
            updateLatitude: "",
            updateLongitude: "",
            updateOpeningHours: "",
            id: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        this.setState({
            updateTitle: this.props.place.title,
            updateDescription: this.props.place.description,
            updateLatitude: this.props.place.latitude,
            updateLongitude: this.props.place.longitude,
            updateOpeningHours: this.props.place.openingHours,
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

        this.props.updatePlace({
            title: this.state.updateTitle,
            description: this.state.updateDescription,
            latitude: this.state.updateLatitude,
            longitude: this.state.updateLongitude,
            openingHours: this.state.updateOpeningHours,
            id: this.state.id
        })

        this.setState({
            updateTitle: "",
            updateDescription: "",
            updateLatitude: "",
            updateLongitude: "",
            updateOpeningHours: ""
        })

        this.props.hideUpdatePlace()
    }

    render() {
        return (
            <div className="updatePlaceForm" id="updatePlaceForm">
                <form onSubmit={this.handleUpdate} autoComplete="off">
                    <div className="updatePlaceFormRow">
                        <label htmlFor="updateTitle" className="updatePlaceLabel">Title</label>
                        <input type="text" className="updatePlaceInput" id="updateTitle" value={this.state.updateTitle} onChange={this.handleChange} autoFocus />
                    </div>
                    <div className="updatePlaceFormRow">
                        <label htmlFor="updateDescription" className="updatePlaceLabel">Description</label>
                        <input type="text" className="updatePlaceInput" id="updateDescription" value={this.state.updateDescription} onChange={this.handleChange} />
                    </div>
                    <div className="updatePlaceFormRow">
                        <label htmlFor="updateLatitude" className="updatePlaceLabel">Latitude</label>
                        <input type="text" className="updatePlaceInput" id="updateLatitude" value={this.state.updateLatitude} onChange={this.handleChange} />
                    </div>
                    <div className="updatePlaceFormRow">
                        <label htmlFor="updateLongitude" className="updatePlaceLabel">Longitude</label>
                        <input type="text" className="updatePlaceInput" id="updateLongitude" value={this.state.updateLongitude} onChange={this.handleChange} />
                    </div>
                    <div className="updatePlaceFormRow">
                        <label htmlFor="updateOpeningHours" className="updatePlaceLabel">Opening hours</label>
                        <input type="text" className="updatePlaceInput" id="updateOpeningHours" value={this.state.updateOpeningHours} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="updatePlaceSaveButton">Save</button>
                </form>
            </div>
        )
    }
}

const UpdatePlaceForm = connect(null, mapDispatchToProps)(ConnectedUpdateForm)

export default UpdatePlaceForm