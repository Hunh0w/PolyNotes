import { ReactNode } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

export default abstract class BaseBlock {

    id!: UniqueIdentifier;


    abstract getComponent(): ReactNode;
    abstract getType(): string;
    abstract getOverlayLabel(): string;
    abstract getValues(): any;

    public generateId() {

        const min = 0;
        const max = 2147483647;
        this.id = Math.floor(min + Math.random() * (max - min));
    }

    public setId(id: UniqueIdentifier) {
        this.id = id;
    }

}
