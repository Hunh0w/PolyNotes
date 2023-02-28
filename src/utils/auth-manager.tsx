import {url} from "./conf";


export function isConnected(): Promise<Boolean> {
    const token = localStorage.getItem("access_token")

    if(!token) return new Promise(() => false);
    return fetch(url + "/verify", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    }).then(resp => resp.status === 200);
}