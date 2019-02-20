import React from 'react';
import ReactDOM from 'react-dom';
import MacCalculator from './MacCalculator';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <div>
    <h1 className="title">React Mac Calculator</h1>
    <MacCalculator />
    <div className="credits-ctr">
      <p className="credits">Made with 💙by Daniel Zelaya.</p>
    </div>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
