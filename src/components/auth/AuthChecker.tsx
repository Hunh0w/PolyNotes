import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/conf";
import Loader from "../loader/Loader";
import {PolyFileBase} from "../files/PolyFileBase";
import {getOwnedFiles} from "../../services/FilesService";
import {PolyFile} from "../files/impl/PolyFile";

const UserContextDefault = {
    files: [],
    shared: []
};

interface UserContextPrototype {
    files: PolyFileBase[]
    shared: PolyFile[]
}
export const UserContext = React.createContext<UserContextPrototype>(UserContextDefault);

interface APIResponse {
    files: PolyFileBase[]
    shared: PolyFile[]
    checked: boolean
}

export default function AuthChecker(props: { children: any, loading: boolean }) {

    const [ response, setResponse ] = useState<APIResponse>({files: [], shared: [], checked: false});
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
                setResponse({files: filesResult.files, shared: filesResult.shared, checked: authCheckStatus === 200})
            }
        })
    }

    useEffect(() => {
        check();
    }, []);

    if (!response.checked || props.loading) return <Loader />

    const UserContextValue: UserContextPrototype = {
        files: response.files,
        shared: response.shared
    }

    return <UserContext.Provider value={UserContextValue}>
        {props.children}
    </UserContext.Provider>
}