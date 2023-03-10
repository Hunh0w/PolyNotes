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
    const [keysDown, setKeysDown] = useState<string[]>([]);

    const handleChange = (evt: any) => {
        const newText = evt.target.value;

        setText(newText);
        props.setText(newText);
    };

    const handleKeyUp = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if(!keysDown.includes(key)) return;
        setKeysDown(keysDown.filter(keyDown => keyDown !== key));
        if(keysDown.includes("Enter")){
            if(keysDown.includes("Shift")){
                console.log("newline !!!")
            }else {
                console.log("new component !!!")
            }
        }
    }

    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        const key = evt.key;
        if(key === "Enter") evt.preventDefault()
        if(keysDown.includes(key)) return;
        setKeysDown([...keysDown, key]);
        if(!keysDown.includes("Shift")) return;
        if(key === "Enter" || keysDown.includes("Enter")) setText(text+"<br>");
    }

    return <Box width={"100%"}>
        <Typography variant={props.headerType}>
            <ContentEditable html={text} onChange={handleChange} onKeyUpCapture={handleKeyUp} onKeyDownCapture={handleKeyDown} />
        </Typography>
    </Box>
}