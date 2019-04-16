import React, { Component } from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  width: '400px',
  height: '400px',
  display: 'block',
  marginTop: '50px'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={6}
        style={mapStyles}
        initialCenter={{
         lat: 60.192059,
         lng: 24.945831
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(MapContainer)