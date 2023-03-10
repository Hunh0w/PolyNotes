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
import SortableMatrix from "../components/dnd/SortableMatrix";
import HeaderTextBlock from "../components/blocks/impl/HeaderTextBlock";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.4"
            }
        }
    })
};

export default function TestPage(){

    const navigate = useNavigate();

    const blocks = [
        new HeaderTextBlock("Test1", "h2"),
        new HeaderTextBlock("Test2", "h4"),
        new HeaderTextBlock("Test3", "h1")
    ]

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) navigate("/")
    }, [navigate]);

    return (
        <Sidebar>
            <SortableMatrix blocks={blocks} />
        </Sidebar>
    );

}

function Droppable(props: {children: any}) {
    const {isOver, setNodeRef} = useDroppable({
        id: 'droppable',
    });
    const style = {
        backgroundColor: isOver ? 'green' : 'red',
    };

    return (
        <Container ref={setNodeRef} sx={{"height": "800px", ...style}}>
            {props.children}
        </Container>
    );
}


export function Draggable(props: {children: any, id: number}) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
    });
    const style_transform = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
    } : undefined;

    const style = {
        cursor: "pointer",
        width: "200px",
        height: "200px",
        backgroundColor: "purple",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <Box ref={setNodeRef} style={{...style_transform, ...style}} {...listeners} {...attributes}>
            {props.children}
        </Box>
    );
}
