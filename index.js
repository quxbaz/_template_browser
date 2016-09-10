import React from 'react'
import {render} from 'react-dom'
import App from './src/App'

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
  module.hot.accept('./src/App', () => {
    const NextApp = require('./src/App').default
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      root
    )
  })
}
