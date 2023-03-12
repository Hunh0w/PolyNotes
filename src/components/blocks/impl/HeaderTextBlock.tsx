import {Box, Typography} from "@mui/material";
import BaseBlock from "../BaseBlock";
import ContentEditable from "react-contenteditable";
import {KeyboardEventHandler, ReactNode, useCallback, useContext, useEffect, useRef, useState} from "react";
import {BlocksContext} from "../../../pages/test";

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

    const [text, setText] = useState<string>(props.text);
    const { addNewBlock, deleteBlock, focusedBlock } = useContext(BlocksContext);

    const contentEditableRef = useRef(null);

    const isFocused = focusedBlock ? focusedBlock.id === props.block?.id : false;


    const handleChange = (evt: any) => {
        const newText = evt.target.value;
        setText(newText);
        props.setText(newText);
    };


    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if(key === "Enter") {
            if(!evt.shiftKey) {
                evt.preventDefault();
                const newBlock = new HeaderTextBlock("", props.headerType);
                addNewBlock(newBlock, props.block as BaseBlock);
            }
        }else if(key === "Backspace"){
            const currentText = evt.currentTarget.innerHTML.replaceAll("<br>", "");
            if(currentText === "") {
                deleteBlock(props.block as BaseBlock);
            }
        }
    }

    useEffect(() => {
        if(isFocused){
            const node: any = contentEditableRef.current;
            node.focus();
        }
    }, [isFocused, contentEditableRef]);

    return <Box width={"100%"}>
        <Typography variant={props.headerType}>
            <ContentEditable html={text} onChange={handleChange} onKeyDown={handleKeyDown} innerRef={contentEditableRef} />
        </Typography>
    </Box>
}