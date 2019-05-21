import React, { Component } from 'react'
import mapService from '../services/maps'
import MapContainer from './MapContainer'

export class GoogleMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeMarker: {},
      selectedPlace: {},
      apiKey: ''
    }
  }

  componentDidMount() {
    mapService
      .getApiKey()
      .then(apiKey => {
        this.setState({ apiKey })
      })
  }

  render() {
    return (
        this.state.apiKey ?
            <MapContainer apiKey={this.state.apiKey} />
        : null
    )
  }
}

export default GoogleMap