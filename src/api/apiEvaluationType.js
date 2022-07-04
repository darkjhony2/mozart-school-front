import * as connection from './connection'
import { URL_API } from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/EvaluationType",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (evaluationType) => {
    let config = {
        url: URL_API + "api/EvaluationType",
        headers
    }
    return connection.sendPostBody(config, evaluationType);
}

export const deleteEvaluationType = (id) => {
    const url = URL_API + "api/EvaluationType/" + id;
    let config = {
        headers
    }
    return connection.sendDeleteBody(url, config);
}