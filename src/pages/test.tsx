import {Box, Button, Container, ListItem, Typography} from "@mui/material";
import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    closestCenter,
    defaultDropAnimationSideEffects,
    DndContext,
    DragEndEvent,
    DragOverlay, DragStartEvent,
    DropAnimation, KeyboardSensor, PointerSensor, UniqueIdentifier,
    useDraggable,
    useDroppable, useSensor, useSensors
} from "@dnd-kit/core";
import SortableMatrix, {ItemMatrix} from "../components/dnd/SortableMatrix";
import HeaderTextBlock from "../components/blocks/impl/HeaderTextBlock";
import BaseBlock from "../components/blocks/BaseBlock";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.4"
            }
        }
    })
};

function getContainersFromMatrix(blocks: BaseBlock[][]): ItemMatrix {
    let obj: ItemMatrix = {};
    for(let i = 0; i < blocks.length; i++){
        const container = blocks[i];
        obj["container"+i] = container;
    }
    return obj;
}

export default function TestPage(){

    const navigate = useNavigate();

    const blocks = [
        [new HeaderTextBlock("Test1", "h2")],
        [new HeaderTextBlock("Test2", "h4")],
        [new HeaderTextBlock("Test2", "h6")],
        [new HeaderTextBlock("Test3", "h1")]
    ]

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) navigate("/")
    }, [navigate]);

    return (
        <Sidebar>
            <SortableMatrix blocks={getContainersFromMatrix(blocks)} />
        </Sidebar>
    );

}