import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

// import Login from './components/Login/index.js';
import Main from './components/index';

<<<<<<< HEAD
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const Routes = () => (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/main" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<Routes />, document.getElementById('root'));
=======
// import Main from './components/Main/index.js';

const Routes = () => (
  <div>
    {/*<Route path="/" component={Main} />*/}
    Hello World
  </div>
);

ReactDOM.render(<Routes />, document.getElementById("root"));
>>>>>>> Clean up server code
