import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import {Box, Collapse, ListSubheader} from "@mui/material";


interface Props {
    text?: string
    icon?: React.ReactNode
    children?: React.ReactNode
    onClick?: () => void
    style?: React.CSSProperties
    boxStyle?: React.CSSProperties
    defaultOpen?: boolean
    disabled?: boolean
}
export default function NestedList(props: Props) {

    const isDisabled = props.disabled === true;

    const [open, setOpen] = React.useState(false);

    const toggleOpen = () => {
        setOpen(!open);
        if(props.onClick)
            props.onClick();
    };

    const opened = open && !isDisabled;

    return (<>
        <ListItemButton onClick={toggleOpen} style={props.style}>
            <Box style={isDisabled ? {} : props.boxStyle} display={"flex"} flexDirection={"row"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
                <ListItemIcon sx={isDisabled ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                    {props.icon}
                </ListItemIcon>
                {!isDisabled &&
                    <>
                        <ListItemText primary={props.text} />
                        {opened ? <ExpandLess /> : <ExpandMore />}
                    </>
                }
            </Box>
        </ListItemButton>
        <Collapse in={opened} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {props.children}
            </List>
        </Collapse>
    </>)
}