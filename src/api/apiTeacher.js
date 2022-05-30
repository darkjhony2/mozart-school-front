import * as connection from './connection'

const URL_API = "https://localhost:7242/"

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Teacher"
    }
    return connection.sendPetition(config);
}

export const save = (teacher) => {
    let config = {
        url: URL_API + "api/Teacher",
    }
    if(teacher.id != undefined){
        let configEdit = {
            url: URL_API + "api/Teacher/" + teacher.id,
        }
        if(teacher.id.trim() != ""){
            return connection.sendPutBody(configEdit, teacher);
        }
    } else {
        return connection.sendPostBody(config,teacher);
    }
}