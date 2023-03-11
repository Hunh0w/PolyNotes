import {UniqueIdentifier, useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import React from "react";
import SortableItem from "./SortableItem";
import BaseBlock from "../blocks/BaseBlock";

const containerStyle = {
    width: "100%",
    height: "auto"
};

export default function SortableContainer(props: {id: UniqueIdentifier, items: BaseBlock[]}) {
    const { id, items } = props;

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
