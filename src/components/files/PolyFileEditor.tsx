import React, { useEffect, useState } from "react";
import SortableMatrix from "../dnd/editor/SortableMatrix";
import TextBlock, {HeaderTextType} from "../blocks/impl/TextBlock";
import BaseBlock from "../blocks/BaseBlock";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import EditorSpeedDial from "../speed-dials/EditorSpeedDial";
import { PolyFile } from "./impl/PolyFile";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {PolyFileBase} from "./PolyFileBase";
import {getPathOfFile} from "../../utils/files-utils";


interface BlocksContextPrototype {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock) => void
    deleteBlock: (block: BaseBlock) => void
    createNewBlock: (block: BaseBlock, columnIndex: number) => void
    setBlockType: (block: BaseBlock, itemType: string) => void
    focusedBlock: BaseBlock | null
    setFocusedBlock: (arg: any) => void
    blocks: BaseBlock[][]
    setBlocks: (arg: any) => void
    file: PolyFile | null
}

const BlocksContextDefaultValue = {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock) => null,
    deleteBlock: (block: BaseBlock) => null,
    createNewBlock: (block: BaseBlock, columnIndex: number) => null,
    setBlockType: (block: BaseBlock, itemType: string) => null,
    focusedBlock: null,
    setFocusedBlock: (arg: any) => null,
    blocks: [],
    setBlocks: (arg: any) => null,
    file: null
}
export const BlocksContext = React.createContext<BlocksContextPrototype>(BlocksContextDefaultValue);


export default function PolyFileEditor(props: { file: PolyFile, files: PolyFileBase[], pageId: string }) {
    const navigate = useNavigate();

    const [blocks, setBlocks] = useState<BaseBlock[][]>(props.file.blocks);
    const [fileName, setFileName] = useState<string>(props.file.name);

    const [focusedBlock, setFocusedBlock] = useState<BaseBlock | null>(null);

    const path = getPathOfFile(props.file, props.files);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) navigate("/")
    }, [navigate]);

    const getBlockColumn = (blocks: BaseBlock[][], block: BaseBlock) => {
        return blocks.map((blockList, index) => {
            const block2 = blockList.find(block2 => block2.id === block.id);
            if (block2) return index;
        }).find(index => index || index === 0)
    }

    const getBlockIndex = (blocks: BaseBlock[][], block: BaseBlock, columnIndex: number) => {
        return blocks[columnIndex].map((block2, index) => {
            if (block2.id === block.id)
                return index;
        }).find(index => index || index === 0);
    }

    const deleteBlock = (block: BaseBlock) => {
        const columnIndex = getBlockColumn(blocks, block);
        setBlocks((prev: BaseBlock[][]) => {
            const newMatrix = prev.map((blockList, index) => {
                if (index !== columnIndex) return blockList;
                return blockList.filter((block2) => block2.id !== block.id);
            })
            return newMatrix.filter((blockList, index) => {
                if (index !== columnIndex) return blockList;
                if(blockList.length === 0) return null;
                return blockList;
            });
        })
    }

    const createNewBlock = (block: BaseBlock, columnIndex: number) => {
        setFocusedBlock(block);
        setBlocks((prevBlocks) => {
            if(prevBlocks.length == 0)
                return [[block]];
            return prevBlocks.map((blockList, index) => {
               if(index !== columnIndex) return blockList;
               return [...blockList, block];
           });
        });
    }

    const addNewBlock = (block: BaseBlock, afterBlock: BaseBlock) => {
        setFocusedBlock(block);
        const columnLastIndex = blocks.length - 1;
        const columnIndex = getBlockColumn(blocks, afterBlock);
        if (!columnIndex && columnIndex !== 0) return;

        let afterIndex = getBlockIndex(blocks, afterBlock, columnIndex);
        if (!afterIndex && afterIndex !== 0)
            afterIndex = blocks[columnIndex].length - 1;
        afterIndex++;

        if (columnIndex > columnLastIndex) {
            setBlocks((prevState: BaseBlock[][]) => {
                return prevState.fill([], columnLastIndex + 1, columnIndex)
                    .map((blockList, index) => {
                        if (index !== columnIndex) return blockList;
                        return [block];
                    });
            });
            return;
        }
        setBlocks((prevState: BaseBlock[][]) =>
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

    const setBlockType = (block: BaseBlock, itemType: string) => {
        setBlocks((prevBlocks: BaseBlock[][]) => {
            return prevBlocks.map((blockList: BaseBlock[]) => {
                return blockList.map((oldBlock: BaseBlock) => {
                    if(oldBlock.id !== block.id)
                        return oldBlock;
                    if(oldBlock.constructor.name === TextBlock.name){
                        const block = oldBlock as TextBlock;
                        block.headerType = itemType as HeaderTextType;
                        block.generateId();
                        return block;
                    }
                    return oldBlock;
                })
            })
        })
    }

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: `${fileName}`,
        editable: props.file.canEdit(),
        onUpdate: ({ editor }) => {
            const newText = editor.getText();
            setFileName(newText);
        },
        onBlur: ({ editor, event }) => {
            const newText = editor.getText();
            if (newText === "") {
                editor.commands.setContent(`??`)
                setFileName(fileName);
                return;
            }
        }
    })


    const blocksContextValue = {
        file: props.file,
        addNewBlock: addNewBlock,
        deleteBlock: deleteBlock,
        createNewBlock: createNewBlock,
        setBlockType: setBlockType,
        focusedBlock: focusedBlock,
        setFocusedBlock: setFocusedBlock,
        blocks: blocks,
        setBlocks: setBlocks

    }

    return (
        <>
            <Box mb={5}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography fontWeight={"bold"}>
                        <span style={{ color: "#7B10D4" }}>Poly</span>
                        <span style={{ color: "#000" }}>Notes</span>
                    </Typography>
                    {path.map((file, index) => {
                        if(file.id === props.file.id)
                            return <Typography key={index} variant="h6" color="text.primary" fontWeight={"bold"} fontStyle={{ "color": "#7B10D4" }}>
                                <EditorContent editor={editor} style={{ paddingBlock: 5 }} />
                            </Typography>

                        return <Link key={index} underline="hover" color="inherit" href="#">
                            {file.name}
                        </Link>
                    })};
                </Breadcrumbs>
            </Box>
            <BlocksContext.Provider value={blocksContextValue}>
                <SortableMatrix blockMatrix={blocks} setBlockMatrix={setBlocks} />
                <EditorSpeedDial />
            </BlocksContext.Provider>
        </>

    );

}