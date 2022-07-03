import * as connection from './connection'
import {URL_API} from '../config'

export const login = (data) => {
    let config = {
        url: URL_API + "api/Account/Login",
    }
    return connection.sendPostBody(config, data)
}