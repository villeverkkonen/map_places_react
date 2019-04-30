import React from 'react'
import MapContainer from './components/MapContainer'
import PlaceForm from './components/PlaceForm'
import PlaceList from './components/PlaceList'

const App = () => {
  return (
    <div className="content">
      <MapContainer />
      <PlaceForm />
      <PlaceList />
    </div>
  )
}

export default App;