import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/ClassSchedule" + "/classroom/" + id,
        headers
    }
    return connection.sendPetition(config);
}
