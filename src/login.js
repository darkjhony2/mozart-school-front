import React, { useState } from 'react'
import {Container} from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as apiLogin from './api/apiLogin'
import './assets/style/LoginUi.css';
import profile from "./assets/img/user.png";
import email from "./assets/img/email.jpg";
import pass from "./assets/img/pass.png";

const Login = props => {

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const MySwal = withReactContent(Swal)

    async function login() {
        let credentials = {};
        if (user == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "El campo usuario esta vacío",
            });
            return;
        } else {
            credentials.username = user;
        }
        if (password == "") {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: "El campo contraseña esta vacío",
            });
            return;
        } else {
            credentials.password = password;
        }
        let response = await apiLogin.login(credentials);
        console.log(response);
        if (response.response != undefined) {
            if (response.response.status != 401) {
                localStorage.setItem('owl', 'Bearer ' + response.accessToken);
                localStorage.setItem('role', response.role);
                setUser("");
                setPassword("")
                window.location.href = "http://localhost:3000/home";
            }
        } else {
            localStorage.setItem('owl', 'Bearer ' + response.accessToken);
            localStorage.setItem('role', response.role);
            setUser("");
            setPassword("")
            window.location.href = "http://localhost:3000/home";
        }
    }

    return (
        <Container fluid className='p-4 bg-smoke' style={{ height: window.innerHeight }}>
            <div className="main">
                <div className="sub-main">
                    <div>
                        <div className="imgs">
                            <div className="container-image">
                                <img src={profile} alt="profile" className="profile" />

                            </div>

                        </div>
                        <div>
                            <h1 className='mb-4'>Login Page</h1>
                            <div>
                                <img src={email} alt="email" className="email" />
                                <input 
                                    size='sm'
                                    type="text" 
                                    placeholder="username" 
                                    className="name" 
                                    value={user} 
                                    name="user" 
                                    onChange={e => setUser(e.target.value)}
                                />
                            </div>
                            <div className="second-input">
                                <img src={pass} alt="pass" className="email" />
                                <input 
                                    size='sm'
                                    type="password" 
                                    placeholder="password" 
                                    className="name" 
                                    name="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="login-button mt-3">
                                <button size='sm' onClick={e => login()}>Login</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Container>
    )
}

export default Login