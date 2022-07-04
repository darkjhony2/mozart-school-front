import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Section",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (section) => {
    let config = {
        url: URL_API + "api/Section",
        headers
    }
    if(section.id != undefined){
        let configEdit = {
            url: URL_API + "api/Section/" + section.id,
            headers
        }
        if(section.id.trim() > 0){
            return connection.sendPutBody(configEdit, section);
        }
    } else {
        return connection.sendPostBody(config,section);
    }
}
export const deleteSection = (id) => {
    const url = URL_API + "api/Section/" + id;
    return connection.sendDeleteBody(url);
}