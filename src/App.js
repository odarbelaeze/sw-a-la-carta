import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Restaurante from './Restaurante';

import * as firebase from 'firebase';

import './App.css';

const Home = () => (
  <div className='home'>
    <h1>Pagina de inicio</h1>
    <p>Opcionalmente podemos tener una navegacion</p>
  </div>
);

const Mesa = ({match}) => (
  <div className='mesa'>
    <h1>Hola!</h1>
    <p>Opcionalmente podemos tener una navegacion</p>
    <p>usted esta en una mesa</p>
    <p>{match.params.mesaId}</p>
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
          <Route path='/mesa/:mesaId' component={Mesa} />
        </div>
      </Router>
    );
  }
}

export default App;
