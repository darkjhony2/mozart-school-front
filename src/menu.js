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
import AcademicPeriods from './pages/academicPeriod/academicPeriods';
import Attendances from './pages/attendances/attendances';
import Login from './login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import EvaluationTypes from './pages/evaluationTypes/evaluationTypes';
import Evaluations from './pages/evaluations/evaluations';

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            isOpen: false,
            url_root: '',
            owl: localStorage.getItem('owl')
        }
        console.log(localStorage.getItem('owl'))
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
                    <NavbarBrand href={'/home'}>
                        <img src={logo} className="img-fluid" style={{ maxHeight: 50 }}></img>
                        <span className='font-white'><b>COLEGIO AMADEO MOZART</b></span>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            {
                                localStorage.getItem('owl') != undefined ?
                                    <>
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
                                                    <DropdownItem href={this.state.url_root + "/academicPeriods"}>
                                                        <span >Período académico</span>
                                                    </DropdownItem>
                                                    <DropdownItem href={this.state.url_root + "/evaluationTypes"}>
                                                        <span >Tipos de Evaluaciones</span>
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
                                                    Gestión
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem href={this.state.url_root + "/attendance"}>
                                                        <span >Asistencia</span>
                                                    </DropdownItem>
                                                    <DropdownItem href={this.state.url_root + "/evaluations"}>
                                                        <span >Evaluaciones</span>
                                                    </DropdownItem>
                                                    <DropdownItem href={this.state.url_root + "/grades"}>
                                                        <span >Notas</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </NavItem>
                                    </>
                                    :
                                    ""
                            }
                        </Nav>
                        {
                            localStorage.getItem('owl') == undefined?
                            ""
                            :
                            <div style={{ float: 'right'}}>
                            <div>
                                <UncontrolledDropdown>
                                    <DropdownToggle style={{backgroundColor: 'rgb(4, 76, 161)'}}
                                        caret>
                                        <FontAwesomeIcon icon={faCog} />
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem onClick={e => { localStorage.removeItem('owl'); window.location.href = window.location.href = "http://localhost:3000/"; localStorage.removeItem('role') }}>
                                            <span >Cerrar Sesión</span>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </div>
                        </div>
                        }
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
                        <Route path={'/academicPeriods'} element={<AcademicPeriods />} />
                        <Route path={'/evaluations'} element={<Evaluations/>}></Route>
                        <Route path={'/attendance'} element={<Attendances />} />
                        <Route path={'/evaluationTypes'} element={<EvaluationTypes />} />
                        <Route path={'/'} exact={true} element={localStorage.getItem('owl') == undefined ? <Login /> : <Home />} />
                        <Route path={'/home'} exact={true} element={localStorage.getItem('owl') == undefined ? <Login /> : <Home />} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

Menu.propTypes = {}

export default Menu