import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import React from "react";
import BaseBlock from "../blocks/BaseBlock";
import {Box, Button} from "@mui/material";

export function Item(props: {block: BaseBlock, attributes: any, listeners: any, setNodeRef: any}) {
    const { block } = props;

    const style = {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "start",
        justifyContent: "center",
        margin: "10px 0"
    };

    return <Box style={style} flexDirection={"row"}>
        <button className="DragHandle" style={{"height": "40px"}}>
            +
        </button>
        <button className="DragHandle" {...props.attributes} {...props.listeners} ref={props.setNodeRef} style={{"height": "40px"}}>
            <svg viewBox="0 0 20 20" width="12">
                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
            </svg>
        </button>
        {block.getComponent()}
    </Box>;
}

export default function SortableItem(props: {block: BaseBlock}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Box style={style} {...attributes}>
            <Item block={props.block} attributes={attributes} listeners={listeners} setNodeRef={setNodeRef} />
        </Box>
    );
}