import { Box, Button, TextField, Typography } from "@mui/material";
import BaseBlock from "../BaseBlock";
import { KeyboardEventHandler, ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";
import { BlocksContext } from "../../../pages/test";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Text from '@tiptap/extension-text'
import Paragraph from "@tiptap/extension-paragraph";

interface Props {
    text: string
    headerType: HeaderTextType,
    setText: (text: string) => void,
    block?: BaseBlock
}

type HeaderTextType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export default class HeaderTextBlock extends BaseBlock implements Props {

    text: string;
    headerType: HeaderTextType
    setText = (text: string) => {
        this.text = text;
    }

    constructor(text: string, headerType: HeaderTextType) {
        super("headerText");
        this.text = text;
        this.headerType = headerType;
    }

    getType(): string {
        return this.headerType;
    }

    getComponent(): React.ReactNode {
        return <Component {...this} block={this} />
    }

}

function Component(props: Props) {

    const { blocks, setBlocks, addNewBlock, deleteBlock, focusedBlock } = useContext(BlocksContext);

    const isFocused = focusedBlock ? focusedBlock.id === props.block?.id : false;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Paragraph
        ],
        content: `<${props.headerType}>${props.text}</${props.headerType}>`,
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
                const newBlock = new HeaderTextBlock("", props.headerType);
                addNewBlock(newBlock, props.block as BaseBlock, blocks, setBlocks);
            }
        } else if (key === "Backspace") {
            const currentText = editor?.getText().replaceAll("<br>", "");
            if (currentText === "") {
                deleteBlock(props.block as BaseBlock, blocks, setBlocks);
            }
        }
    }

    return <Box width={"100%"} height={"100%"}>
        <EditorContent editor={editor} onKeyDownCapture={handleKeyDown} style={{ "height": "100%" }} />
    </Box>

}


