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

const Mesa = ({match}) => (
  <div className='mesa'>
    <h1>Pagina de una mesa</h1>
    <p>Opcionalmente podemos tener una navegacion</p>
    <p>usted esta en una mesa</p>
    <p>{match.params.mesaId}</p>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/restaurante' component={Restaurante} />
          <Route path='/mesa/:mesaId' component={Mesa} />
        </div>
      </Router>
    );
  }
}

export default App;
