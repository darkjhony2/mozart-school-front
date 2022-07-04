import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = (year) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Classroom" + "?year=" + year,
        headers
    }
    return connection.sendPetition(config);
}

export const save = (classroom) => {
    let config = {
        url: URL_API + "api/Classroom",
        headers
    }
    if(classroom.id != undefined){
        let configEdit = {
            url: URL_API + "api/Classroom/" + classroom.id,
            headers
        }
        if(classroom.id.trim() != ""){
            return connection.sendPutBody(configEdit, classroom);
        }
    } else {
        return connection.sendPostBody(config,classroom);
    }
}