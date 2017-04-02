import React from 'react';
import _ from 'lodash';


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
          <p>{this.props.valor}</p>
        </div>
      </div>
    )
  }
}


MenuItem.propTypes = {
  imagen: React.PropTypes.string.isRequired,
  nombre: React.PropTypes.string.isRequired,
  valor: React.PropTypes.number.isRequired,
};

export {MenuItem};


class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <div className="menu-items">
          {_.map(this.props.items, item => (
            <MenuItem key={item.key} {...item} />
          ))}
        </div>
      </div>
    );
  }
}


Menu.propTypes = {
  items: React.PropTypes.arrayOf(MenuItem.propTypes).isRequired,
};


export default Menu;
