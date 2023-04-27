import { Box, Button, TextField, Typography } from "@mui/material";
import BaseBlock from "../BaseBlock";
import React, { KeyboardEventHandler, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BlocksContext } from "../../files/PolyFileEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Text from '@tiptap/extension-text'
import Paragraph from "@tiptap/extension-paragraph";
import { UniqueIdentifier } from "@dnd-kit/core";
import {Placeholder} from "@tiptap/extension-placeholder";
import {DropdownBlocks} from "../BlockFactory";
import CreateImageBlockModal from "../../modals/CreateImageBlockModal";
import ChooseChartModal from "../../modals/ChooseChartModal";

interface Props {
    text: string
    headerType: HeaderTextType,
    setText: (text: string) => void,
    block?: BaseBlock
}

export type HeaderTextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export default class TextBlock extends BaseBlock implements Props {

    text: string;
    headerType: HeaderTextType
    setText = (text: string) => {
        this.text = text;
    }

    constructor(text: string, headerType: HeaderTextType, generateId: boolean) {
        super();
        this.text = text;
        this.headerType = headerType;
        if (generateId)
            this.generateId();
    }

    getType(): string {
        return "Text";
    }

    getComponent(): React.ReactNode {
        return <Component {...this} block={this} />
    }

    getOverlayLabel(): string {
        return this.headerType;
    }

    getValues(): any {
        return {
            text: this.text,
            type: this.headerType
        }
    }

}

function Component(props: Props) {

    const { file, addNewBlock, deleteBlock, focusedBlock } = useContext(BlocksContext);

    const isFocused = focusedBlock ? focusedBlock.id === props.block?.id : false;
    const [ openCreateImage, setOpenCreateImage ] = useState(false);
    const [ openCreateChart, setOpenCreateChart ] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const onAddBlock = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Press / to show the component list'
            })
        ],
        content: `<${props.headerType}>${props.text}</${props.headerType}>`,
        editable: file?.canEdit(),
        autofocus: isFocused,
        onUpdate: ({ editor }) => {
            const newText = editor.getText();
            props.setText(newText);
        }
    })

    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if (key === "Enter") {
            if (!evt.shiftKey) {
                evt.preventDefault();
                const newBlock = new TextBlock("", props.headerType, true);
                addNewBlock(newBlock, props.block as BaseBlock);
            }
        } else if (key === "Backspace") {
            const currentText = editor?.getText().replaceAll("<br>", "");
            if (currentText === "") {
                deleteBlock(props.block as BaseBlock);
            }
        } else if(key === "/") {
            const currentText = editor?.getText().replaceAll("<br>", "");
            if(currentText && currentText.endsWith("\\")){
                const newText = currentText.slice(0, currentText.length-1);
                editor?.commands.setContent(`<${props.headerType}>${newText}</${props.headerType}>`);
                props.setText(newText);
                return;
            }
            onAddBlock(evt);
        }
    }

    return <Box width={"100%"} height={"100%"}>
        <EditorContent editor={editor} onKeyDownCapture={handleKeyDown} style={{ "height": "100%" }} />
        <DropdownBlocks handleClose={handleClose} anchorEl={anchorEl} currentBlock={props.block} setOpenCreateImage={setOpenCreateImage} setOpenCreateChart={setOpenCreateChart} />
        <CreateImageBlockModal open={openCreateImage} setOpen={setOpenCreateImage} />
        <ChooseChartModal open={openCreateChart} setOpen={setOpenCreateChart} />
    </Box>

}


