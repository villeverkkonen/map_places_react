const initialState = [
    {
        title: "Title",
        description: "Description",
        latitude: "60",
        longitude: "25",
        openingHours: "8-16"
    }
]

const PlaceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'NEW_PLACE':
        return [...state, action.data]
      default:
        return state
    }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createPlace = (content) => {
    return {
        type: 'NEW_PLACE',
        data: {
            title: content.title.value,
            description: content.description.value,
            latitude: content.latitude.value,
            longitude: content.longitude.value,
            openingHours: content.openingHours.value,
            id: generateId()
        }
    }
}

export default PlaceReducer