import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlaces, getPlacesByQuery } from '../actions/PlaceActions'
import { fetchKeywords } from '../actions/KeywordActions'

const mapStateToProps = state => ({
    places: state.placeReducer.places,
    placesByQuery: state.placeReducer.placesByQuery,
    keywords: state.keywordReducer.keywords,
    loading: state.placeReducer.loading,
    error: state.placeReducer.error
})

class ConnectedKeywordSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keywordSearchQuery: '',
            keywords: [],
            uniqueKeywords: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.toggleKeywordListDisplay = this.toggleKeywordListDisplay.bind(this)
        this.getUniqueKeywordsByTitle = this.getUniqueKeywordsByTitle.bind(this)
        this.searchByKeyword = this.searchByKeyword.bind(this)
        this.dispatchPlacesByQuery = this.dispatchPlacesByQuery.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchPlaces())
        this.props.dispatch(fetchKeywords())
        this.setState({ keywords: this.props.keywords })
    }

    handleChange(event) {
        const keywordSearchQuery = event.target.value
        this.setState({
            keywordSearchQuery
        })
        this.dispatchPlacesByQuery(keywordSearchQuery)
    }

    toggleKeywordListDisplay() {
        const button = document.getElementById("toggleKeywordListButton")
        const list = document.getElementById("keywordList")
        if (list.style.display === "none") {
            list.style.display = "block"
            button.innerHTML = "Hide keywords"
        } else {
            list.style.display = "none"
            button.innerHTML = "Show keywords"
        }

        !button.classList.contains("goldenButton") ? button.classList.add("goldenButton") : button.classList.remove("goldenButton")
    }

    getUniqueKeywordsByTitle(keywords) {
        let uniqueKeywords = []

        for (let i = 0; i < keywords.length; i++) {
            let keywordAlreadyExists = false
            for (let y = 0; y < uniqueKeywords.length; y++) {
                if (uniqueKeywords[y].title === keywords[i].title) {
                    keywordAlreadyExists = true
                }
            }
            if (!keywordAlreadyExists) {
                uniqueKeywords.push(keywords[i])
            }
        }

        return uniqueKeywords.sort((a, b) => a.title.localeCompare(b.title))
    }

    searchByKeyword = keyword => event => {
        event.preventDefault()
        this.setState({ keywordSearchQuery: keyword })
        this.dispatchPlacesByQuery(keyword)
    }

    dispatchPlacesByQuery(keywordSearchQuery) {
        let placesByQuery = []
        // Compare search query to all keywords from places
        this.props.places.map((place, index) => {
            if (place.keywords) {
                place.keywords.map(keyword =>
                    keywordSearchQuery.length > 0 && keyword.title.toLowerCase().startsWith(keywordSearchQuery.toLowerCase()) ?
                        !placesByQuery.includes(place) ?
                            placesByQuery = placesByQuery.concat(place)
                        : null
                    : null
                )
            }
            if (index === this.props.places.length - 1) {
                this.props.dispatch(getPlacesByQuery(placesByQuery, keywordSearchQuery))
            }
            return null
        })
    }

    render() {
        const listStyles = {
            display: 'none'
        }

        const { error, loading, keywords } = this.props
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (loading && keywords.length > 0) {
            return <div>Loading...</div>
        }

        return(
            <div>
                <div className="keywordSearch">
                    <p>Search places with keywords</p>
                    <input className="keywordSearchInput" id="keywordSearchQuery" onChange={this.handleChange} value={this.state.keywordSearchQuery} />
                </div>

                <div className="keywordList">
                    <button onClick={this.toggleKeywordListDisplay} className="toggleKeywordListButton" id="toggleKeywordListButton">Show keywords</button>
                    <ul style={listStyles} id="keywordList">
                        {this.getUniqueKeywordsByTitle(keywords).map(keyword => {
                            return <li key={keyword.id} className="keywordListItem" onClick={this.searchByKeyword(keyword.title)}>{keyword.title}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }

}

const KeywordSearch = connect(mapStateToProps)(ConnectedKeywordSearch)

export default KeywordSearch