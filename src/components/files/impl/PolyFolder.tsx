import { PolyFileBase } from "../PolyFileBase";
import md5 from 'md5';

export class PolyFolder extends PolyFileBase {


    constructor(id: string, name: string, lastModified: number, ownerId: string, parentId?: string) {
        super(id, name, lastModified, ownerId, true, parentId);
    }

    getHash(): string {
        return md5(this.id+this.name+this.lastModified+this.ownerId+this.parentId);
    }

}