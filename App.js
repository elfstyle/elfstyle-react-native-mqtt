import React from 'react'
import { Provider } from 'react-redux'
import Application from './src/Application'

import store from './src/store'
import Root from './src/routes'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Application>
          <Root />
        </Application>
      </Provider>
    );
  }
}

export default App;