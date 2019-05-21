import axios from 'axios'
const baseUrl = '/api/keywords/'

const getKeywords = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data })
}

const getKeyword = (id) => {
    const request = axios.get(baseUrl + id)
    return request.then(response => { return response.data })
}

const createKeyword = (keyword) => {
    const request = axios.post(baseUrl, keyword)
    return request.then(response => { return response.data })
}

const deleteKeyword = (keywordId, placeId) => {
    const request = axios.delete(baseUrl + keywordId, placeId)
    return request.then(response => { return response.data })
}

const updateKeyword = (keyword) => {
    const request = axios.put(baseUrl + keyword.id, keyword)
    return request.then(response => {
        return response.data
    })
}

export default {
    getKeywords,
    getKeyword,
    createKeyword,
    deleteKeyword,
    updateKeyword
}