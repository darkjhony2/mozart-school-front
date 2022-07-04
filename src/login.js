import React, { useState } from 'react'
import { Col, Container, Row, Card, Label, Input, Button } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as apiLogin from './api/apiLogin'

const Login = props => {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const MySwal = withReactContent(Swal)

    async function login() {
        let credentials = {};
        if(user == ""){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "El campo usuario esta vacío",
            });
            return;
        }else{
            credentials.username = user;
        }
        if(password == ""){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "El campo contraseña esta vacío",
            });
            return;
        }else{
            credentials.password = password;
        }
        let response = await apiLogin.login(credentials);
        localStorage.setItem('owl', 'Bearer ' + response.accessToken);
        setUser("");
        setPassword("")
        window.location.href = "http://localhost:3000/home";
    }

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <Row>
                <Col sm = "3">
                    <Card body>
                        <Row>
                            <Col sm="6">
                                <h4><b>Login</b></h4>
                            </Col>
                            <hr/>
                        </Row>
                        <Row>
                            <Col sm = "6">
                                <Label size='sm'>Usuario:</Label>
                                <Input size={'sm'} value = { user } name= "user" onChange = { e => setUser(e.target.value) } />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm = "6">
                                <Label size='sm'>Contraseña:</Label>
                                <Input size={'sm'} type='password' name= "password" value = { password } onChange = { e => setPassword(e.target.value) } />
                            </Col>
                        </Row>
                        <Row className='mt-3'>
                            <Col sm = "2">
                                <Button size='sm' onClick={ e => login()} >Ingresar</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Login