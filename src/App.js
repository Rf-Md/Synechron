import React, { Component, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './store/store';

import Ingredients from './components/Ingredients'
import CheckOutPage from './components/CheckOutPage'
const LandingPage = lazy(() => import('./components/LandingPage'));


const NoMatchComponent = ({ location }) => {
  return (
    <div>
      <h3>
        No Match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
};

class App extends Component {
  render() {
    const { store, persistor } = configureStore();
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Suspense fallback={<div>Loading the page...</div>}>
              <Switch>
                <Redirect exact from="/" to="/landingPage" />
                <Route exact path="/landingPage" component={LandingPage} />
                <Route exact path="/ingredients" component={Ingredients} />
                <Route exact path="/checkOutPage" component={CheckOutPage} />
                <Route component={NoMatchComponent} />
              </Switch>
            </Suspense>
          </Router>
        </PersistGate>
      </Provider >
    );
  }
}

export default App;



