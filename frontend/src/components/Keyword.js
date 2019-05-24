import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteKeyword } from '../actions/KeywordActions'
import UpdateKeywordForm from './UpdateKeywordForm'

const mapDispatchToProps = (dispatch) => {
    return {
        deleteKeyword: id => dispatch(deleteKeyword(id))
    }
}

class ConnectedKeyword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showKeyword: false,
            showKeywordForm: false
        }

        this.handleDeleteKeyword = this.handleDeleteKeyword.bind(this)
        this.toggleShowKeyword = this.toggleShowKeyword.bind(this)
        this.toggleUpdateKeyword = this.toggleUpdateKeyword.bind(this)
        this.hideUpdateKeyword = this.hideUpdateKeyword.bind(this)
    }

    handleDeleteKeyword() {
        this.props.deleteKeyword({
            keyword: this.props.keyword,
            place: this.props.place
        })
    }

    toggleShowKeyword() {
        const titleText = document.getElementById("keywordListTitle" + this.props.keyword.id)
        const keywordDiv = document.getElementById("keywordListObject" + this.props.keyword.id)

        if (this.state.showKeyword) {
            titleText.style.color = "orange"
            keywordDiv.classList.remove("linearGradient")
            this.hideUpdateKeyword()
        } else {
            titleText.style.color = "gold"
            keywordDiv.classList.add("linearGradient")
        }

        this.setState({ showKeyword: !this.state.showKeyword })
    }

    toggleUpdateKeyword = (event) => {
        event.preventDefault()

        !this.state.showKeywordForm ? event.target.classList.add("goldenButton") : event.target.classList.remove("goldenButton")
        this.setState({ showKeywordForm: !this.state.showKeywordForm })
    }

    hideUpdateKeyword() {
        this.setState({
            showKeywordForm: false
        })

        let button = document.getElementById("updateKeywordButton")
        button.classList.remove("goldenButton")
    }

    render() {
        return (
            <div key={this.props.keyword.id} className="keywordListObject" id={"keywordListObject" + this.props.keyword.id}>
                <span onClick={this.toggleShowKeyword} className="keywordListTitle" id={"keywordListTitle" + this.props.keyword.id}>{this.props.keyword.title}</span>
                {this.state.showKeyword ?
                    <div className="keywordInfo">
                        <div className="keywordButtons">
                            <button onClick={this.handleDeleteKeyword} className="deleteKeywordButton">Delete keyword</button>
                            <button onClick={this.toggleUpdateKeyword} className="updateKeywordButton" id="updateKeywordButton">Update keyword</button>
                        </div>
                        {this.state.showKeywordForm ?
                            <UpdateKeywordForm
                                keyword={this.props.keyword}
                                place={this.props.place}
                                hideUpdateKeyword={this.hideUpdateKeyword}
                            />
                        : null}
                    </div>
                : null}
            </div>
        )
    }
}

const Keyword = connect(null, mapDispatchToProps)(ConnectedKeyword)

export default Keyword