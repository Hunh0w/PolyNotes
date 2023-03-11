import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";
import SortableMatrix, {ItemMatrix} from "../components/dnd/SortableMatrix";
import HeaderTextBlock from "../components/blocks/impl/HeaderTextBlock";
import BaseBlock from "../components/blocks/BaseBlock";
import {useNavigate} from "react-router-dom";

const BlocksContextDefaultValue = {
    addNewBlock: (block: BaseBlock, column: number, atIndex: number) => {}
}

export const BlocksContext = React.createContext(BlocksContextDefaultValue);

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
        [new HeaderTextBlock("Teste1", "h1"), new HeaderTextBlock("Test1", "h2")],
        [new HeaderTextBlock("Test2", "h4")],
        [new HeaderTextBlock("Test2", "h6")],
        [new HeaderTextBlock("Test3", "h1")]
    ];


    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) navigate("/")
    }, [navigate]);



    const addNewBlock = (block: BaseBlock, column: number, atIndex: number) => {

    }

    const blocksContextValue = {
        addNewBlock: addNewBlock
    }

    return (
        <Sidebar>
            <SortableMatrix blocks={getContainersFromMatrix(blocks)} />
        </Sidebar>
    );

}