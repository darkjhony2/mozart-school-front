import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Subjects from '../pages/Subjects/subjects';
import Home from '../pages/home'

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        var value = !this.state.isOpen;
        this.setState({ isOpen: value });
    }

    render() {
        return (
            <div>
                <Navbar className='ps-3 pe-3 bg-blue'
                    style={{ borderBottom: "1px solid black"}}
                    color="light"
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        COLEGIO AMADEO MOZART
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink href="subjects">
                                    Materias
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/subjects'} element={<Subjects />} />
                        <Route path={'/'} exact={true} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

Menu.propTypes = {}

export default Menu