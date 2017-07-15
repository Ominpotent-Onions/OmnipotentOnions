import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { BrowserRouter, Route, Link } from 'react-router-dom';

// import Main from './components/Main/index.js';

const Routes = () => (
  <div>
    {/*<Route path="/" component={Main} />*/}
    Hello World
  </div>
);

ReactDOM.render(<Routes />, document.getElementById("root"));
