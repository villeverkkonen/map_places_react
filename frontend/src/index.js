import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './stores/RootStore'
import './styles/styles.css'
import './styles/forms.css'
import './styles/aligned.css'
import './styles/responsive.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
