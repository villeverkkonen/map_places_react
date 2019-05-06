import {
  CREATE_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  FETCH_PLACES_BEGIN,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE
} from '../constants/PlaceConstants'
import { updatePlaceInArray } from '../actions/PlaceActions'

const initialState = {
    places: [],
    loading: false,
    error: null
}

const PlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PLACES_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        }
      case FETCH_PLACES_SUCCESS:
        return {
          ...state,
          loading: false,
          places: action.data.places
        }
      case FETCH_PLACES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.data.error,
          places: []
        }
      case CREATE_PLACE:
        return Object.assign({}, state, {
            places: state.places.concat(action.data)
        })
      case DELETE_PLACE:
        return Object.assign({}, state, {
            places: state.places.filter(place => place.id !== action.data.id)
        })
      case UPDATE_PLACE:
        let placeToBeUpdated = state.places.filter(place => place.id === action.data.place.id)[0]

        return Object.assign({}, state, {
            places: updatePlaceInArray(state.places, action.data.place, placeToBeUpdated)
        })
      default:
        return state
    }
}

export default PlaceReducer