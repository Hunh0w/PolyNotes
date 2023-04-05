import {Paper} from "@mui/material";
import {EditorContent, useEditor} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {Placeholder} from "@tiptap/extension-placeholder";
import React, {useContext} from "react";
import {KanbanContext} from "../../../dnd/kanban/KanbanMatrix";
import {BlocksContext} from "../../../files/PolyFileEditor";


export default class KanbanContent {

    public id: number
    public text: string

    constructor(text: string) {
        this.text = text;

        const min = 0;
        const max = 2147483647;
        this.id = Math.floor(min + Math.random() * (max - min));
    }

}


export function KanbanContentComponent(props: {item: KanbanContent}) {

    const { addNewItem } = useContext(KanbanContext);
    const { file } = useContext(BlocksContext);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: '...'
            })
        ],
        content: `<h3>${props.item.text}</h3>`,
        editable: file?.canEdit(),
        onUpdate: ({ editor }) => {
            const newText = editor.getText();
            props.item.text = newText;
        }
    })

    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if (key === "Enter") {
            if (!evt.shiftKey) {
                evt.preventDefault();
                addNewItem(new KanbanContent(""), props.item);
            }
        } else if (key === "Backspace") {
            const currentText = editor?.getText().replaceAll("<br>", "");
            if (currentText === "") {
                evt.preventDefault();
                //deleteBlock(props.block as BaseBlock);
            }
        } else if(key === "/") {
            const currentText = editor?.getText().replaceAll("<br>", "");
            if(currentText && currentText.endsWith("\\")){
                const newText = currentText.slice(0, currentText.length-1);
                console.log(newText)
                editor?.commands.setContent(`<h3>${newText}</h3>`);
                props.item.text = newText;
                return;
            }
            //onAddBlock(evt);
        }
    }

    return <Paper sx={{p: 2, width: "50%", cursor: "pointer"}}>
        <EditorContent editor={editor} onKeyDownCapture={handleKeyDown} style={{ "height": "100%" }} />
    </Paper>
}