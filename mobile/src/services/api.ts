import axios from "axios"


export const api = axios.create({
    /* Coloque o seu ip! ele aparece na execução do expo start ip:3333 */
    baseURL: 'http://192.168.1.4:3333'
})