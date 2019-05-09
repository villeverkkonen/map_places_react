import React, { Component } from 'react'
import { connect } from "react-redux"
import { createPlace } from '../actions/PlaceActions'

function mapDispatchToProps(dispatch) {
    return {
        createPlace: place => dispatch(createPlace(place))
    }
}

function changeLabelColor(inputId, color) {
    var labels = document.getElementsByTagName('LABEL')
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor === inputId) {
            var input = document.getElementById(labels[i].htmlFor)
            if (input)
                input.label = labels[i]
                input.label.style.color = color
                break
        }
    }
}

function changeInputColor(inputId, color) {
    var input = document.getElementById(inputId)
    input.style.backgroundColor = color
}

class ConnectedPlaceForm extends Component {
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
        this.hideForm = this.hideForm.bind(this)
        this.handleMouseOverLabel = this.handleMouseOverLabel.bind(this)
        this.handleMouseOutLabel = this.handleMouseOutLabel.bind(this)
        this.handleMouseOverInput = this.handleMouseOverInput.bind(this)
        this.handleMouseOutInput = this.handleMouseOutInput.bind(this)
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

        this.hideForm()
    }

    toggleFormDisplay(event) {
        event.preventDefault()

        let form = document.getElementById("createPlaceForm")

        form.style.display === "none" ? event.target.classList.add("goldenButton") : event.target.classList.remove("goldenButton")
        
        form.style.display === "none" ? form.style.display = "block" : form.style.display = "none"
        document.getElementById("title").focus()
    }

    hideForm() {
        let form = document.getElementById("createPlaceForm")
        form.style.display = "none"

        let button = document.getElementById("addPlaceButton")
        button.classList.remove("goldenButton")
    }

    handleMouseOverInput(event) {
        event.preventDefault()
        changeLabelColor(event.target.id, "gold")
        changeInputColor(event.target.id, "gold")
    }

    handleMouseOutInput(event) {
        event.preventDefault()
        changeLabelColor(event.target.id, "orange")
        changeInputColor(event.target.id, "orange")
    }

    handleMouseOverLabel(event) {
        event.preventDefault()
        changeLabelColor(event.target.htmlFor, "gold")
        changeInputColor(event.target.htmlFor, "gold")
    }

    handleMouseOutLabel(event) {
        event.preventDefault()
        changeLabelColor(event.target.htmlFor, "orange")
        changeInputColor(event.target.htmlFor, "orange")
    }

    render() {
        const formStyle = {
            display: "none"
        }

        return (
            <div className="placeForm">
                <button onClick={this.toggleFormDisplay} className="addPlaceButton" id="addPlaceButton">Add place</button>
                <div className="createPlaceForm" id="createPlaceForm" style={formStyle}>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="createPlaceFormRow">
                            <label htmlFor="title" className="createPlaceLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Title</label>
                            <input type="text" className="createPlaceInput" id="title" value={this.state.title} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <div className="createPlaceFormRow">
                            <label htmlFor="description" className="createPlaceLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Description</label>
                            <input type="text" className="createPlaceInput" id="description" value={this.state.description} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <div className="createPlaceFormRow">
                            <label htmlFor="latitude" className="createPlaceLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Latitude</label>
                            <input type="text" className="createPlaceInput" id="latitude" value={this.state.latitude} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <div className="createPlaceFormRow">
                            <label htmlFor="longitude" className="createPlaceLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Longitude</label>
                            <input type="text" className="createPlaceInput" id="longitude" value={this.state.longitude} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <div className="createPlaceFormRow">
                            <label htmlFor="openingHours" className="createPlaceLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Opening hours</label>
                            <input type="text" className="createPlaceInput" id="openingHours" value={this.state.openingHours} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <button type="submit" className="createPlaceSaveButton">Save place</button>
                    </form>
                </div>
            </div>
        )
    }
}

const PlaceForm = connect(null, mapDispatchToProps)(ConnectedPlaceForm)

export default PlaceForm