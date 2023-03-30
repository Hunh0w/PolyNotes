import { PolyFileBase } from "../PolyFileBase";

export class PolyFolder extends PolyFileBase {


    constructor(id: string, name: string, lastModified: number, ownerId: string, parentId?: string) {
        super(id, name, lastModified, ownerId, true, parentId);
    }

}