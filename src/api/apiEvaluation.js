import * as connection from './connection'
import { URL_API } from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Evaluation",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (evaluation) => {
    let config = {
        url: URL_API + "api/Evaluation",
        headers
    }
    return connection.sendPostBody(config, evaluation);
}