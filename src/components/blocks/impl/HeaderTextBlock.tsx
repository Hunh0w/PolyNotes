import {Box, Typography} from "@mui/material";
import BaseBlock from "../BaseBlock";
import ContentEditable from "react-contenteditable";
import {useEffect, useState} from "react";

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

    getComponent(): React.ReactNode {
        return <Component {...this} />
    }

}

function Component(props: Props) {

    const [text, setText] = useState<string>(props.text);

    const handleChange = (evt: any) => {
        setText(evt.target.value);
        props.setText(evt.target.value);
    };

    return <Box width={"100%"}>
        <ContentEditable html={text} onChange={handleChange}  />
    </Box>
}