import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const listByClassroom = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/StudentClassroom/" + id + "/students",
        headers
    }
    return connection.sendPetition(config);
}