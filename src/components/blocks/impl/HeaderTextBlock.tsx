import {Box, Typography} from "@mui/material";
import BaseBlock from "../BaseBlock";
import ContentEditable from "react-contenteditable";
import {KeyboardEventHandler, useEffect, useState} from "react";

interface Props {
    text: string
    headerType: HeaderTextType,
    setText: (text: string) => void
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
        return <Component {...this} />
    }

}

function Component(props: Props) {

    const [text, setText] = useState<string>(props.text);

    let keysDown: string[] = [];

    const handleChange = (evt: any) => {
        const newText = evt.target.value;
        props.setText(newText);
    };


    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if(key === "Enter") {
            if(!evt.shiftKey) {
                evt.preventDefault();
                console.log("new component !!")
            }
        }
    }

    return <Box width={"100%"}>
        <Typography variant={props.headerType} >
            <ContentEditable html={text} onChange={handleChange} onKeyDown={handleKeyDown} />
        </Typography>
    </Box>
}