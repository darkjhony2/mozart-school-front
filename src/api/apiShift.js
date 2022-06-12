import * as connection from './connection'
import {URL_API} from '../config'

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Shift"
    }
    return connection.sendPetition(config);
}

export const save = (shift) => {
    let config = {
        url: URL_API + "api/Shift",
    }
    if(shift.id != undefined){
        let configEdit = {
            url: URL_API + "api/Shift/" + shift.id,
        }
        if(shift.id > 0){
            return connection.sendPutBody(configEdit, shift);
        }
    } else {
        return connection.sendPostBody(config,shift);
    }
}

export const deleteShift = (id) => {
    const url = URL_API + "api/Shift/" + id;
    return connection.sendDeleteBody(url);
}