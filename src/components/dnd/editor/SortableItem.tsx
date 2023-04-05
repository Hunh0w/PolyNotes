import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, {ReactNode, useContext, useState} from "react";
import BaseBlock from "../../blocks/BaseBlock";
import {Box, IconButton} from "@mui/material";
import {BlocksContext} from "../../files/PolyFileEditor";
import {Delete, DeleteOutline, DeleteOutlined} from "@mui/icons-material";

export function Item(props: { block: BaseBlock, attributes: any, listeners: any, setNodeRef: any }) {

    const [isHover, setIsHover] = useState<boolean>(false);

    const style = {
        width: "100%",
        height: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    };

    const { file, blocks, setBlocks, deleteBlock } = useContext(BlocksContext);

    const getCurrentColumn = () => {
        for(let colIndex = 0; colIndex < blocks.length; colIndex++) {
            const blockList = blocks[colIndex];
            for(let rowIndex = 0; rowIndex < blockList.length; rowIndex++){
                const block = blockList[rowIndex];
                if(block.id === props.block.id)
                    return colIndex;
            }
        }
        return null;
    }

    const addColumnAfter = () => {
        const currentColumn = getCurrentColumn();
        if(currentColumn === null) return;
        setBlocks((prevBlocks: BaseBlock[][]) => {
            return [...prevBlocks.slice(0, currentColumn+1),
                [],
                ...prevBlocks.slice(currentColumn+1, prevBlocks.length)]
        })
    }

    if(!file) return <></>

    return <Box style={style}
        flexDirection={"row"}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}>

        {file.canEdit() &&
            <>
                <button className="DragHandle" style={{ "height": "40px" }} onClick={addColumnAfter}>
                    {isHover ? "+" : null}
                </button>
                <button className="DragHandle" style={{ "height": "40px" }} onClick={() => deleteBlock(props.block)}>
                    {isHover &&
                        <DeleteOutlined width={100} />
                    }
                </button>
                <button className="DragHandle" {...props.attributes} {...props.listeners} ref={props.setNodeRef} style={{ "height": "40px" }}>
                    {isHover &&
                        <svg viewBox="0 0 20 20" width="12">
                        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
                        </svg>
                    }
                </button>
            </>
        }

        {props.block.getComponent()}
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
            <Item attributes={attributes} listeners={listeners} setNodeRef={setNodeRef} block={props.block} />
        </Box>
    );
}