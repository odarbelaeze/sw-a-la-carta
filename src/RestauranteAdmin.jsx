import React from 'react';
import Cuenta from './Cuenta';

import _ from 'lodash';
import * as firebase from 'firebase';

import './RestauranteAdmin.css';


class RestauranteAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurante: {},
      cuentas: [],
    };
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
      snapshot => this.setState({ menu: snapshot.val(), })
    );

    const cuentasRef = firebase.database().ref(
      `cuentas/${restaurantId}`
    );
    cuentasRef.on(
      'value',
      snapshot => this.setState({ cuentas: snapshot.val(), })
    )
  }

  cuentas() {
    if (!this.state.cuentas) return [];
    console.log(this.state.cuentas);
    return _.map(this.state.cuentas, (cuenta, id) => ({...cuenta, id: id}));
  }

  cuentasActivas() {
    return _.filter(this.cuentas(), cuenta => cuenta.activa);
  }

  cuentasInactivas() {
    return _.filter(this.cuentas(), cuenta => !cuenta.activa);
  }

  agregar(cuenta, key) {
    const chartItemId = Date.now();
    const { restaurantId } = this.props.match.params;
    const path = `cuentas/${restaurantId}/${cuenta}/items/${chartItemId}`;
    const updates = { [path]: key, }
    firebase.database().ref().update(updates);
  }

  quitar(cuenta, key) {
    const chartItemId = _.findKey(this.state.cuentas[cuenta].items, val => val === key);
    if (!chartItemId) return;
    const { restaurantId } = this.props.match.params;
    const path = `cuentas/${restaurantId}/${cuenta}/items/${chartItemId}`;
    firebase.database().ref(path).remove();
  }

  pagar(cuenta) {
    const { restaurantId } = this.props.match.params;
    const path = `cuentas/${restaurantId}/${cuenta}/activa`;
    firebase.database().ref().update({[path]: false});
  }

  render() {
    return (
      <div className="restaurante-admin">
        <div className='encabezado' style={{
          backgroundImage: `url(${this.state.restaurante.imagen})`
        }}>
          <h1>{this.state.restaurante.nombre}</h1>
          <p>{this.state.restaurante.descripcion}</p>
        </div>
        <div className="cuerpo">
          <h2>Cuentas activas</h2>
          <div className="cuentas-activas">
            {
              _.map(this.cuentasActivas(), cuenta => (
                <Cuenta
                  cuenta={cuenta}
                  key={cuenta.id}
                  items={this.state.menu}
                  agregar={this.agregar.bind(this, cuenta.id)}
                  quitar={this.quitar.bind(this, cuenta.id)}
                  pagar={this.pagar.bind(this, cuenta.id)}
                />
              ))
            }
          </div>
          <h2>Historial</h2>
          <div className="cuentas-historial">
            {
              _.map(this.cuentasInactivas(), cuenta => (
                <Cuenta
                  cuenta={cuenta}
                  key={cuenta.id}
                  items={this.state.menu}
                />
              ))
            }
          </div>
        </div>
      </div>
    )
  }
};


export default RestauranteAdmin;