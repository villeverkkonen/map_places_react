import React from 'react'
import MapContainer from './components/MapContainer'
import NewPlace from './components/NewPlace'
import Places from './components/Places'

const App = (props) => {
  const store = props.store
  return (
    <div>
      <MapContainer />
      <NewPlace store={store} />
      <Places store={store} />
    </div>
  )
}

export default App;