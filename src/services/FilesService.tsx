import {url} from "../utils/conf";
import {PolyFileBase} from "../components/files/PolyFileBase";
import {PolyFolder} from "../components/files/impl/PolyFolder";
import {PolyFile} from "../components/files/impl/PolyFile";


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
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, [], parentId);
                files.push(polyfile);
            }

            return {files: files, status: response.status};
        } else {
            return {files: null, status: response.status};
        }
    })
}