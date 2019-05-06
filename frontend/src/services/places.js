import axios from 'axios'
const baseUrl = '/api/places/'

const getPlaces = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data })
}

const getPlace = (id) => {
    const request = axios.get(baseUrl + id)
    return request.then(response => { return response.data })
}

const createPlace = (place) => {
    const request = axios.post(baseUrl, place)
    return request.then(response => { return response.data })
}

const deletePlace = (id) => {
    const request = axios.delete(baseUrl + id)
    return request.then(response => { return response.data })
}

const updatePlace = (place) => {
    const request = axios.put(baseUrl + place.id, place)
    return request.then(response => { return response.data })
}

export default {
    getPlaces,
    getPlace,
    createPlace,
    deletePlace,
    updatePlace
}