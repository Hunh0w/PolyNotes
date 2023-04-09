import {url} from "../utils/conf";
import {PolyFileBase} from "../components/files/PolyFileBase";
import {PolyFolder} from "../components/files/impl/PolyFolder";
import {PolyFile} from "../components/files/impl/PolyFile";
import {Alert} from "@mui/material";


export function getOwnedFiles() {
    return fetch(url + "/files", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access_token")
        }
    }).then(async (response) => {
        if (response.status === 200) {
            const jsonFiles = await response.json();
            let files: PolyFileBase[] = [];
            for (let i = 0; i < jsonFiles.files.length; i++) {
                const jsonFile = jsonFiles.files[i];

                let parentId = null;
                if("parentId" in jsonFile)
                    parentId = jsonFile.parentId;

                const polyfile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, parentId) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, [], "owner", parentId);
                files.push(polyfile);
            }

            let shared: PolyFile[] = [];
            for(let i = 0; i < jsonFiles.shared.length; i++){
                const sharedObj = jsonFiles.shared[i];
                const jsonFile = sharedObj.file;

                let parentId = null;
                if("parentId" in jsonFile)
                    parentId = jsonFile.parentId;

                if(jsonFile.isDirectory)
                    continue;

                const polyfile: PolyFile = new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, [], sharedObj.type, parentId);

                shared.push(polyfile);
            }

            return {files: files, shared: shared, status: response.status};
        } else {
            return {files: null, shared: null, status: response.status};
        }
    })
}

export function deleteFile(file: PolyFileBase){
    const kind = file.isDirectory ? "Folder" : "File";

    return fetch(url+"/file/"+file.id, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer "+localStorage.getItem("access_token")
        }
    }).then((response) => {
       if(response.status === 200){
           return {severity: "success", message: kind+" "+file.name+" successfully deleted"}
       } else if(response.status === 403) {
           return {severity: "error", message: "You don't have permission to delete the "+kind+" "+file.name}
       }else if(response.status === 401) {
           return {severity: "warning", message: "You need to be connected to delete a "+kind}
       }else if(response.status === 404) {
           return {severity: "warning", message: kind+" "+file.name+" doesn't exists"}
       }
    });
}