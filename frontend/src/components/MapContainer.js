import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { connect } from "react-redux"
import InfoWindowEx from './InfoWindowEx'
import mapService from '../services/maps'

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
      activeMarker: {},
      selectedPlace: {},
      apiKey: ''
    }

    this.toggleInfoWindow = this.toggleInfoWindow.bind(this)
  }

  // componentDidMount() {
  //   const apiKey = axios.get('http://localhost:3001/api/api_key')
  //   this.setState({
  //     apiKey: apiKey
  //   })
  // }

  toggleInfoWindow = (props, marker, e) => {
    if (marker.title === this.state.activeMarker.title && this.state.showingInfoWindow) {
      this.setState({
        activeMarker: {},
        showingInfoWindow: false
      })
    } else {
      this.setState({
        selectedPlace: props.place_,
        activeMarker: marker,
        showingInfoWindow: true
      })
    }
  }

  render() {
    return (
      <div className="map" style={mapStyles}>
        <Map
          google={this.props.google}
          zoom={5}
          style={mapStyles}
          initialCenter={{
            lat: 60.192059,
            lng: 24.945831
          }}
        >
          {this.props.places.map(place =>
                <Marker
                    key={place.id}
                    position={{lat: place.latitude, lng: place.longitude}}
                    title={place.title}
                    place_={place}
                    onClick={this.toggleInfoWindow}
                />
            )}
            <InfoWindowEx
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div className="infoWindow">
                <h3>{this.state.selectedPlace.title}</h3>
                <p>{this.state.selectedPlace.description}</p>
                <p>Open: {this.state.selectedPlace.openingHours}</p>
              </div>
            </InfoWindowEx>
        </Map>
        
      </div>
    );
  }
}

const getApiKey = () => {
  return mapService.getApiKey()
}

const MapContainer = connect(mapStateToProps)(ConnectedContainer)

export default GoogleApiWrapper({
  // apiKey: getApiKey()
  apiKey: ''
})(MapContainer)