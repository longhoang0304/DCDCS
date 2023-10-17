import React from 'react';
import { Provider } from 'react-redux';
import WelcomeStack from './config/routes';
import configureStore from './configureStore';

const store = configureStore();
const App = () => { // eslint-disable-line
  return (
    <Provider store={store}>
      <WelcomeStack />
    </Provider>
  );
};

export default App;