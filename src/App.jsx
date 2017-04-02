import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';

import Restaurante from './Restaurante';

import * as firebase from 'firebase';

import './App.css';


const Home = () => (
  <div className='home'>
    <h1>Pagina de inicio</h1>
    <p>
      <Link to="/restaurante/restaurante1">
        Ir a restaurante
    </Link>
    </p>
    <p>
      <Link to="/restaurante/restaurante1?mesa=mesa1">
        Ir a mesa
    </Link>
    </p>
  </div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
    });
    firebase.auth().signInAnonymously();
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/restaurante/:restaurantId' component={Restaurante} />
        </div>
      </Router>
    );
  }
}

export default App;
