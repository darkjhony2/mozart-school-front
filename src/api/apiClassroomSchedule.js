import * as connection from './connection'

const URL_API = "http://190.117.70.171:9981/"

export const list = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/ClassSchedule" + "/classroom/" + id
    }
    return connection.sendPetition(config);
}
