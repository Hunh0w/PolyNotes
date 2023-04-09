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
}

export default function PolyPage(props: {}) {

    const { pageId } = useParams();
    const navigate = useNavigate();
    const [ response, setResponse ] = useState<APIResponse>({ loading: true, file: null });

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
                const memberType = response.headers.get("MemberType")??"editor";

                let parentId = null;
                if ("parentId" in jsonFile)
                    parentId = jsonFile.parentId;

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, parentId) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, generateMatrixBlocks(jsonFile.blocks), memberType, parentId)

                setResponse({loading: false, file: polyFile})
                return;
            }else {
                navigate("/home");
            }
            setResponse({loading: true, file: null})
        })
    }

    useEffect(() => {
        setTimeout(fetchFile, 1000);
    }, [pageId])

    return <AuthChecker loading={response.loading}>
        <Sidebar>
            <PolyFileLoader id={pageId} file={response.file as PolyFileBase} />
        </Sidebar>
    </AuthChecker>
}