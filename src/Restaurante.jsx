import React from 'react';
import * as firebase from 'firebase';
import _ from 'lodash';

import './Restaurante.css';


class Restaurante extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurante: {
        nombre: '',
        imagen: '',
        descripcion: '',
      },
      menu: {}
    }
  }

  componentDidMount() {
    const { restaurantId } = this.props.match.params;
    const restaurantRef = firebase.database().ref(
      `restaurantes/${restaurantId}`
    );
    restaurantRef.on(
      'value',
      snapshot => this.setState({ restaurante: snapshot.val() })
    );
    const menuRef = firebase.database().ref(
      `menus/${restaurantId}`
    );
    menuRef.on(
      'value',
      snapshot => this.setState({ menu: snapshot.val() })
    );
  }

  render() {
    return (
      <div className='restaurante'>
        <div className='encabezado' style={{
          backgroundImage: `url(${this.state.restaurante.imagen})`
        }}>
          <h1>{this.state.restaurante.nombre}</h1>
          <p>{this.state.restaurante.descripcion}</p>
        </div>
        <div className="menu">
          {_.map(this.state.menu, (items, name) => (
            <div className='menu-section'>
              <h2>{name}</h2>
              <div className="menu-items">
                {_.map(items, item => (
                  <div
                    className="menu-item"
                    style={{
                      backgroundImage: `url(${item.imagen})`
                    }}
                    key={item.key}
                  >
                    <h2>{item.nombre}</h2>
                    <p>{item.valor}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}


export default Restaurante;
