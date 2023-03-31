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

export default function PolyFileLoader(props: { id?: string, file: PolyFileBase, files: PolyFileBase[]}) {

    if (!props.id) return <></>

    if (props.file.isDirectory) {
        const file = props.file
        return <Box>
            <Typography>Folder Name: {file.name}</Typography>
            <Typography>Last Modified: {file.lastModified}</Typography>
            <Typography>isDirectory: {file.isDirectory}</Typography>
        </Box>
    }

    console.log(props.file);

    return <PolyFileEditor key={props.file.getHash()} file={props.file as PolyFile} files={props.files} pageId={props.id} />
}