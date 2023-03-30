import BaseBlock from "../../blocks/BaseBlock"
import { PolyFileBase } from "../PolyFileBase";

export class PolyFile extends PolyFileBase {

    public blocks: BaseBlock[][]

    constructor(id: string, name: string, lastModified: number, ownerId: string, blocks: BaseBlock[][], parentId?: string) {
        super(id, name, lastModified, ownerId, false, parentId);
        this.blocks = blocks;
    }

}