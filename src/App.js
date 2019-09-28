import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar>
        <NavbarBrand href="/" className="mr-auto">Early Morning</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
      </Navbar>
      <div className='content'>
        
      </div>
    </div>
  );
}

export default App;
