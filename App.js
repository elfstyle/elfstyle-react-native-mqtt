import React from 'react'
import { Provider } from 'react-redux'
import { ApplicationProvider } from './src/ApplicationContext'

import store from './src/store'
import Root from './src/routes'

class App extends React.Component {
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

export default App;