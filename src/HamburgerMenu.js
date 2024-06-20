import React from 'react'
import { slide as Menu } from 'react-burger-menu'

class BurgerMenu extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render (Navigate) {
    if (Navigate == undefined) {
      Navigate = () => {}
    }
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
      <Menu>
        <h2 id="heading" className="menu-header">Schedo</h2>
        <a id="home" className="menu-item" href="/" onClick={Navigate("home")}>Home</a>
        <a id="about" className="menu-item" href="/about">Tasks</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}

export default BurgerMenu