import React, { useState } from 'react';
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
import { Box } from "@mui/material";
import SortableContainer from "./SortableContainer";
import BaseBlock from "../blocks/BaseBlock";

export interface ItemMatrix {
    [propKey: string]: BaseBlock[]
}
interface Props {
    blockMatrix: BaseBlock[][]
    setBlockMatrix: (arg: any) => void
}

export default function SortableMatrix(props: Props) {

    const { blockMatrix, setBlockMatrix } = props;

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
                {blockMatrix.map((blockList, index) => {
                    return <SortableContainer id={"container" + index} key={index} items={blockList} />
                })}

                <DragOverlay>{activeBlock ? <h4>{activeBlock.getOverlayLabel()}</h4> : null}</DragOverlay>
            </DndContext>
        </Box>
    );

    function findContainer(id: UniqueIdentifier) {
        if (typeof (id) === "string") {
            for (let i = 0; i < blockMatrix.length; i++) {
                if ("container" + i === id) return i;
            }
            return;
        }

        return blockMatrix.map((blockList, index) => {
            if (blockList.find(block => block.id === id))
                return index;
        }).find(index => index || index === 0);
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const activeContainer = findContainer(id);
        if (!activeContainer && activeContainer !== 0) return;

        const activeBlock = blockMatrix[activeContainer].find(block => block.id === id);

        setActiveBlock(activeBlock);
    }

    function handleDragOver(event: any) {
        const { active, over } = event;
        if (!over || !active) return;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            (!activeContainer && activeContainer !== 0) ||
            (!overContainer && overContainer !== 0) ||
            activeContainer === overContainer
        ) {
            return;
        }

        const activeBlock = blockMatrix[activeContainer].find(block => block.id === id);
        const overBlock = blockMatrix[overContainer].find(block => block.id === overId);

        if (!activeBlock) return;

        setBlockMatrix((prev: BaseBlock[][]) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes for the items
            const activeIndex = activeItems.indexOf(activeBlock);
            const overIndex = overBlock ? overItems.indexOf(overBlock) : 0;

            let newIndex: number;
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

            return prev.map((blockList, index) => {
                if (index === activeContainer)
                    return [...prev[activeContainer].filter((block: BaseBlock) => block.id !== active.id)]
                else if (index === overContainer)
                    return [
                        ...prev[overContainer].slice(0, newIndex),
                        blockMatrix[activeContainer][activeIndex],
                        ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                    ]
                else return blockList;
            })

            /*
            return {
                ...prev,
                [activeContainer]: [
                    ...prev[activeContainer].filter((block: BaseBlock) => block.id !== active.id)
                ],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    blockMatrix[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
                ]
            };
             */
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        if (!active || !over) return;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            (!activeContainer && activeContainer !== 0) ||
            (!overContainer && overContainer !== 0) ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeBlock = blockMatrix[activeContainer].find(block => block.id === active.id);
        const overBlock = blockMatrix[overContainer].find(block => block.id === over.id);
        if (!activeBlock || !overBlock)
            return;

        const activeIndex = blockMatrix[activeContainer].indexOf(activeBlock);
        const overIndex = blockMatrix[overContainer].indexOf(overBlock);

        if (activeIndex !== overIndex) {
            setBlockMatrix((prev: BaseBlock[][]) => prev.map((blockList, index) => {
                if (index === overContainer)
                    return arrayMove(prev[overContainer], activeIndex, overIndex)
                return blockList;
            }));
        }

        setActiveBlock(null);
    }
}
