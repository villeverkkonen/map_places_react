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
            showPlace: false,
            showUpdateForm: false
        }

        this.handleDeletePlace = this.handleDeletePlace.bind(this)
        this.toggleShowPlace = this.toggleShowPlace.bind(this)
        this.toggleUpdatePlace = this.toggleUpdatePlace.bind(this)
        this.hideUpdatePlace = this.hideUpdatePlace.bind(this)
    }

    componentDidMount() {
        this.setState({ place: this.props.place })
    }

    handleDeletePlace() {
        this.props.deletePlace(this.props.place.id)
    }

    toggleShowPlace() {
        const titleText = document.getElementById("placeListTitle" + this.props.place.id)
        const placeDiv = document.getElementById("placeListObject" + this.props.place.id)

        if (this.state.showPlace) {
            titleText.style.color = "orange"
            placeDiv.classList.remove("linearGradient")
        } else {
            titleText.style.color = "gold"
            placeDiv.classList.add("linearGradient")
        }

        this.setState({ showPlace: !this.state.showPlace })
    }

    toggleUpdatePlace = (event) => {
        event.preventDefault()

        !this.state.showUpdateForm ? event.target.classList.add("goldenButton") : event.target.classList.remove("goldenButton")
        this.setState({ showUpdateForm: !this.state.showUpdateForm })
    }

    hideUpdatePlace() {
        this.setState({
            showUpdateForm: false
        })

        let button = document.getElementById("updatePlaceButton")
        button.classList.remove("goldenButton")
    }

    render() {
        const placeDivId = "placeListObject" + this.props.place.id
        const placeListTitleId = "placeListTitle" + this.props.place.id
        return (
            <div key={this.props.place.id} className="placeListObject" id={placeDivId}>
                <span onClick={this.toggleShowPlace} className="placeListTitle" id={placeListTitleId}>{this.props.place.title}</span>
                {this.state.showPlace ?
                    <div>
                        <span>{this.props.place.description}</span><br/>
                        <span>Open: {this.props.place.openingHours}</span><br/>
                        <button onClick={this.handleDeletePlace} className="deletePlaceButton">Delete</button>
                        <button onClick={this.toggleUpdatePlace} className="updatePlaceButton" id="updatePlaceButton">Update</button>
                        {this.state.showUpdateForm ?
                            <UpdatePlaceForm
                                place={this.props.place}
                                hideUpdatePlace={this.hideUpdatePlace}
                            />
                        : null}
                    </div>
                : null}
            </div>
        )
    }
}

const Place = connect(null, mapDispatchToProps)(ConnectedPlace)

export default Place