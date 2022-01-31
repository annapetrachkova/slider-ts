import fetch from 'cross-fetch';

const fetchWrapper = {
    post,
    get,
}
const url = "http://localhost:4000/"

function get(path: string) {
    const reqUrl = url + path
    const requestOptions = {
        method: 'GET'
    }
    return fetch(reqUrl, requestOptions).then(handleResponse)
}

export function post<T>(path: string, data: T) {
    const reqUrl = url + path
    const requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
    return fetch(reqUrl, requestOptions).then(handleResponse)
}


const handleResponse = (response: any) => response.json()

export default fetchWrapper

