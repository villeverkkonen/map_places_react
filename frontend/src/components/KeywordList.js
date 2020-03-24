import React from 'react'
import Keyword from './Keyword'
import { connect } from 'react-redux'
import { fetchKeywords } from '../actions/KeywordActions'

const mapStateToProps = state => ({
  keywords: state.keywordReducer.keywords,
  loading: state.keywordReducer.loading,
  error: state.keywordReducer.error,
})

class ConnectedKeywordList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchKeywords())
  }

  render() {
    const { error, loading, keywords } = this.props
    if (error) {
      return <div>Error! {error.message}</div>
    }
    if (loading && keywords.length > 0) {
      return <div>Loading...</div>
    }

    return (
      <div className="keywordsList">
        <p className="keywordList">Keywords:</p>
        {keywords
          ? keywords.map(keyword =>
              keyword.place && keyword.place._id === this.props.place.id ? (
                <Keyword
                  key={keyword.id}
                  keyword={keyword}
                  place={this.props.place}
                />
              ) : null
            )
          : null}
      </div>
    )
  }
}

const KeywordList = connect(mapStateToProps)(ConnectedKeywordList)

export default KeywordList
