import React from 'react';
import Menu from './Menu';
import Cuenta from './Cuenta';

import * as firebase from 'firebase';
import _ from 'lodash';
import {parse} from 'querystring';

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
      menu: [],
      cuenta: null,
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

    const mesaId = this.getMesa();

    if (mesaId) {
      const cuentasRef = firebase.database().ref(
        `cuentas/${restaurantId}`
      );
      cuentasRef.on('value', snapshot => {
        let cuentaActiva = _.find(
          _.map(snapshot.val(), (cuenta, id) => ({...cuenta, id: id})),
          cuenta => cuenta.mesa === mesaId && cuenta.activa
        );
        this.setState({
          cuenta: cuentaActiva,
        });
      })
    }

  }

  crearCuenta(key) {
    const { restaurantId } = this.props.match.params;
    const chartItemId = Date.now();
    const chartId = Date.now();
    const path = `cuentas/${restaurantId}/${chartId}`;
    const updates = {
      [path]: {
        activa: true,
        mesa: this.getMesa(),
        items: {
          [chartItemId]: key,
        }
      },
    }
    firebase.database().ref().update(updates);
  }

  getMesa() {
    // the search is ?querystring so get rid of the ?
    const query = parse(this.props.location.search.slice(1));
    return query['mesa'];
  }

  addItemToChart(key) {
    if (!this.state.cuenta) this.crearCuenta(key);
    else {
      const chartItemId = Date.now();
      const { restaurantId } = this.props.match.params;
      const { id } = this.state.cuenta;
      const path = `cuentas/${restaurantId}/${id}/items/${chartItemId}`;
      const updates = {
        [path]: key,
      }
      firebase.database().ref().update(updates);
    }
  }

  pagarCuenta() {
    if (!this.state.cuenta) return;
    const { restaurantId } = this.props.match.params;
    const { id } = this.state.cuenta;
    const path = `cuentas/${restaurantId}/${id}/activa`;
    firebase.database().ref().update({[path]: false});
  }

  render() {
    const mesa = this.getMesa();
    return (
      <div className='restaurante'>
        <div className='encabezado' style={{
          backgroundImage: `url(${this.state.restaurante.imagen})`
        }}>
          <h1>{this.state.restaurante.nombre}</h1>
          <p>{this.state.restaurante.descripcion}</p>
        </div>
        <div className="cuerpo">
          {mesa && <Cuenta
            cuenta={this.state.cuenta}
            items={this.state.menu}
            pagar={this.pagarCuenta.bind(this)}
          />}
          <Menu
            items={this.state.menu}
            addItemToChart={mesa ? this.addItemToChart.bind(this) : null}
          />
        </div>
      </div>
    );
  }
}


export default Restaurante;
