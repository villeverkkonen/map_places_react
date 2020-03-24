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
import placeService from '../services/places'

export function fetchPlaces() {
  return async dispatch => {
    dispatch(fetchPlacesBegin())
    try {
      const res = await placeService.getPlaces()
      dispatch(fetchPlacesSuccess(res))
      return res
    } catch (error) {
      return dispatch(fetchPlacesFailure(error))
    }
  }
}

export const addKeywordToPlace = keyword => ({
  type: ADD_KEYWORD_TO_PLACE,
  data: { keyword },
})

export const deleteKeywordFromPlace = content => ({
  type: DELETE_KEYWORD_FROM_PLACE,
  data: {
    keyword: content.keyword,
    place: content.place,
  },
})

export const updateKeywordForPlace = keyword => ({
  type: UPDATE_KEYWORD_FOR_PLACE,
  data: { keyword },
})

export const getPlacesByQuery = (placesByQuery, keywordSearchQuery) => ({
  type: PLACES_BY_QUERY,
  data: {
    placesByQuery,
    keywordSearchQuery,
  },
})

export const createPlace = content => {
  const place = {
    title: content.title,
    description: content.description,
    latitude: content.latitude,
    longitude: content.longitude,
    openingHours: content.openingHours,
  }

  return dispatch => {
    placeService
      .createPlace(place)
      .catch(err => {
        console.log(err)
      })
      .then(res => {
        dispatch(dispatchCreatePlace(res))
      })
  }
}

export const deletePlace = id => {
  return dispatch => {
    placeService
      .deletePlace(id)
      .catch(err => {
        console.log(err)
      })
      .then(res => {
        dispatch(dispatchDeletePlace(id))
      })
  }
}

export const updatePlace = place => {
  return dispatch => {
    placeService
      .updatePlace(place)
      .catch(err => {
        console.log(err)
      })
      .then(res => {
        dispatch(dispatchUpdatePlace(place))
      })
  }
}

export const fetchPlacesBegin = () => ({
  type: FETCH_PLACES_BEGIN,
})

export const fetchPlacesSuccess = places => ({
  type: FETCH_PLACES_SUCCESS,
  data: { places },
})

export const fetchPlacesFailure = error => ({
  type: FETCH_PLACES_FAILURE,
  data: { error },
})

const dispatchCreatePlace = place => {
  return {
    type: CREATE_PLACE,
    data: {
      id: place.id,
      title: place.title,
      description: place.description,
      latitude: place.latitude,
      longitude: place.longitude,
      openingHours: place.openingHours,
    },
  }
}

const dispatchDeletePlace = id => {
  return {
    type: DELETE_PLACE,
    data: { id: id },
  }
}

const dispatchUpdatePlace = place => {
  return {
    type: UPDATE_PLACE,
    data: { place: place },
  }
}
