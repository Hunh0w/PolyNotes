import Sidebar from "../components/Sidebar";
import React, {useEffect, useState} from "react";
import SortableMatrix, {ItemMatrix} from "../components/dnd/SortableMatrix";
import HeaderTextBlock from "../components/blocks/impl/HeaderTextBlock";
import BaseBlock from "../components/blocks/BaseBlock";
import {useNavigate} from "react-router-dom";


interface BlocksContextPrototype {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock) => void
    deleteBlock: (block: BaseBlock) => void
    focusedBlock: BaseBlock | null
}

const BlocksContextDefaultValue = {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock) => null,
    deleteBlock: (block: BaseBlock) => null,
    focusedBlock: null
}
export const BlocksContext = React.createContext<BlocksContextPrototype>(BlocksContextDefaultValue);


export default function TestPage(){

    const navigate = useNavigate();

    const [blocks, setBlocks] = useState<BaseBlock[][]>([
        [new HeaderTextBlock("Teste1", "h1"), new HeaderTextBlock("Test1", "h2")],
        [new HeaderTextBlock("Test2", "h4")],
        [new HeaderTextBlock("Test2", "h6")],
        [new HeaderTextBlock("Test3", "h1")]
    ]);

    const [focusedBlock, setFocusedBlock] = useState<BaseBlock | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) navigate("/")
    }, [navigate]);

    const getBlockColumn = (block: BaseBlock) => {
        return blocks.map((blockList, index) => {
            const block2 = blockList.find(block2 => block2.id === block.id);
            if(block2) return index;
        }).find(index => index || index === 0)
    }

    const getBlockIndex = (block: BaseBlock, columnIndex: number) => {
        return blocks[columnIndex].map((block2, index) => {
            if(block2.id === block.id)
                return index;
        }).find(index => index || index === 0);
    }

    const deleteBlock = (block: BaseBlock) => {
        const columnIndex = getBlockColumn(block);
        setBlocks((prev: BaseBlock[][]) => {
            return prev.map((blockList, index) => {
                if(index !== columnIndex) return blockList;
                return blockList.filter((block2) => block2.id !== block.id);
            })
        })
    }

    const addNewBlock = (block: BaseBlock, afterBlock: BaseBlock) => {
        setFocusedBlock(block);
        const columnLastIndex = blocks.length-1;
        const columnIndex = getBlockColumn(afterBlock);
        if(!columnIndex && columnIndex !== 0) return;

        let afterIndex = getBlockIndex(afterBlock, columnIndex);
        if(!afterIndex && afterIndex !== 0)
            afterIndex = blocks[columnIndex].length-1;
        afterIndex++;

        if(columnIndex > columnLastIndex) {
            setBlocks((prevState) => {
                return prevState.fill([], columnLastIndex+1, columnIndex)
                    .map((blockList, index) => {
                        if(index !== columnIndex) return blockList;
                        return [block];
                    });
            });
            return;
        }
        setBlocks((prevState) =>
            prevState.map((blockList, index) => {
                if (index !== columnIndex) return blockList;
                return [
                    ...blockList.slice(0, afterIndex),
                    block,
                    ...blockList.slice(afterIndex, blockList.length)
                ]
            })
        )
    }

    /*
     ...prev[overContainer].slice(0, newIndex),
    blockMatrix[activeContainer][activeIndex],
    ...prev[overContainer].slice(newIndex, prev[overContainer].length)
     */

    const blocksContextValue = {
        addNewBlock: addNewBlock,
        deleteBlock: deleteBlock,
        focusedBlock: focusedBlock
    }

    return (
        <Sidebar>
            <BlocksContext.Provider value={blocksContextValue}>
                <SortableMatrix blockMatrix={blocks} setBlockMatrix={setBlocks} />
            </BlocksContext.Provider>
        </Sidebar>
    );

}