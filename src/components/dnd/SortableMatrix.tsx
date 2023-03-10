import React, {useState} from 'react';
import {
    DndContext,
    KeyboardSensor,
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
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {Box, Button} from "@mui/material";
import SortableContainer from "./SortableContainer";
import {Item} from "./SortableItem";
import BaseBlock from "../blocks/BaseBlock";

export interface ItemMatrix {
    [propKey: string]: BaseBlock[]
    root: BaseBlock[]
    container1: BaseBlock[]
    container2: BaseBlock[]
    //container3: BaseBlock[]
}
interface Props {
    blocks: BaseBlock[]
}

export default function SortableMatrix(props: Props) {
    const [items, setItems] = useState<ItemMatrix>({
        root: [props.blocks[0]],
        container1: [props.blocks[1]],
        container2: [props.blocks[2]]
        //container3: []
    });
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
                <SortableContainer id="root" items={items.root} />
                <SortableContainer id="container1" items={items.container1} />
                <SortableContainer id="container2" items={items.container2} />

                <DragOverlay>{activeBlock ? <h4>{activeBlock.getType()}</h4> : null}</DragOverlay>
            </DndContext>
        </Box>
    );

    // <SortableContainer id="container3" items={items.container3} />

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
