import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Subjects from '../pages/subjects/subjects';
import Home from '../pages/home'
import AcademicLevels from '../pages/academicLevels/academicLevels';
import Sections from '../pages/sections/sections';
import Shifts from '../pages/shifts/shifts';
import Teachers from '../pages/teachers/teachers';

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
                    style={{ borderBottom: "1px solid black" }}
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
                            <NavItem>
                                <NavLink href="academicLevels">
                                    Grados
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="sections">
                                    Secciones
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="shifts">
                                    Turnos
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="teachers">
                                    Docentes
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/subjects'} element={<Subjects />} />
                        <Route path={'/academicLevels'} element={<AcademicLevels />} />
                        <Route path={'/sections'} element={<Sections />} />
                        <Route path={'/shifts'} element={<Shifts />} />
                        <Route path={'/teachers'} element={<Teachers />} />
                        <Route path={'/'} exact={true} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

Menu.propTypes = {}

export default Menu