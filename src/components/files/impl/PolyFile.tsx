import BaseBlock from "../../blocks/BaseBlock"
import { PolyFileBase } from "../PolyFileBase";
import md5 from "md5";

export class PolyFile extends PolyFileBase {

    public blocks: BaseBlock[][]
    public memberType: string

    constructor(id: string, name: string, lastModified: number, ownerId: string, blocks: BaseBlock[][], memberType: string, parentId?: string) {
        super(id, name, lastModified, ownerId, false, parentId);
        this.blocks = blocks;
        this.memberType = memberType;
    }

    canEdit(): boolean {
        if(!this.memberType) return false;
        if(this.memberType.toLowerCase() === "editor" || this.memberType.toLowerCase() === "owner")
            return true;
        return false;
    }

    getHash(): string {
        return md5(this.id + this.name + this.lastModified + this.ownerId + this.getHashBlocks());
    }

    getHashBlocks() {
        let str = "";
        for(let i1 = 0; i1 < this.blocks.length; i1++){
            const blockList = this.blocks[i1];
            for(let i2 = 0; i2 < blockList.length; i2++){
                const block = blockList[i2];
                str += block.id+block.getType();
            }
        }
        return md5(str);
    }
}