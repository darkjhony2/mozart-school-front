import * as connection from './connection'
import {URL_API} from '../config'

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Student"
    }
    return connection.sendPetition(config);
}

export const save = (student) => {
    let config = {
        url: URL_API + "api/Student",
    }
    if(student.id != undefined){
        let configEdit = {
            url: URL_API + "api/Student/" + student.id,
        }
        if(student.id.trim() != ""){
            return connection.sendPutBody(configEdit, student);
        }
    } else {
        return connection.sendPostBody(config,student);
    }
}