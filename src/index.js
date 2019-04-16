import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore } from 'redux'
import placeReducer from './reducers/PlaceReducer'
import './styles.css';

const store = createStore(placeReducer)

const renderApp = () => {
    ReactDOM.render(<App store={store} />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)