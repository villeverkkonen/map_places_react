import {
  CREATE_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
  FETCH_PLACES_BEGIN,
  FETCH_PLACES_SUCCESS,
  FETCH_PLACES_FAILURE,
  PLACES_BY_QUERY,
  ADD_KEYWORD_TO_PLACE,
  DELETE_KEYWORD_FROM_PLACE,
  UPDATE_KEYWORD_FOR_PLACE,
} from '../constants/PlaceConstants'

const initialState = {
  places: [],
  placesByQuery: [],
  keywordSearchQuery: '',
  loading: false,
  error: null,
}

const PlaceReducer = (state = initialState, action) => {
  let places = state.places
  switch (action.type) {
    case FETCH_PLACES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PLACES_SUCCESS:
      return {
        ...state,
        loading: false,
        places: action.data.places,
      }
    case FETCH_PLACES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.data.error,
        places: [],
      }
    case CREATE_PLACE:
      let newPlace = action.data
      newPlace.keywords = []
      return Object.assign({}, state, {
        places: state.places.concat(newPlace),
      })
    case DELETE_PLACE:
      return Object.assign({}, state, {
        places: state.places.filter(place => place.id !== action.data.id),
      })
    case UPDATE_PLACE:
      return Object.assign({}, state, {
        places: state.places.map(place =>
          place.id !== action.data.place.id ? place : action.data.place
        ),
      })
    case PLACES_BY_QUERY:
      return Object.assign({}, state, {
        placesByQuery: action.data.placesByQuery,
        keywordSearchQuery: action.data.keywordSearchQuery,
      })
    case ADD_KEYWORD_TO_PLACE:
      places = state.places
      const keyword = {
        _id: action.data.keyword.id,
        title: action.data.keyword.title,
      }
      places.map(place =>
        place.id === action.data.keyword.place._id
          ? (place.keywords = place.keywords.concat(keyword))
          : null
      )
      return Object.assign({}, state, {
        places: places,
      })
    case DELETE_KEYWORD_FROM_PLACE:
      let placeToEdit = action.data.place
      placeToEdit.keywords = placeToEdit.keywords.filter(
        keyword => keyword._id !== action.data.keyword.id
      )
      return Object.assign({}, state, {
        places: state.places.map(place =>
          place.id === placeToEdit.id ? placeToEdit : place
        ),
      })
    case UPDATE_KEYWORD_FOR_PLACE:
      places = state.places
      for (let i = 0; i < places.length; i++) {
        if (places[i].id === action.data.keyword.place._id) {
          const place = places[i]
          place.keywords.map(keyword =>
            keyword._id === action.data.keyword.id
              ? (keyword.title = action.data.keyword.title)
              : null
          )
        }
      }
      return Object.assign({}, state, {
        places: places,
      })
    default:
      return state
  }
}

export default PlaceReducer
