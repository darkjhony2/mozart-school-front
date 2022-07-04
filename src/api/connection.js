import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

export const sendPetition = async (config) => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        if(error.response.status == 401){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Sera redireccionado al login',
            });
            setTimeout(function(){
                window.location.href = "http://localhost:3000/";
            }, 2000);
            return;
        }
        if(error.response == undefined){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });
            return error;
        } else {
            MySwal.fire({
                icon: 'error',
                title: error,
                text: error.response.data,
            });
            return error;
        }
    }
}

export const sendPostBody = async (config, body) => {
    try {
        const response = await axios.post(config.url, body, config);
        return response.data;
    } catch (error) {
        if(error.response.status == 401){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Sera redireccionado al login',
            });
            setTimeout(function(){
                window.location.href = "http://localhost:3000/";
            }, 2000);
            return;
        }
        if(error.response != undefined && error.response.data != undefined){
            MySwal.fire({
                icon: 'error',
                title: error,
                text: error.response.data,
            });
            return error;
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });
            return error;
        }
    }
}

export const sendDeleteBody = async (url,config) => {
    try {
        const response = await axios.delete(url, config);
        return response.data;
    } catch (error) {
        console.log(error)
        if(error.response.status == 401){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Sera redireccionado al login',
            });
            setTimeout(function(){
                window.location.href = "http://localhost:3000/";
            }, 2000);
            return;
        }
        if(error.response != undefined && error.response.data != undefined){
            MySwal.fire({
                icon: 'error',
                title: error,
                text: error.response.data,
            });
            return error;
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });
            return error;
        }
    }
}

export const sendPutBody = async (config, body) => {
    try {
        const response = await axios.put(config.url, body, config);
        return response.data;
    } catch (error) {
        if(error.response.status == 401){
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Sera redireccionado al login',
            });
            setTimeout(function(){
                window.location.href = "http://localhost:3000/";
            }, 2000);
            return;
        }
        if(error.response != undefined && error.response.data != undefined){
            MySwal.fire({
                icon: 'error',
                title: error,
                text: error.response.data,
            });
            return error;
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error,
            });
            return error;
        }
    }
}