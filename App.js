import React from 'react'
import { Provider } from 'react-redux'
import store from './src/store'

import { ApplicationProvider } from './ApplicationContext'
import Root from './routes'



export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ApplicationProvider>
          <Root />
        </ApplicationProvider>
      </Provider>
    );
  }
}
