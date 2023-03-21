import { PolyFileBase } from "../PolyFileBase";

export class PolyFolder extends PolyFileBase {

    public listFiles: string[]

    constructor(name: string, lastModified: number, ownerId: string, listFiles: string[]) {
        super(name, lastModified, ownerId, true);
        this.listFiles = listFiles;
    }

}