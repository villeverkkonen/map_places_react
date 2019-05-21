import React, { Component } from 'react'
import { connect } from "react-redux"
import { updateKeyword } from '../actions/KeywordActions'

function mapDispatchToProps(dispatch) {
    return {
        updateKeyword: keyword => dispatch(updateKeyword(keyword))
    }
}

function changeLabelColor(inputId, color) {
    var labels = document.getElementsByTagName('LABEL')
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor === inputId) {
            var input = document.getElementById(labels[i].htmlFor)
            if (input)
                input.label = labels[i]
                input.label.style.color = color
                break
        }
    }
}

function changeInputColor(inputId, color) {
    var input = document.getElementById(inputId)
    input.style.backgroundColor = color
}

class ConnectedUpdateKeywordForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            updateKeywordTitle: "",
            id: "",
            placeId: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleMouseOverLabel = this.handleMouseOverLabel.bind(this)
        this.handleMouseOutLabel = this.handleMouseOutLabel.bind(this)
        this.handleMouseOverInput = this.handleMouseOverInput.bind(this)
        this.handleMouseOutInput = this.handleMouseOutInput.bind(this)
    }

    componentDidMount() {
        this.setState({
            updateKeywordTitle: this.props.keyword.title,
            id: this.props.keyword.id,
            placeId: this.props.place.id
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.dataset.id]: event.target.value
        })
    }

    handleUpdate(event) {
        event.preventDefault()

        this.props.updateKeyword({
            title: this.state.updateKeywordTitle,
            id: this.state.id
            // placeId: this.state.placeId
        })

        this.setState({
            updateKeywordTitle: "",
        })

        this.props.hideUpdateKeyword()
    }

    handleMouseOverInput(event) {
        event.preventDefault()
        changeLabelColor(event.target.id, "gold")
        changeInputColor(event.target.id, "gold")
    }

    handleMouseOutInput(event) {
        event.preventDefault()
        changeLabelColor(event.target.id, "orange")
        changeInputColor(event.target.id, "orange")
    }

    handleMouseOverLabel(event) {
        event.preventDefault()
        changeLabelColor(event.target.htmlFor, "gold")
        changeInputColor(event.target.htmlFor, "gold")
    }

    handleMouseOutLabel(event) {
        event.preventDefault()
        changeLabelColor(event.target.htmlFor, "orange")
        changeInputColor(event.target.htmlFor, "orange")
    }

    render() {
        return (
            <div className="updateKeywordForm" id="updateKeywordForm">
                <form onSubmit={this.handleUpdate} autoComplete="off">
                    <div className="updateKeywordFormRow">
                        <label htmlFor={"updateKeywordTitle" + this.state.id} className="updateKeywordLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Title</label>
                        <input type="text" className="updateKeywordInput" id={"updateKeywordTitle" + this.state.id} data-id="updateKeywordTitle" value={this.state.updateKeywordTitle} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} autoFocus />
                    </div>
                    <button type="submit" className="updateKeywordSaveButton">Save keyword</button>
                </form>
            </div>
        )
    }
}

const UpdateKeywordForm = connect(null, mapDispatchToProps)(ConnectedUpdateKeywordForm)

export default UpdateKeywordForm