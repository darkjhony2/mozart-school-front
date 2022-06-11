import * as connection from './connection'
import {URL_API} from '../config'

export const list = (year) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Classroom" + "?year=" + year
    }
    return connection.sendPetition(config);
}

export const save = (classroom) => {
    let config = {
        url: URL_API + "api/Classroom",
    }
    if(classroom.id != undefined){
        let configEdit = {
            url: URL_API + "api/Classroom/" + classroom.id,
        }
        if(classroom.id.trim() != ""){
            return connection.sendPutBody(configEdit, classroom);
        }
    } else {
        return connection.sendPostBody(config,classroom);
    }
}