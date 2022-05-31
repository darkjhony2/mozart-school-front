import * as connection from './connection'

const URL_API = "https://localhost:7242/"

export const list = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/ClassSchedule" + "/classroom/" + id
    }
    return connection.sendPetition(config);
}
