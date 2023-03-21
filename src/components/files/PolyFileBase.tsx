import BaseBlock from "../blocks/BaseBlock"


export abstract class PolyFileBase {

    public name: string
    public lastModified: number
    public ownerId: string
    public isDirectory: boolean;

    constructor(name: string, lastModified: number, ownerId: string, isDirectory: boolean) {
        this.name = name;
        this.lastModified = lastModified;
        this.ownerId = ownerId;
        this.isDirectory = isDirectory;
    }

}