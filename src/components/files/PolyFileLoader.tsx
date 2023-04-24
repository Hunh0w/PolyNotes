import { Box, CircularProgress, Typography } from "@mui/material";
import {ReactNode, useContext, useEffect, useState} from "react";
import { PolyFile } from "./impl/PolyFile";
import { PolyFileBase } from "./PolyFileBase";
import PolyFileEditor from "./PolyFileEditor";
import {UserContext} from "../auth/AuthChecker";

export default function PolyFileLoader(props: { id?: string, file: PolyFileBase}) {
    const {files} = useContext(UserContext);

    if (!props.id) return <></>

    if (props.file.isDirectory) {
        const file = props.file
        return <Box>
            <Typography>Folder Name: {file.name}</Typography>
            <Typography>Last Modified: {file.lastModified}</Typography>
            <Typography>isDirectory: {file.isDirectory}</Typography>
        </Box>
    }

    return <PolyFileEditor key={props.file.getHash()} file={props.file as PolyFile} files={files} pageId={props.id} />
}