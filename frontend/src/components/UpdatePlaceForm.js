import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updatePlace } from '../actions/PlaceActions'

function mapDispatchToProps(dispatch) {
  return {
    updatePlace: place => dispatch(updatePlace(place)),
  }
}

function changeLabelColor(inputId, color) {
  var labels = document.getElementsByTagName('LABEL')
  for (var i = 0; i < labels.length; i++) {
    if (labels[i].htmlFor === inputId) {
      var input = document.getElementById(labels[i].htmlFor)
      if (input) input.label = labels[i]
      input.label.style.color = color
      break
    }
  }
}

function changeInputColor(inputId, color) {
  var input = document.getElementById(inputId)
  input.style.backgroundColor = color
}

class ConnectedUpdatePlaceForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      updateTitle: '',
      updateDescription: '',
      updateLatitude: '',
      updateLongitude: '',
      updateOpeningHours: '',
      id: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleMouseOverLabel = this.handleMouseOverLabel.bind(this)
    this.handleMouseOutLabel = this.handleMouseOutLabel.bind(this)
    this.handleMouseOverInput = this.handleMouseOverInput.bind(this)
    this.handleMouseOutInput = this.handleMouseOutInput.bind(this)
  }

  componentDidMount() {
    this.setState({
      updateTitle: this.props.place.title,
      updateDescription: this.props.place.description,
      updateLatitude: this.props.place.latitude,
      updateLongitude: this.props.place.longitude,
      updateOpeningHours: this.props.place.openingHours,
      id: this.props.place.id,
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.dataset.id]: event.target.value,
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
      id: this.state.id,
      keywords: this.props.place.keywords,
    })

    this.setState({
      updateTitle: '',
      updateDescription: '',
      updateLatitude: '',
      updateLongitude: '',
      updateOpeningHours: '',
    })

    this.props.hideUpdatePlace()
  }

  handleMouseOverInput(event) {
    event.preventDefault()
    changeLabelColor(event.target.id, 'gold')
    changeInputColor(event.target.id, 'gold')
  }

  handleMouseOutInput(event) {
    event.preventDefault()
    changeLabelColor(event.target.id, 'orange')
    changeInputColor(event.target.id, 'orange')
  }

  handleMouseOverLabel(event) {
    event.preventDefault()
    changeLabelColor(event.target.htmlFor, 'gold')
    changeInputColor(event.target.htmlFor, 'gold')
  }

  handleMouseOutLabel(event) {
    event.preventDefault()
    changeLabelColor(event.target.htmlFor, 'orange')
    changeInputColor(event.target.htmlFor, 'orange')
  }

  render() {
    return (
      <div className="updatePlaceForm" id="updatePlaceForm">
        <form onSubmit={this.handleUpdate} autoComplete="off">
          <div className="updatePlaceFormRow">
            <label
              htmlFor={'updateTitle' + this.state.id}
              className="updatePlaceLabel"
              onMouseOver={this.handleMouseOverLabel}
              onMouseOut={this.handleMouseOutLabel}
            >
              Title
            </label>
            <input
              type="text"
              className="updatePlaceInput"
              id={'updateTitle' + this.state.id}
              data-id="updateTitle"
              value={this.state.updateTitle}
              onChange={this.handleChange}
              onMouseOver={this.handleMouseOverInput}
              onMouseOut={this.handleMouseOutInput}
              autoFocus
            />
          </div>
          <div className="updatePlaceFormRow">
            <label
              htmlFor={'updateDescription' + this.state.id}
              className="updatePlaceLabel"
              onMouseOver={this.handleMouseOverLabel}
              onMouseOut={this.handleMouseOutLabel}
            >
              Description
            </label>
            <input
              type="text"
              className="updatePlaceInput"
              id={'updateDescription' + this.state.id}
              data-id="updateDescription"
              value={this.state.updateDescription}
              onChange={this.handleChange}
              onMouseOver={this.handleMouseOverInput}
              onMouseOut={this.handleMouseOutInput}
            />
          </div>
          <div className="updatePlaceFormRow">
            <label
              htmlFor={'updateLatitude' + this.state.id}
              className="updatePlaceLabel"
              onMouseOver={this.handleMouseOverLabel}
              onMouseOut={this.handleMouseOutLabel}
            >
              Latitude
            </label>
            <input
              type="text"
              className="updatePlaceInput"
              id={'updateLatitude' + this.state.id}
              data-id="updateLatitude"
              value={this.state.updateLatitude}
              onChange={this.handleChange}
              onMouseOver={this.handleMouseOverInput}
              onMouseOut={this.handleMouseOutInput}
            />
          </div>
          <div className="updatePlaceFormRow">
            <label
              htmlFor={'updateLongitude' + this.state.id}
              className="updatePlaceLabel"
              onMouseOver={this.handleMouseOverLabel}
              onMouseOut={this.handleMouseOutLabel}
            >
              Longitude
            </label>
            <input
              type="text"
              className="updatePlaceInput"
              id={'updateLongitude' + this.state.id}
              data-id="updateLongitude"
              value={this.state.updateLongitude}
              onChange={this.handleChange}
              onMouseOver={this.handleMouseOverInput}
              onMouseOut={this.handleMouseOutInput}
            />
          </div>
          <div className="updatePlaceFormRow">
            <label
              htmlFor={'updateOpeningHours' + this.state.id}
              className="updatePlaceLabel"
              onMouseOver={this.handleMouseOverLabel}
              onMouseOut={this.handleMouseOutLabel}
            >
              Opening hours
            </label>
            <input
              type="text"
              className="updatePlaceInput"
              id={'updateOpeningHours' + this.state.id}
              data-id="updateOpeningHours"
              value={this.state.updateOpeningHours}
              onChange={this.handleChange}
              onMouseOver={this.handleMouseOverInput}
              onMouseOut={this.handleMouseOutInput}
            />
          </div>
          <button type="submit" className="updatePlaceSaveButton">
            Save place
          </button>
        </form>
      </div>
    )
  }
}

const UpdatePlaceForm = connect(
  null,
  mapDispatchToProps
)(ConnectedUpdatePlaceForm)

export default UpdatePlaceForm
