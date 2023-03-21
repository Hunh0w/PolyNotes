import { ReactNode } from "react";
import { UniqueIdentifier } from "@dnd-kit/core";

let idRef: number = 1;

export default abstract class BaseBlock {

    id!: UniqueIdentifier;


    abstract getComponent(): ReactNode;
    abstract getType(): string;

    public generateId() {
        this.id = idRef;
        idRef++;
    }

    public setId(id: UniqueIdentifier) {
        this.id = id;
    }

}
