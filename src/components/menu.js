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
import Students from '../pages/students/students';
import Classrooms from '../pages/classrooms/classrooms';
import logo from '../assets/img/logo.png'

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            url_root: 'https://darkjhony2.github.io/mozart-school-front'
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
                        <img src={logo} className="img-fluid" style={{maxHeight: 50}}></img>
                        <span className='font-white'><b>COLEGIO AMADEO MOZART</b></span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink href={this.state.url_root + '/subjects'}>
                                    <span className='font-white'>Materias</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/academicLevels"}>
                                <span className='font-white'>Grados</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/sections"}>
                                <span className='font-white'>Secciones</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/shifts"}>
                                <span className='font-white'>Turnos</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/teachers"}>
                                    <span className='font-white'>Docentes</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/students"}>
                                <span className='font-white'>Alumnos</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href={this.state.url_root + "/classroom"}>
                                <span className='font-white'>Salones de Clase</span>
                                </NavLink>
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