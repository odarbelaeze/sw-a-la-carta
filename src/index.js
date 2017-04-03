import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDQMebeVl1wxeQbZ_pDe9p9Gnw4JFxVuIg",
  authDomain: "sw-a-la-carta.firebaseapp.com",
  databaseURL: "https://sw-a-la-carta.firebaseio.com",
  projectId: "sw-a-la-carta",
  storageBucket: "sw-a-la-carta.appspot.com",
  messagingSenderId: "155637912707"
};

firebase.initializeApp(config);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
