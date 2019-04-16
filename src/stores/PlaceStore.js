import { createStore } from 'redux'
import placeReducer from '../reducers/PlaceReducer'

const PlaceStore = createStore(placeReducer)

export default PlaceStore