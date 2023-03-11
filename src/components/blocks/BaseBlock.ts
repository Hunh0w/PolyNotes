import {ReactNode} from "react";
import {UniqueIdentifier} from "@dnd-kit/core";

let idRef = 1;

export default abstract class BaseBlock {

    id: UniqueIdentifier
    type: BlockType;

    constructor(type: BlockType) {
        this.type = type;
        this.id = idRef;
        idRef++;
    }

    abstract getComponent(): ReactNode;
    abstract getType(): string;

}

export type BlockType = (
    // Primary Types
    "headerText" | "image" | "paragraph" |

    // Advanced Types
    "list" | "database"
);