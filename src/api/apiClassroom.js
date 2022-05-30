import * as connection from './connection'

const URL_API = "https://localhost:7242/"

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Classroom"
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