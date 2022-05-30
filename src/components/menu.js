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
                <Navbar className='ps-3 pe-3 bg-aqua'
                    style={{ borderBottom: "1px solid black" }}
                    expand="md"
                    light
                >
                    <NavbarBrand href="/">
                        <span className='font-white'>COLEGIO AMADEO MOZART</span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <NavLink href="subjects">
                                    <span className='font-white'>Materias</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="academicLevels">
                                <span className='font-white'>Grados</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="sections">
                                <span className='font-white'>Secciones</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="shifts">
                                <span className='font-white'>Turnos</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="teachers">
                                    <span className='font-white'>Docentes</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="students">
                                <span className='font-white'>Alumnos</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="classroom">
                                    Salones de Clase
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