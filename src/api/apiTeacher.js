import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Teacher",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (teacher) => {
    let config = {
        url: URL_API + "api/Teacher",
        headers
    }
    if(teacher.id != undefined){
        let configEdit = {
            url: URL_API + "api/Teacher/" + teacher.id,
            headers
        }
        if(teacher.id.trim() != ""){
            return connection.sendPutBody(configEdit, teacher);
        }
    } else {
        return connection.sendPostBody(config,teacher);
    }
}

export const deleteTeacher = (id) => {
    const url = URL_API + "api/Teacher/" + id;
    let config = {
        headers
    }
    return connection.sendDeleteBody(url,config);
}