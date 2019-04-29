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
    console.log("Reducer ID poistuu: " + id)
    return {
        type: 'DELETE_PLACE',
        data: { id: id }
    }
}

export default PlaceReducer