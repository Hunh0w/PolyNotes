import React, {useState} from 'react';
import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    closestCorners,
    UniqueIdentifier,
} from '@dnd-kit/core';
import {
    arrayMove,
} from '@dnd-kit/sortable';
import {Box} from "@mui/material";
import SortableContainer from "./SortableContainer";
import BaseBlock from "../blocks/BaseBlock";

export interface ItemMatrix {
    [propKey: string]: BaseBlock[]
}
interface Props {
    blocks: ItemMatrix
}

export default function SortableMatrix(props: Props) {

    const [items, setItems] = useState<ItemMatrix>(props.blocks);
    const [activeBlock, setActiveBlock] = useState<BaseBlock | null>();

    const sensors = useSensors(
        useSensor(PointerSensor)
    );

    return (
        <Box display={"flex"} flexDirection={"row"} width={"100%"}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                {Object.keys(items).map(key => {
                    return <SortableContainer id={key} key={key} items={items[key]} />
                })}

                <DragOverlay>{activeBlock ? <h4>{activeBlock.getType()}</h4> : null}</DragOverlay>
            </DndContext>
        </Box>
    );

    function findContainer(id: UniqueIdentifier) {
        if (id in items) {
            return id;
        }

        return Object.keys(items).find((key) => items[key].find(block => block.id === id));
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const activeContainer = findContainer(id);
        if(!activeContainer) return;

        const activeBlock = items[activeContainer].find(block => block.id === id);

        setActiveBlock(activeBlock);
    }

    function handleDragOver(event: any) {
        const { active, over } = event;
        if(!over || !active) return;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        const activeBlock = items[activeContainer].find(block => block.id === id);
        const overBlock = items[overContainer].find(block => block.id === overId);
        if(!activeBlock) return;

        setItems((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(activeBlock);
            const overIndex = overBlock ? overItems.indexOf(overBlock) : 0;

            let newIndex;
            if (overId in prev) {
                // We're at the root droppable of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((block: BaseBlock) => block.id !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    items[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        if(!active || !over) return;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }



        const activeBlock = items[activeContainer].find(block => block.id === active.id);
        const overBlock = items[overContainer].find(block => block.id === over.id);
        if(!activeBlock || !overBlock)
            return;

        const activeIndex = items[activeContainer].indexOf(activeBlock);
        const overIndex = items[overContainer].indexOf(overBlock);

        if (activeIndex !== overIndex) {
            setItems((items) => ({
                ...items,
                [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
            }));
        }

        setActiveBlock(null);
    }
}
