import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import placeReducer from '../reducers/PlaceReducer'
import markerReducer from '../reducers/MarkerReducer'

const rootReducer = combineReducers({
    placeReducer,
    markerReducer
})

const RootStore = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export default RootStore