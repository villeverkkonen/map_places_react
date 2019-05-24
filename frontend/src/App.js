import React from 'react'
import GoogleMap from './components/GoogleMap'
import PlaceForm from './components/PlaceForm'
import PlaceList from './components/PlaceList'
import KeywordSearch from './components/KeywordSearch'

const App = () => {
  return (
    <div className="content">
      <GoogleMap />
      <div id="alignedDivs">
        <div id="leftDiv">
          <PlaceForm />
          <KeywordSearch />
        </div>

        <div id="rightDiv">
          <PlaceList />
        </div>
      </div>
    </div>
  )
}

export default App;