import BaseBlock from "../BaseBlock";
import StarterKit from "@tiptap/starter-kit";
import {EditorContent, useEditor} from "@tiptap/react";
import {DropdownBlocks} from "../BlockFactory";
import CreateImageBlockModal from "../../modals/CreateImageBlockModal";
import {Box} from "@mui/material";
import React, {useContext, useState} from "react";
import {BlocksContext} from "../../files/PolyFileEditor";
import {Highlight} from "@tiptap/extension-highlight";
import {Typography} from "@tiptap/extension-typography"

export default class MarkdownBlock extends BaseBlock {

    public text: string;

    constructor(text: string, generateId: boolean) {
        super();
        this.text = text;
        if (generateId)
            this.generateId();
    }

    getComponent(): React.ReactNode {
        return <Component block={this} />;
    }

    getOverlayLabel(): string {
        return "Markdown";
    }

    getType(): string {
        return "markdown";
    }

    getValues(): any {
        return {
            text: this.text
        }
    }

}

function Component(props: {block: MarkdownBlock}) {

    const { file, focusedBlock } = useContext(BlocksContext);
    const isFocused = focusedBlock ? focusedBlock.id === props.block?.id : false;
    const [ openCreateImage, setOpenCreateImage ] = useState(false);

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
            Highlight,
            Typography
        ],
        content: props.block.text,
        editable: file?.canEdit(),
        autofocus: isFocused,
        onUpdate: ({ editor }) => {
            const newText = editor.getHTML();
            props.block.text = newText;
        }
    })

    return <Box width={"100%"} height={"100%"}>
        <EditorContent editor={editor} style={{ "height": "100%" }} />
        <DropdownBlocks handleClose={handleClose} anchorEl={anchorEl} currentBlock={props.block} setOpenCreateImage={setOpenCreateImage} />
        <CreateImageBlockModal open={openCreateImage} setOpen={setOpenCreateImage} />
    </Box>
}