import * as connection from './connection'

const URL_API = "https://localhost:7242/"

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Section"
    }
    return connection.sendPetition(config);
}

export const save = (section) => {
    let config = {
        url: URL_API + "api/Section",
    }
    if(section.id != undefined){
        let configEdit = {
            url: URL_API + "api/Section/" + section.id,
        }
        if(section.id.trim() != ""){
            return connection.sendPutBody(configEdit, section);
        }
    } else {
        return connection.sendPostBody(config,section);
    }
}