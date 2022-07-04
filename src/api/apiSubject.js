import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Subject",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (subject) => {
    let config = {
        url: URL_API + "api/Subject",
        headers
    }
    if(subject.id != undefined){
        let configEdit = {
            url: URL_API + "api/Subject/" + subject.id,
            headers
        }
        if(subject.id.trim() != ""){
            return connection.sendPutBody(configEdit, subject);
        }
    } else {
        return connection.sendPostBody(config,subject);
    }
}

export const deleteSubject = (id) => {
    const url = URL_API + "api/Subject/" + id;
    return connection.sendDeleteBody(url);
}