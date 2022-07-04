import * as connection from './connection'
import {URL_API} from '../config'

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/AcademicPeriod",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (academicPeriod) => {
    let config = {
        url: URL_API + "api/AcademicPeriod",
        headers
    }
    if(academicPeriod.id != undefined){
        let configEdit = {
            url: URL_API + "api/AcademicPeriod/" + academicPeriod.id,
            headers
        }
        if(academicPeriod.id.trim() != ""){
            return connection.sendPutBody(configEdit, academicPeriod);
        }
    } else {
        return connection.sendPostBody(config,academicPeriod);
    }
}

export const deleteAcademicPeriod = (id) => {
    const url = URL_API + "api/AcademicPeriod/" + id;
    return connection.sendDeleteBody(url);
}