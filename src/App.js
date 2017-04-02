import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

const Home = () => (
  <div className='home'>
    <h1>Pagina de inicio</h1>
    <p>Opcionalmente podemos tener una navegacion</p>
  </div>
);

const Restaurante = () => (
  <div className='restaurante'>
    <h1>Pagina de un restaurante</h1>
    <p>Opcionalmente podemos tener una navegacion</p>
  </div>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/restaurante' component={Restaurante} />
        </div>
      </Router>
    );
  }
}

export default App;
