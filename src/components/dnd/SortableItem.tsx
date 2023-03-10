import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import React from "react";
import BaseBlock from "../blocks/BaseBlock";
import {Box, Button} from "@mui/material";

export function Item(props: {block: BaseBlock}) {
    const { block } = props;

    const style = {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        margin: "10px 0"
    };

    return <div style={style}>
        {block.getComponent()}
    </div>;
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
        <Box display={"flex"} flexDirection={"row"} height={"auto"} justifyContent={"center"} alignItems={"center"} style={style} {...attributes}>
            <Button ref={setNodeRef}  {...listeners} sx={{"height": "50px"}}>move</Button>
            <Item block={props.block} />
        </Box>
    );
}