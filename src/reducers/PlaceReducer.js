const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const initialState = {
    places: [{
        title: "Title",
        description: "Description",
        latitude: "60",
        longitude: "25",
        openingHours: "8-16",
        id: generateId()
    }]
}

const PlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_PLACE':
        return Object.assign({}, state, {
            places: state.places.concat(action.data)
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

export const getPlaces = () => {
    return {}
}

export default PlaceReducer