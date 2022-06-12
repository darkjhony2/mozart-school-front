import * as connection from './connection'
import {URL_API} from '../config'

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/DocumentType"
    }
    return connection.sendPetition(config);
}
