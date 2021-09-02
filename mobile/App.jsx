import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Provider } from 'react-redux';
import Routes from './src/routes';
import store from './src/store';

const App = () => (
  <Provider store={store}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
    <Routes />
  </Provider>
);

export default App;
