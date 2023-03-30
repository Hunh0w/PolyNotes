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
import {getPathOfFile} from "../../utils/files-utils";

interface APIResponse {
    isLoaded: boolean
    file?: PolyFileBase
    files?: PolyFileBase[]
}

export default function PolyFileLoader(props: { id?: string }) {

    const [response, setResponse] = useState<APIResponse>({ isLoaded: false });
    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");

    const fetchFile = () => {
        if(!props.id) {
            navigate("/home");
            return;
        }
        const filePromise = fetch(url + "/file/" + props.id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                const jsonFile = await response.json();

                let parentId = null;
                if("parentId" in jsonFile)
                    parentId = jsonFile.parentId;

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, parentId) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, generateMatrixBlocks(jsonFile.blocks), parentId)

                return {file: polyFile}
            } else {
                return {file: null}
            }
        })
        const filesPromise = fetch(url + "/files", {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Accept": "application/json"
            }
        }).then(async (response) => {
           if(response.status === 200){
               const jsonFiles = await response.json();
               let files: PolyFileBase[] = [];
               for (let i = 0; i < jsonFiles.files.length; i++) {
                   const jsonFile = jsonFiles.files[i];

                   let parentId = null;
                   if("parentId" in jsonFile)
                       parentId = jsonFile.parentId;

                   const polyfile: PolyFileBase = jsonFile.isDirectory ?
                       new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, parentId) :
                       new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, [], parentId);
                   files.push(polyfile);
               }

               return {files: files};
           }else{
               return {files: null}
           }
        });
        Promise.all([filePromise,filesPromise]).then((results) => {
            let files = null;
            let file = null;
            for(let i = 0; i < results.length; i++){
                const obj = results[i];
                if("file" in obj)
                    file = obj.file;
                else if("files" in obj)
                    files = obj.files;
            }
            if(!file || !files){
                setResponse({isLoaded: false})
                return;
            }
            setResponse({isLoaded: true, file: file, files: files});
        })
    }

    useEffect(() => {
        setTimeout(fetchFile, 1000)
    }, []);

    if (!props.id) return <></>

    if (!response.isLoaded || !response.file || !response.files)
        return <Box width={"100%"} height={"100%"} display={"flex"} justifyContent="center" alignItems="center" mt={5}>
            <Loader />
        </Box>

    if (response.file.isDirectory) {
        const file = response.file
        return <Box>
            <Typography>Folder Name: {file?.name}</Typography>
            <Typography>Last Modified: {file?.lastModified}</Typography>
            <Typography>isDirectory: {file?.isDirectory}</Typography>
        </Box>
    }


    const file = response.file as PolyFile;
    return <PolyFileEditor file={file} files={response.files} pageId={props.id} />
}