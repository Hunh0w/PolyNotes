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

export function getProfileInfos() {
    const token = localStorage.getItem("access_token");
    if(!token) return undefined;

    return JSON.parse(b64_to_utf8(token.split(".")[1]));
}


function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(window.atob(str)));
}