import { Box, CircularProgress, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/conf";
import { generateMatrixBlocks } from "../blocks/BlockFactory";
import Loader from "../loader/Loader";
import { PolyFile } from "./impl/PolyFile";
import { PolyFolder } from "./impl/PolyFolder";
import { PolyFileBase } from "./PolyFileBase";
import PolyFileEditor from "./PolyFileEditor";

interface APIResponse {
    error?: string
    isLoaded: boolean
    file?: PolyFileBase
}

export default function PolyFileLoader(props: { id: string }) {

    const [response, setResponse] = useState<APIResponse>({ isLoaded: false });
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const fetchFile = () => {
        return fetch(url + "/file/" + props.id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                const jsonFile = await response.json();

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, jsonFile.listFiles) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, generateMatrixBlocks(jsonFile.blocks))


                setResponse({ isLoaded: true, file: polyFile });
            } else {
                setResponse({ isLoaded: false, error: await response.text() })
            }
        })
    }

    useEffect(() => {
        setTimeout(fetchFile, 1000)
    }, []);

    if (!props.id) return <></>


    if (response.error) {
        <Box width={"100%"} height={"100%"} display={"flex"} justifyContent="center" alignItems="center">
            <Typography>Erreur: {response.error}</Typography>
        </Box>
    }

    if (!response.isLoaded)
        return <Box width={"100%"} height={"100%"} display={"flex"} justifyContent="center" alignItems="center" mt={5}>
            <Loader />
        </Box>

    console.log(response.file)

    if (response.file?.isDirectory) {
        const file = response.file as PolyFolder
        return <Box>
            <Typography>Folder Name: {file?.name}</Typography>
            <Typography>Last Modified: {file?.lastModified}</Typography>
            <Typography>isDirectory: {file?.isDirectory}</Typography>
        </Box>
    }

    const file = response.file as PolyFile;
    return <PolyFileEditor file={file} pageId={props.id} />
}