import BaseBlock from "../blocks/BaseBlock"


export abstract class PolyFileBase {

    public id: string
    public name: string
    public lastModified: number
    public ownerId: string
    public isDirectory: boolean;
    public parentId: string | null;

    constructor(id: string, name: string, lastModified: number, ownerId: string, isDirectory: boolean, parentId?: string) {
        this.id = id;
        this.name = name;
        this.lastModified = lastModified;
        this.ownerId = ownerId;
        this.isDirectory = isDirectory;
        this.parentId = parentId??null;
    }

    public abstract getHash(): string;

}