import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, {ReactNode, useContext, useState} from "react";
import {Box, Button, IconButton} from "@mui/material";
import KanbanContent, {KanbanContentComponent} from "../../blocks/impl/kanban/KanbanContent";
import {BlocksContext} from "../../files/PolyFileEditor";

export function Item(props: { item: KanbanContent, attributes: any, listeners: any, setNodeRef: any }) {

    const [isHover, setIsHover] = useState<boolean>(false);
    const { file } = useContext(BlocksContext);

    const style = {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 5
    };

    if(!file) return <></>

    return <Box style={style}
        flexDirection={"row"}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}>

        {file.canEdit() &&
            <button className="DragHandle" {...props.attributes} {...props.listeners} ref={props.setNodeRef} style={{ "height": "40px", marginRight: 5 }}>
                {isHover &&
                    <svg viewBox="0 0 20 20" width="12">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                    </svg>
                }
            </button>
        }

        <KanbanContentComponent item={props.item} />
    </Box>;
}

export default function KanbanItemComponent(props: { item: KanbanContent }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <Box style={style} {...attributes}>
            <Item attributes={attributes} listeners={listeners} setNodeRef={setNodeRef} item={props.item} />
        </Box>
    );
}