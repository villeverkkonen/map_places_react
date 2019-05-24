import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPlaces, getPlacesByQuery } from '../actions/PlaceActions'

const mapStateToProps = state => ({
    places: state.placeReducer.places,
    placesByQuery: state.placeReducer.placesByQuery
})

class ConnectedKeywordSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keywordSearchQuery: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchPlaces())
    }

    handleChange(event) {
        const keywordSearchQuery = event.target.value
        this.setState({
            keywordSearchQuery
        })
        let placesByQuery = []
        // Compare search query to all keywords from places
        this.props.places.map((place, index) => {
            if (place.keywords) {
                place.keywords.map(keyword =>
                    keywordSearchQuery.length > 0 && keyword.title.toLowerCase().includes(keywordSearchQuery.toLowerCase()) ?
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
        return(
            <div className="keywordSearch">
                <p>Search places with keywords</p>
                <input className="keywordSearchInput" id="keywordSearchQuery" onChange={this.handleChange} />

                <div>
                    {this.props.placesByQuery.map(place =>
                        <p key={place.id}>{place.title}</p>
                    )}
                </div>
            </div>
        )
    }

}

const KeywordSearch = connect(mapStateToProps)(ConnectedKeywordSearch)

export default KeywordSearch