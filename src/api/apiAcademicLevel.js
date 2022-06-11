import * as connection from './connection'
import {URL_API} from '../config'

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/AcademicLevel"
    }
    return connection.sendPetition(config);
}

export const save = (academicLevel) => {
    let config = {
        url: URL_API + "api/AcademicLevel",
    }
    if(academicLevel.id != undefined){
        let configEdit = {
            url: URL_API + "api/AcademicLevel/" + academicLevel.id,
        }
        if(academicLevel.id.trim() != ""){
            return connection.sendPutBody(configEdit, academicLevel);
        }
    } else {
        return connection.sendPostBody(config,academicLevel);
    }
}