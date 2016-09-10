// Import test runners here

import React from 'react'
import {render} from 'react-dom'
import App from './App'

let AppContainer
if (IS_HOT) {
  AppContainer = require('react-hot-loader').AppContainer
}

const root = document.getElementById('tests')

if (IS_HOT) {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    root
  )
} else {
  render(<App />, root)
}

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      root
    )
  })
}
