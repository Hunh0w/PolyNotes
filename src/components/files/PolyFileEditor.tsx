import React, { useEffect, useState } from "react";
import SortableMatrix from "../dnd/SortableMatrix";
import TextBlock from "../blocks/impl/TextBlock";
import BaseBlock from "../blocks/BaseBlock";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import EditorSpeedDial from "../speed-dials/EditorSpeedDial";
import { PolyFile } from "./impl/PolyFile";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


interface BlocksContextPrototype {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock, blocks: BaseBlock[][], setBlocks: (arg: any) => void) => void
    deleteBlock: (block: BaseBlock, blocks: BaseBlock[][], setBlocks: (arg: any) => void) => void
    focusedBlock: BaseBlock | null
    setFocusedBlock: (arg: any) => void
    blocks: BaseBlock[][]
    setBlocks: (arg: any) => void
}

const BlocksContextDefaultValue = {
    addNewBlock: (block: BaseBlock, afterBlock: BaseBlock) => null,
    deleteBlock: (block: BaseBlock) => null,
    focusedBlock: null,
    setFocusedBlock: (arg: any) => null,
    blocks: [],
    setBlocks: (arg: any) => null
}
export const BlocksContext = React.createContext<BlocksContextPrototype>(BlocksContextDefaultValue);


export default function PolyFileEditor(props: { file: PolyFile, pageId: string }) {
    const navigate = useNavigate();

    console.log(props.file.blocks)

    const [blocks, setBlocks] = useState<BaseBlock[][]>(props.file.blocks);
    const [fileName, setFileName] = useState<string>(props.file.name);

    const [focusedBlock, setFocusedBlock] = useState<BaseBlock | null>(null);

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

    const deleteBlock = (block: BaseBlock, blocks: BaseBlock[][], setBlocks: (arg: any) => void) => {
        const columnIndex = getBlockColumn(blocks, block);
        setBlocks((prev: BaseBlock[][]) => {
            return prev.map((blockList, index) => {
                if (index !== columnIndex) return blockList;
                return blockList.filter((block2) => block2.id !== block.id);
            })
        })
    }

    const addNewBlock = (block: BaseBlock, afterBlock: BaseBlock, blocks: BaseBlock[][], setBlocks: (arg: any) => void) => {
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

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: `${fileName}`,
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
        addNewBlock: addNewBlock,
        deleteBlock: deleteBlock,
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
                    <Link underline="hover" color="inherit" href="#">
                        Workspace 1
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Folder 1
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Folder 2
                    </Link>
                    <Typography variant="h6" color="text.primary" fontWeight={"bold"} fontStyle={{ "color": "#7B10D4" }}>
                        <EditorContent editor={editor} style={{ paddingBlock: 5 }} />
                    </Typography>
                </Breadcrumbs>
            </Box>
            <BlocksContext.Provider value={blocksContextValue}>
                <SortableMatrix blockMatrix={blocks} setBlockMatrix={setBlocks} />
                <EditorSpeedDial pageId={props.pageId} fileName={editor?.getText() ?? "??"} />
            </BlocksContext.Provider>
        </>

    );

}