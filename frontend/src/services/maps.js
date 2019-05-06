import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/maps/'

const getApiKey = () => {
    const request = axios.get(baseUrl + 'api_key')
    return request.then(response => { return response.data })
}

export default {
    getApiKey
}