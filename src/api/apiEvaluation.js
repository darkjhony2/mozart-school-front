import * as connection from './connection'
import { URL_API } from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const list = () => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Evaluation",
        headers
    }
    return connection.sendPetition(config);
}

export const save = (evaluation) => {
    let config = {
        url: URL_API + "api/Evaluation",
        headers
    }
    return connection.sendPostBody(config, evaluation);
}

export const saveEvaluationGrades = (grades, id) => {
    let config = {
        url: URL_API + "api/Evaluation/" + id + "/Scores",
        headers
    }
    return connection.sendPostBody(config, grades);
}

export const listGrades = (id) => {
    let config = {
        method: 'GET',
        url: URL_API + "api/Evaluation/" + id + "/Scores",
        headers
    }
    return connection.sendPetition(config);
}