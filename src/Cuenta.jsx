import React from 'react';

import _ from 'lodash';
import numeral from 'numeral';

import './Cuenta.css';


class Linea extends React.PureComponent {
  render() {
    if (!this.props.item) return null;
    return (
      <div className='linea'>
        <div
          className='linea-imagen'
          style={{
            backgroundImage: `url(${this.props.item.imagen})`
          }}
        />
        <span className='linea-nombre'>
          {this.props.item.nombre}
        </span>
        <span className="linea-controles">
          {_.isFunction(this.props.quitar) && (
            <button
              className='linea-boton-quitar'
              onClick={() => this.props.quitar(this.props.item.key)}
            >
              -
            </button>
          )}
          <span className="linea-cuenta">
            {this.props.count}
          </span>
          {_.isFunction(this.props.agregar) && (
            <button
              className='linea-boton-agregar'
              onClick={() => this.props.agregar(this.props.item.key)}
            >
              +
            </button>
          )}
        </span>
      </div>
    )
  }
}


Linea.propTypes = {
  item: React.PropTypes.shape({
    imagen: React.PropTypes.string.isRequired,
    nombre: React.PropTypes.string.isRequired,
    key: React.PropTypes.string.isRequired,
  }).isRequired,
  count: React.PropTypes.number.isRequired,
  agregar: React.PropTypes.func,
  quitar: React.PropTypes.func,
}


export {Linea};


class Cuenta extends React.Component {

  getLines() {
    if (!this.props.cuenta) return [];
    return _.sortBy(_.map(
      _.countBy(this.props.cuenta.items, key => key),
      (count, key) => ({
        item: _.find(this.props.items, item => item.key === key),
        count
      })
    ), line => line.item.key);
  }

  getTotal() {
    return _.reduce(
      this.getLines(),
      (accum, line) => accum + line.count * line.item.valor,
      0.0
    );
  }

  render() {
    const lines = this.getLines();
    if (lines.length === 0) return (
      <div className='cuenta'>
        <p className='success'>
          Agrega platos desde el menu para realizar tu pedido.
        </p>
      </div>
    );
    return (
      <div className="cuenta">
        <div className="cuenta-lineas">
          {_.map(lines, line => (
            <Linea
              {...line}
              agregar={this.props.agregar}
              quitar={this.props.quitar}
              key={line.item.key}
            />
          ))}
        </div>
        <div className="cuenta-total">
          <h2>Total: {numeral(this.getTotal()).format('$0,0')}</h2>
        </div>
        {this.props.cuenta && this.props.pagar && (
          <button
            className='cuenta-pagar black'
            onClick={this.props.pagar}
          >
            Pagar
           </button>
        )}
      </div>
    )
  }
}

export default Cuenta;