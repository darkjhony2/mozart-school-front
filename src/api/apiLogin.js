import * as connection from './connection'
import {URL_API} from '../config'

const headers = {
    "Authorization": localStorage.getItem('owl'),
}

export const login = (data) => {
    let config = {
        url: URL_API + "api/Account/Login",
        headers
    }
    return connection.sendPostBody(config, data)
}