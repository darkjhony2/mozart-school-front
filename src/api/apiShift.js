import * as connection from './connection'

const URL_API = "http://190.117.70.171:9981/"

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
        if(shift.id.trim() != ""){
            return connection.sendPutBody(configEdit, shift);
        }
    } else {
        return connection.sendPostBody(config,shift);
    }
}