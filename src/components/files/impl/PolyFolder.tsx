import { PolyFileBase } from "../PolyFileBase";

export class PolyFolder extends PolyFileBase {

    public listFiles: string[]

    constructor(id: string, name: string, lastModified: number, ownerId: string, listFiles: string[]) {
        super(id, name, lastModified, ownerId, true);
        this.listFiles = listFiles;
    }

}