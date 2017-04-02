import React from 'react';

import _ from 'lodash';

import './Cuenta.css';


class Cuenta extends React.Component {

  getLines() {
    if (!this.props.cuenta) return [];
    return _.map(
      _.countBy(this.props.cuenta.items, key => key),
      (count, key) => ({
        item: _.find(this.props.items, item => item.key === key),
        count
      })
    );
  }

  getTotal() {
    return _.reduce(
      this.getLines(),
      (accum, line) => accum + line.count * line.item.valor,
      0.0
    );
  }

  render() {
    return (
      <div className="cuenta">
        <ul className="cuenta-lineas">
          {_.map(this.getLines(), linea => (
            <li className="cuenta-linea" key={linea.item.key}>
              {`${linea.count} ${linea.item.nombre}`}
            </li>
          ))}
        </ul>
        <div className="cuenta-total">
          <h2>Total: {this.getTotal()}</h2>
        </div>
        {this.props.cuenta && this.props.pagar && (
          <div
            className="cuenta-pagar"
            onClick={this.props.pagar}
          >
            <button>Pagar</button>
          </div>
        )}
      </div>
    )
  }
}

export default Cuenta;