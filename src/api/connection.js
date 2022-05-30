import axios from 'axios'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)

export const sendPetition = async (config) => {
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
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

export const sendDeleteBody = async (url) => {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
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