import ListItemIcon from "@mui/material/ListItemIcon";
import {Article} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import * as React from "react";
import {PolyFolder} from "./impl/PolyFolder";
import {useEffect, useState} from "react";

export default function FolderContent(props: {folder: PolyFolder}) {

    const [ content, setContent ] = useState<any[] | null>(null);

    useEffect(() => {

    }, []);


    if(content === null)
        return <></>

    return (
        <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
                <Article />
            </ListItemIcon>
            <ListItemText primary={props.folder.name} />
        </ListItemButton>
    )
}