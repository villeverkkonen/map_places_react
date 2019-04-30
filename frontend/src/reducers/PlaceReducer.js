const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = {
    places: [
        {
            title: "Test One",
            description: "First",
            latitude: "60",
            longitude: "25",
            openingHours: "8-16",
            id: generateId()
        },
        {
            title: "Test Two",
            description: "Second",
            latitude: "61",
            longitude: "26",
            openingHours: "8-16",
            id: generateId()
        }
    ]
}

const PlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PLACE':
        return Object.assign({}, state, {
            places: state.places.concat(action.data)
        })
      case 'DELETE_PLACE':
        return Object.assign({}, state, {
            places: state.places.filter(place => place.id !== action.data.id)
        })
      case 'UPDATE_PLACE':
        let placeToBeUpdated = state.places.filter(place => place.id === action.data.place.id)[0]

        return Object.assign({}, state, {
            places: updatePlaceInArray(state.places, action.data.place, placeToBeUpdated)
        })
      default:
        return state
    }
}

export const createPlace = (content) => {
    return {
        type: 'ADD_PLACE',
        data: {
            title: content.title,
            description: content.description,
            latitude: content.latitude,
            longitude: content.longitude,
            openingHours: content.openingHours,
            id: generateId()
        }
    }
}

export const deletePlace = (id) => {
    return {
        type: 'DELETE_PLACE',
        data: { id: id }
    }
}

export const updatePlace = (place) => {
    return {
        type: 'UPDATE_PLACE',
        data: { place: place }
    }
}

function updatePlaceInArray(array, placeData, placeToBeUpdated) {
    placeToBeUpdated.title = placeData.title
    placeToBeUpdated.description = placeData.description
    placeToBeUpdated.latitude = placeData.latitude
    placeToBeUpdated.longitude = placeData.longitude
    placeToBeUpdated.openingHours = placeData.openingHours

    return array.map((place) => {
      if (place.id !== placeToBeUpdated.id) {
        return place
      }
      return {
        ...place,
        ...placeToBeUpdated
      }
    })
  }

export default PlaceReducer