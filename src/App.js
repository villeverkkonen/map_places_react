import React from 'react'
import MapContainer from './components/MapContainer'
import NewPlace from './components/PlacesForm'
import Places from './components/Places'

const App = () => {
  return (
    <div className="content">
      <MapContainer />
      <NewPlace />
      <Places />
    </div>
  )
}

export default App;