import React from 'react';
import './index.css';
import getApp from './get-app'
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom'

getApp().then((App: React.FC) =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
