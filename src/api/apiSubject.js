import * as connection from './connection'

const URL_API = "https://localhost:7242/"

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Subject"
    }
    return connection.sendPetition(config);
}

export const save = (subject) => {
    let config = {
        url: URL_API + "api/Subject",
    }
    if(subject.id != undefined){
        let configEdit = {
            url: URL_API + "api/Subject/" + subject.id,
        }
        if(subject.id.trim() != ""){
            return connection.sendPutBody(configEdit, subject);
        }
    } else {
        return connection.sendPostBody(config,subject);
    }
}

export const deleteSubject = (id) => {
    const url = URL_API + "api/Subject/" + id;
    return connection.sendDeleteBody(url);
}