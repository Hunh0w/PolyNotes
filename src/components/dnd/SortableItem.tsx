import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { ReactNode, useState } from "react";
import BaseBlock from "../blocks/BaseBlock";
import { Box } from "@mui/material";

export function Item(props: { children: ReactNode, attributes: any, listeners: any, setNodeRef: any }) {

    const [isHover, setIsHover] = useState<boolean>(false);

    const style = {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    return <Box style={style}
        flexDirection={"row"}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}>

        <button className="DragHandle" style={{ "height": "40px" }}>
            {isHover ? "+" : null}
        </button>
        <button className="DragHandle" {...props.attributes} {...props.listeners} ref={props.setNodeRef} style={{ "height": "40px" }}>
            {isHover &&
                <svg viewBox="0 0 20 20" width="12">
                    <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                </svg>
            }
        </button>
        {props.children}
    </Box>;
}

export default function SortableItem(props: { block: BaseBlock }) {
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
            <Item attributes={attributes} listeners={listeners} setNodeRef={setNodeRef}>
                {props.block.getComponent()}
            </Item>
        </Box>
    );
}