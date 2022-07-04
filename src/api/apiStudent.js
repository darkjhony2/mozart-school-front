import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Student",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (student) => {
    let config = {
        url: URL_API + "api/Student",
        headers
    }
    if(student.id != undefined){
        let configEdit = {
            url: URL_API + "api/Student/" + student.id,
            headers
        }
        if(student.id.trim() != ""){
            return connection.sendPutBody(configEdit, student);
        }
    } else {
        return connection.sendPostBody(config,student);
    }
}

export const deleteStudent = (id) => {
    const url = URL_API + "api/Student/" + id;
    let config = {
        headers
    }
    return connection.sendDeleteBody(url,config);
}