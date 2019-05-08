import React from 'react'
import MapContainer from './components/MapContainer'
import PlaceForm from './components/PlaceForm'
import PlaceList from './components/PlaceList'

const App = () => {
  return (
    <div className="content">
      <MapContainer />
      <div id="alignedDivs">
        <div id="leftDiv">
          <PlaceForm />
        </div>

        <div id="rightDiv">
          <PlaceList />
        </div>
      </div>
    </div>
  )
}

export default App;