import React, { Component } from 'react'
import { connect } from "react-redux"
import { createKeyword } from '../actions/KeywordActions'

function mapDispatchToProps(dispatch) {
    return {
        createKeyword: keyword => dispatch(createKeyword(keyword))
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

class ConnectedKeywordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            keywordTitle: "",
            placeId: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleFormDisplay = this.toggleFormDisplay.bind(this)
        this.hideForm = this.hideForm.bind(this)
        this.handleMouseOverLabel = this.handleMouseOverLabel.bind(this)
        this.handleMouseOutLabel = this.handleMouseOutLabel.bind(this)
        this.handleMouseOverInput = this.handleMouseOverInput.bind(this)
        this.handleMouseOutInput = this.handleMouseOutInput.bind(this)
    }

    componentDidMount() {
        this.setState({ placeId: this.props.place.id })
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        const keywordTitle = this.state.keywordTitle

        this.props.createKeyword({
            title: keywordTitle,
            place: this.state.placeId
        })

        this.setState({
            keywordTitle: ""
        })

        this.hideForm()
    }

    toggleFormDisplay(event) {
        event.preventDefault()

        let form = document.getElementById("createKeywordForm")

        form.style.display === "none" ? event.target.classList.add("goldenButton") : event.target.classList.remove("goldenButton")
        
        form.style.display === "none" ? form.style.display = "block" : form.style.display = "none"
        document.getElementById("keywordTitle").focus()
    }

    hideForm() {
        let form = document.getElementById("createKeywordForm")
        form.style.display = "none"

        let button = document.getElementById("addKeywordButton")
        button.classList.remove("goldenButton")
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
        const formStyle = {
            display: "none"
        }

        return (
            <div className="keywordForm">
                <button onClick={this.toggleFormDisplay} className="addKeywordButton" id="addKeywordButton">Add keyword</button>
                <div className="createKeywordForm" id="createKeywordForm" style={formStyle}>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="createKeywordFormRow">
                            <label htmlFor="keywordTitle" className="createKeywordLabel" onMouseOver={this.handleMouseOverLabel} onMouseOut={this.handleMouseOutLabel}>Title</label>
                            <input type="text" className="createKeywordInput" id="keywordTitle" value={this.state.keywordTitle} onChange={this.handleChange} onMouseOver={this.handleMouseOverInput} onMouseOut={this.handleMouseOutInput} />
                        </div>
                        <button type="submit" className="createKeywordSaveButton">Save keyword</button>
                    </form>
                </div>
            </div>
        )
    }
}

const KeywordForm = connect(null, mapDispatchToProps)(ConnectedKeywordForm)

export default KeywordForm