import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import PlaceReducer from '../reducers/PlaceReducer'

const mapStyles = {
  width: '50vw',
  height: '50vh'
}

export class MapContainer extends Component {
  constructor() {
    super()

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
      <div className="map" style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={6}
          style={mapStyles}
          initialCenter={{
            lat: 60.192059,
            lng: 24.945831
          }}
        >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer)