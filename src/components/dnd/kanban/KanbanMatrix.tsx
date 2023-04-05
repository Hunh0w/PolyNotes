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
import KanbanContainerComponent from "./KanbanContainerComponent";
import KanbanContent from "../../blocks/impl/kanban/KanbanContent";


export interface KanbanContainer {
    name: string,
    itemList: KanbanContent[]
}

interface Props {
    itemMatrix: KanbanContainer[]
    setItemMatrix: (arg: any) => void
}

export interface KanbanContextPrototype {
    addNewItem: (item: KanbanContent, afterItem: KanbanContent) => void
    setMatrix: (arg: any) => void
}

export const KanbanContext = React.createContext<KanbanContextPrototype>({
    addNewItem: (item: KanbanContent, afterItem: KanbanContent) => null,
    setMatrix: (arg: any) => null
})

export default function KanbanMatrix(props: Props) {

    const { itemMatrix, setItemMatrix } = props;

    const [activeItem, setActiveItem] = useState<KanbanContent | null>();

    const sensors = useSensors(
        useSensor(PointerSensor)
    );


    const getItemColumn = (items: KanbanContainer[], item: KanbanContent) => {
        return items.map((container, index) => {
            const block2 = container.itemList.find(item2 => item2.id === item.id);
            if (block2) return index;
        }).find(index => index || index === 0)
    }

    const getItemIndex = (items: KanbanContainer[], item: KanbanContent, columnIndex: number) => {
        return items[columnIndex].itemList.map((item2, index) => {
            if (item2.id === item.id)
                return index;
        }).find(index => index || index === 0);
    }

    const addNewItem = (item: KanbanContent, afterItem: KanbanContent) => {
        //setFocusedItem(item);
        const columnLastIndex = itemMatrix.length - 1;
        const columnIndex = getItemColumn(itemMatrix, afterItem);
        if (!columnIndex && columnIndex !== 0) return;

        let afterIndex = getItemIndex(itemMatrix, afterItem, columnIndex);
        if (!afterIndex && afterIndex !== 0)
            afterIndex = itemMatrix[columnIndex].itemList.length - 1;
        afterIndex++;
    /*
        if (columnIndex > columnLastIndex) {
            setItemMatrix((prevState: KanbanContainer[]) => {
                return prevState.fill([], columnLastIndex + 1, columnIndex)
                    .map((blockList, index) => {
                        if (index !== columnIndex) return blockList;
                        return [block];
                    });
            });
            return;
        }

     */
        setItemMatrix((prevState: KanbanContainer[]) =>
            prevState.map((container, index) => {
                if (index !== columnIndex) return container;
                return {
                    name: container.name,
                    itemList: [
                        ...container.itemList.slice(0, afterIndex),
                        item,
                        ...container.itemList.slice(afterIndex, container.itemList.length)
                    ]
                }
            })
        )
    }

    function findContainer(id: UniqueIdentifier) {
        if (typeof (id) === "string") {
            for (let i = 0; i < itemMatrix.length; i++) {
                if ("container" + i === id) return i;
            }
            return;
        }

        return itemMatrix.map((container, index) => {
            if (container.itemList && container.itemList.find(item => item.id === id))
                return index;
        }).find(index => index || index === 0);
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;
        const activeContainer = findContainer(id);
        if (!activeContainer && activeContainer !== 0) return;

        const activeItem = itemMatrix[activeContainer].itemList.find(item => item.id === id);

        setActiveItem(activeItem);
    }

    function handleDragOver(event: any) {
        const { active, over } = event;
        if (!over || !active) return;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            (!activeContainer && activeContainer !== 0) ||
            (!overContainer && overContainer !== 0) ||
            activeContainer === overContainer
        ) {
            return;
        }

        const activeItem = itemMatrix[activeContainer].itemList.find(item => item.id === id);
        const overItem = itemMatrix[overContainer].itemList.find(item => item.id === overId);

        if (!activeItem) return;

        setItemMatrix((prev: KanbanContainer[]) => {
            const activeItems = prev[activeContainer].itemList;
            const overItems = prev[overContainer].itemList;

            const activeIndex = activeItems.indexOf(activeItem);
            const overIndex = overItem ? overItems.indexOf(overItem) : 0;

            let newIndex: number;
            if (overId in prev) {
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1;

                const modifier = isBelowLastItem ? 1 : 0;

                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return prev.map((container, index) => {
                if (index === activeContainer)
                    return {
                        name: container.name,
                        itemList: [...prev[activeContainer].itemList.filter((item: KanbanContent) => item.id !== active.id)]
                    }
                else if (index === overContainer)
                    return {
                        name: container.name,
                        itemList: [
                            ...prev[overContainer].itemList.slice(0, newIndex),
                            itemMatrix[activeContainer].itemList[activeIndex],
                            ...prev[overContainer].itemList.slice(newIndex, prev[overContainer].itemList.length)
                        ]
                    }
                else return container;
            })
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

        const activeBlock = itemMatrix[activeContainer].itemList.find(item => item.id === active.id);
        const overBlock = itemMatrix[overContainer].itemList.find(item => item.id === over.id);
        if (!activeBlock || !overBlock)
            return;

        const activeIndex = itemMatrix[activeContainer].itemList.indexOf(activeBlock);
        const overIndex = itemMatrix[overContainer].itemList.indexOf(overBlock);

        if (activeIndex !== overIndex) {
            setItemMatrix((prev: KanbanContainer[]) => prev.map((container, index) => {
                if (index === overContainer)
                    return {
                        name: container.name,
                        itemList: arrayMove(prev[overContainer].itemList, activeIndex, overIndex)
                    }
                return container;
            }));
        }

        setActiveItem(null);
    }

    const KanbanContextValue = {
        addNewItem: addNewItem,
        setMatrix: setItemMatrix
    }

    return (
        <KanbanContext.Provider value={KanbanContextValue}>
            <Box display={"flex"} flexDirection={"row"} width={"100%"}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    {itemMatrix.map((container, index) => {
                        return <KanbanContainerComponent id={"container"+index} key={index} container={container} />
                    })}

                    <DragOverlay>{activeItem ? <h3>{activeItem.text}</h3> : null}</DragOverlay>
                </DndContext>
            </Box>
        </KanbanContext.Provider>
    );
}
