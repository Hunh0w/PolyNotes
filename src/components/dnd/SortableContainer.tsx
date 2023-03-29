import {UniqueIdentifier, useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React, {useContext} from "react";
import SortableItem from "./SortableItem";
import BaseBlock from "../blocks/BaseBlock";
import {BlocksContext} from "../files/PolyFileEditor";

const containerStyle = {
    width: "100%",
    height: "auto"
};

export default function SortableContainer(props: {id: UniqueIdentifier, containerIndex: number}) {
    const { id, containerIndex } = props;

    const { blocks } = useContext(BlocksContext);

    const items = blocks[containerIndex];

    const { setNodeRef } = useDroppable({
        id
    });

    return (
        <SortableContext
            id={id.toString()}
            items={items}
            strategy={verticalListSortingStrategy}
        >
            <div ref={setNodeRef} style={containerStyle}>
                {items.map((block) => (
                    <SortableItem key={block.id} block={block} />
                ))}
            </div>
        </SortableContext>
    );
}
