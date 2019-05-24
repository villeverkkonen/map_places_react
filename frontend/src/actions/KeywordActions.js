import {
    CREATE_KEYWORD,
    DELETE_KEYWORD,
    UPDATE_KEYWORD,
    FETCH_KEYWORDS_BEGIN,
    FETCH_KEYWORDS_SUCCESS,
    FETCH_KEYWORDS_FAILURE
} from '../constants/KeywordConstants'
import keywordService from '../services/keywords'
import { addKeywordToPlace, deleteKeywordFromPlace, updateKeywordForPlace } from './PlaceActions'

export function fetchKeywords() {
    return async dispatch => {
        dispatch(fetchKeywordsBegin())
        try {
            const res = await keywordService.getKeywords()
            dispatch(fetchKeywordsSuccess(res))
            return res
        }
        catch (error) {
            return dispatch(fetchKeywordsFailure(error))
        }
    }
}

export const createKeyword = content => {

    const keyword = {
        title: content.title,
        placeId: content.placeId
    }

    return dispatch => {
        keywordService.createKeyword(keyword)
        .catch(err => {
            console.log(err)
        })
        .then(res => {
            dispatch(dispatchCreateKeyword(res))
            dispatch(addKeywordToPlace(res))
        })
    }
}

export const deleteKeyword = content => {
    return dispatch => {
        keywordService.deleteKeyword(content)
        .catch(err => {
            console.log(err)
        })
        .then(res => {
            dispatch(dispatchDeleteKeyword(content))
            dispatch(deleteKeywordFromPlace(content))
        })
    }
}

export const updateKeyword = keyword => {
    return dispatch => {
        keywordService.updateKeyword(keyword)
        .catch(err => {
            console.log(err)
        })
        .then(res => {
            dispatch(dispatchUpdateKeyword(res))
            dispatch(updateKeywordForPlace(res))
        })
    }
}

export const fetchKeywordsBegin = () => ({
    type: FETCH_KEYWORDS_BEGIN
})

export const fetchKeywordsSuccess = keywords => ({
    type: FETCH_KEYWORDS_SUCCESS,
    data: { keywords }
})

export const fetchKeywordsFailure = error => ({
    type: FETCH_KEYWORDS_FAILURE,
    data: { error }
})

const dispatchCreateKeyword = keyword => {
    return {
        type: CREATE_KEYWORD,
        data: {
            title: keyword.title,
            id: keyword.id,
            place: keyword.place
        }
    }
}

const dispatchDeleteKeyword = content => {
    return {
        type: DELETE_KEYWORD,
        data: { id: content.keyword.id }
    }
}

const dispatchUpdateKeyword = keyword => {
    return {
        type: UPDATE_KEYWORD,
        data: { keyword: keyword }
    }
}