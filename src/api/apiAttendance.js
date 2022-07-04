import * as connection from './connection'
import { URL_API } from '../config'

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

export const save = (attendance,id,date) => {
    let config = {
        url: URL_API + "api/AttendanceRecord/classroom/" + id + "/date/" + date,
        headers
    }
    return connection.sendPostBody(config, attendance);
}

export const deleteAcademicLevel = (id) => {
    const url = URL_API + "api/AcademicLevel/" + id;
    let config = {
        headers
    }
    return connection.sendDeleteBody(url, config);
}