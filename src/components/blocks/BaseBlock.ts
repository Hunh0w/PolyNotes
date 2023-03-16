import { ReactNode } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

let idRef = 1;

export default abstract class BaseBlock {

    id: UniqueIdentifier;

    constructor() {
        this.id = idRef;
        idRef++;
    }

    abstract getComponent(): ReactNode;
    abstract getType(): string;

}
