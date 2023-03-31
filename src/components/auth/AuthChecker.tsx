import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/conf";
import Loader from "../loader/Loader";
import {PolyFileBase} from "../files/PolyFileBase";
import {getOwnedFiles} from "../../services/FilesService";

const UserContextDefault = {
    files: []
};

interface UserContextPrototype {
    files: PolyFileBase[]
}
export const UserContext = React.createContext<UserContextPrototype>(UserContextDefault);

interface APIResponse {
    files: PolyFileBase[]
    checked: boolean
}

export default function AuthChecker(props: { children: any, loading: boolean }) {

    const [ response, setResponse ] = useState<APIResponse>({files: [], checked: false});
    const navigate = useNavigate();

    const check = () => {
        const token = localStorage.getItem("access_token");
        if (!token) navigate("/login")

        const userCheckPromise = fetch(url + "/user_check", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status !== 200) {
                navigate("/login")
            }
            return response.status;
        });

        const getFilesPromise = getOwnedFiles();
        Promise.all([getFilesPromise, userCheckPromise]).then((result) => {
            const filesResult: any = result[0];
            const authCheckStatus: number = result[1];

            if(filesResult.files){
                setResponse({files: filesResult.files, checked: authCheckStatus === 200})
            }
        })
    }

    useEffect(() => {
        setTimeout(check, 2000)
    }, []);

    if (!response.checked || props.loading) return <Loader />

    const UserContextValue: UserContextPrototype = {
        files: response.files
    }

    return <UserContext.Provider value={UserContextValue}>
        {props.children}
    </UserContext.Provider>
}