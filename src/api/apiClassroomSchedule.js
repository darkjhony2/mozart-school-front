import * as connection from './connection'
import {URL_API} from '../config'

export const list = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/ClassSchedule" + "/classroom/" + id
    }
    return connection.sendPetition(config);
}
