import React, { Component } from 'react'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'
import { connect } from "react-redux";
import MarkerList from './MarkerList'

const mapStyles = {
  width: '50vw',
  height: '50vh'
}

const mapStateToProps = state => {
  return { places: state.places };
}

export class ConnectedContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: []
    }
  }

  componentDidMount() {
    this.setState({
      places: this.state.places.concat(this.props.places)
    })
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
          <MarkerList places={this.state.places} />
        </Map>
        
      </div>
    );
  }
}

const MapContainer = connect(mapStateToProps)(ConnectedContainer)

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer)