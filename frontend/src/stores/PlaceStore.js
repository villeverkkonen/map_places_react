import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import placeReducer from '../reducers/PlaceReducer'

const PlaceStore = createStore(
    placeReducer,
    applyMiddleware(thunk)
)

export default PlaceStore