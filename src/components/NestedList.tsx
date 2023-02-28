import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import {Collapse, ListSubheader} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";


interface Props {
    text?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    open: boolean
    toggleOpen: () => void
}
export default function NestedList(props: Props){

    return (<>
        <ListItemButton onClick={props.toggleOpen}>
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text} />
            {props.open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={props.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.children}
            </List>
        </Collapse>
    </>)
}