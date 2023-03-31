import {useNavigate, useParams} from "react-router-dom"
import Sidebar from "../../components/Sidebar";
import PolyFileLoader from "../../components/files/PolyFileLoader";
import AuthChecker from "../../components/auth/AuthChecker";
import {useEffect, useState} from "react";
import {url} from "../../utils/conf";
import {PolyFileBase} from "../../components/files/PolyFileBase";
import {PolyFolder} from "../../components/files/impl/PolyFolder";
import {PolyFile} from "../../components/files/impl/PolyFile";
import {generateMatrixBlocks} from "../../components/blocks/BlockFactory";

interface APIResponse {
    loading: boolean
    file: PolyFileBase | null
    files: PolyFileBase[]
}

export default function PolyPage(props: {}) {

    const { pageId } = useParams();
    const navigate = useNavigate();
    const [ response, setResponse ] = useState<APIResponse>({ loading: true, file: null, files: [] });

    const fetchFile = () => {
        const token = localStorage.getItem("access_token");
        if(!pageId) {
            navigate("/home");
            return;
        }
        const filePromise = fetch(url + "/file/" + pageId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                const jsonFile = await response.json();

                let parentId = null;
                if("parentId" in jsonFile)
                    parentId = jsonFile.parentId;

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, parentId) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, generateMatrixBlocks(jsonFile.blocks), parentId)

                console.log(polyFile);

                return {file: polyFile}
            } else {
                return {file: null}
            }
        })
        const filesPromise = fetch(url + "/files", {
            method: "GET",
            headers: {
                "Authorization": "Bearer "+token,
                "Accept": "application/json"
            }
        }).then(async (response) => {
            if(response.status === 200){
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

                return {files: files};
            }else{
                return {files: null}
            }
        });
        Promise.all([filePromise,filesPromise]).then((results) => {
            let files = null;
            let file = null;
            for(let i = 0; i < results.length; i++){
                const obj = results[i];
                if("file" in obj)
                    file = obj.file;
                else if("files" in obj)
                    files = obj.files;
            }
            if(!file || !files){
                setResponse({loading: true, file: null, files: []});
                return;
            }
            setResponse({loading: false, file: file, files: files});
        })
    }

    useEffect(() => {
        setResponse({ loading: true, file: null, files: [] })
        setTimeout(fetchFile, 1000);
    }, [pageId])

    console.log(response.file)

    return <AuthChecker loading={response.loading}>
        <Sidebar>
            <PolyFileLoader id={pageId} file={response.file as PolyFileBase} files={response.files} />
        </Sidebar>
    </AuthChecker>
}