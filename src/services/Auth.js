import axios from "axios";

const baseUrl = "https://restnorth-eehxe4awgvg7ajb2.northeurope-01.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }