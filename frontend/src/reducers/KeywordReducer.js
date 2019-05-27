import {
    CREATE_KEYWORD,
    DELETE_KEYWORD,
    UPDATE_KEYWORD,
    FETCH_KEYWORDS_BEGIN,
    FETCH_KEYWORDS_SUCCESS,
    FETCH_KEYWORDS_FAILURE
  } from '../constants/KeywordConstants'
  
  const initialState = {
      keywords: [],
      loading: false,
      error: null
  }
  
  const KeywordReducer = (state = initialState, action) => {
      switch (action.type) {
        case FETCH_KEYWORDS_BEGIN:
          return {
            ...state,
            loading: true,
            error: null
          }
        case FETCH_KEYWORDS_SUCCESS:
          const keywords = action.data.keywords.sort()
          return {
            ...state,
            loading: false,
            keywords: keywords
          }
        case FETCH_KEYWORDS_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.data.error,
            keywords: []
          }
        case CREATE_KEYWORD:
          return Object.assign({}, state, {
            keywords: state.keywords.concat(action.data)
          })
        case DELETE_KEYWORD:
          return Object.assign({}, state, {
            keywords: state.keywords.filter(keyword => keyword.id !== action.data.id)
          })
        case UPDATE_KEYWORD:
          return Object.assign({}, state, {
            keywords: state.keywords.map(keyword => keyword.id !== action.data.keyword.id ? keyword : action.data.keyword)
          })
        default:
          return state
      }
  }
  
  export default KeywordReducer