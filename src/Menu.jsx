import React from 'react';

import _ from 'lodash';
import numeral from 'numeral';

import './Menu.css'


class MenuItem extends React.Component {
  render() {
    return (
      <div
        className="menu-item"
        style={{
          backgroundImage: `url(${this.props.imagen})`
        }}
      >
        <div className="menu-item-info">
          <h3>{this.props.nombre}</h3>
          <p>{numeral(this.props.valor).format('$0,0')}</p>
          {this.props.addItemToChart && (
            <button onClick={this.props.addItemToChart}>
              Agregar
            </button>
          )}
        </div>
      </div>
    )
  }
}


MenuItem.propTypes = {
  imagen: React.PropTypes.string.isRequired,
  nombre: React.PropTypes.string.isRequired,
  valor: React.PropTypes.number.isRequired,
  addItemToChart: React.PropTypes.func,
};

export {MenuItem};


class Menu extends React.Component {
  render() {
    const { addItemToChart } = this.props;
    return (
      <div className="menu">
        <div className="menu-items">
          {_.map(this.props.items, item => (
            <MenuItem
              key={item.key}
              addItemToChart={
                _.isFunction(addItemToChart) ? () => addItemToChart(item.key) : null}
              {...item}
            />
          ))}
        </div>
      </div>
    );
  }
}


Menu.propTypes = {
  items: React.PropTypes.arrayOf(
    React.PropTypes.shape(MenuItem.propTypes)
  ).isRequired,
  addItemToChart: React.PropTypes.func,
};


export default Menu;
