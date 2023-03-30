import {PolyFileBase} from "../components/files/PolyFileBase";


export function getParent(file: PolyFileBase, files: PolyFileBase[]){
    if(!file.parentId) return null;
    for(let i = 0; i < files.length; i++){
        const listFile = files[i];
        if(listFile.id === file.parentId)
            return listFile;
    }
    return null;
}
export function getPathOfFile(file: PolyFileBase, files: PolyFileBase[]){
    let path = [];
    let currentFile: PolyFileBase | null = file;
    while(currentFile != null){
        path.push(currentFile);
        currentFile = getParent(currentFile, files);
    }
    return path.reverse();
}