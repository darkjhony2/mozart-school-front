import * as connection from './connection'

const URL_API = "http://190.117.70.171:9981/"

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