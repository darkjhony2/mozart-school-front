import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Subjects from './pages/subjects/subjects';
import Home from './pages/home'
import AcademicLevels from './pages/academicLevels/academicLevels';
import Sections from './pages/sections/sections';
import Shifts from './pages/shifts/shifts';
import Teachers from './pages/teachers/teachers';
import Students from './pages/students/students';
import Classrooms from './pages/classrooms/classrooms';
import logo from './assets/img/logo.png'

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            url_root: '/mozart-school-front'
        }
    }

    toggle = () => {
        var value = !this.state.isOpen;
        this.setState({ isOpen: value });
    }

    render() {
        return (
            <div>
                <Navbar className='ps-3 pe-3 bg-aqua'
                    style={{ borderBottom: "1px solid black" }}
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        <img src={logo} className="img-fluid" style={{ maxHeight: 50 }}></img>
                        <span className='font-white'><b>COLEGIO AMADEO MOZART</b></span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <UncontrolledDropdown
                                    inNavbar
                                    nav
                                >
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Admin.
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem href={this.state.url_root + '/subjects'}>
                                            <span>Materias</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/academicLevels"}>
                                            <span >Grados</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/sections"}>
                                            <span >Secciones</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/shifts"}>
                                            <span >Turnos</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/teachers"}>
                                            <span >Docentes</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/students"}>
                                            <span >Alumnos</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/classroom"}>
                                            <span >Salones de Clase</span>
                                        </DropdownItem>
                                        <DropdownItem href={this.state.url_root + "/classroom"}>
                                            <span >Período académico</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
                            <NavItem>
                                <UncontrolledDropdown
                                    inNavbar
                                    nav
                                >
                                    <DropdownToggle
                                        caret
                                        nav
                                    >
                                        Control
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <BrowserRouter basename={this.state.url_root}>
                    <Routes>
                        <Route path={'/subjects'} element={<Subjects />} />
                        <Route path={'/academicLevels'} element={<AcademicLevels />} />
                        <Route path={'/sections'} element={<Sections />} />
                        <Route path={'/shifts'} element={<Shifts />} />
                        <Route path={'/teachers'} element={<Teachers />} />
                        <Route path={'/students'} element={<Students />} />
                        <Route path={'/classroom'} element={<Classrooms />} />
                        <Route path={'/'} exact={true} element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

Menu.propTypes = {}

export default Menu