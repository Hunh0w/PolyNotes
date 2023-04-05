import {UniqueIdentifier, useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useContext} from "react";
import KanbanItemComponent from "./KanbanItemComponent";
import BaseBlock from "../../blocks/BaseBlock";
import {BlocksContext} from "../../files/PolyFileEditor";
import KanbanBlock from "../../blocks/impl/kanban/KanbanContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {KanbanContainer, KanbanContext} from "./KanbanMatrix";
import IconButton from "@mui/material/IconButton";
import {Delete, DeleteOutlined} from "@mui/icons-material";

const containerStyle = {
    width: "100%",
    height: "auto",
    border: "1px solid rgba(0,0,0,0.1)",
    marginInline: 2
};

export default function KanbanContainerComponent(props: {id: UniqueIdentifier, container: KanbanContainer}) {
    const { id, container } = props;

    const { setMatrix } = useContext(KanbanContext);
    const { file } = useContext(BlocksContext);

    const { setNodeRef, over } = useDroppable({
        id
    });

    const isOver = (): boolean => {
        if(!over) return false;
        if(over.id === props.id)
            return true;
        for(let i = 0; i < container.itemList.length; i++){
            const item: KanbanBlock = container.itemList[i];
            if(item.id === over.id)
                return true;
        }
        return false;
    }

    const onDeleteColumn = () => {
        setMatrix((prevState: KanbanContainer[]) => prevState.filter((container, index) => "container"+index !== props.id));
    }

    if(!file) return <></>

    return (
        <Box display={"flex"} flexDirection={"column"} style={{...containerStyle, backgroundColor: isOver() ? "#dfcbec" : ""}}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} my={3} width={"100%"}>
                <Typography variant={"h5"}>
                    {container.name}
                </Typography>
                {file.canEdit() &&
                    <IconButton sx={{marginLeft: 2}} onClick={onDeleteColumn}>
                        <DeleteOutlined />
                    </IconButton>
                }
            </Box>
            <Box height={"100%"} p={2}>
                <SortableContext
                    id={id.toString()}
                    items={container.itemList}
                    strategy={verticalListSortingStrategy}
                >
                    <Box ref={setNodeRef} >
                        {container.itemList.map((item) => (
                            <KanbanItemComponent key={item.id} item={item} />
                        ))}
                    </Box>
                </SortableContext>
            </Box>

        </Box>
    );
}
