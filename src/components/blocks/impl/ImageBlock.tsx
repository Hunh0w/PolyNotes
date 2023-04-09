import BaseBlock from "../BaseBlock";
import {HeaderTextType} from "./TextBlock";
import {Box} from "@mui/material";

export default class ImageBlock extends BaseBlock {

    public url: string;
    public size: number;

    constructor(url: string, size: number, generateId: boolean) {
        super();
        this.url = url;
        this.size = size;
        if (generateId)
            this.generateId();
    }

    getComponent(): React.ReactNode {
        return <Component block={this} />;
    }

    getOverlayLabel(): string {
        return "Image";
    }

    getType(): string {
        return "image";
    }

    getValues(): any {
        return {
            url: this.url,
            size: this.size
        }
    }

}

function Component(props: {block: ImageBlock}){

    const size_coef = props.block.size * 0.1;
    const width = 100 * size_coef;

    return <Box width={"100%"}>
        <img src={props.block.url} width={width} />
    </Box>
}