import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/AcademicLevel",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (academicLevel) => {
    let config = {
        url: URL_API + "api/AcademicLevel",
        headers
    }
    if(academicLevel.id != undefined){
        let configEdit = {
            url: URL_API + "api/AcademicLevel/" + academicLevel.id,
            headers
        }
        if(academicLevel.id> 0){
            return connection.sendPutBody(configEdit, academicLevel);
        }
    } else {
        return connection.sendPostBody(config,academicLevel);
    }
}

export const deleteAcademicLevel = (id) => {
    const url = URL_API + "api/AcademicLevel/" + id;
    let config = {
        headers
    }
    return connection.sendDeleteBody(url,config);
}