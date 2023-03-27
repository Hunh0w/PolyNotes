import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import AuthChecker from "../../components/auth/AuthChecker";
import { generateMatrixBlocks } from "../../components/blocks/BlockFactory";
import { PolyFile } from "../../components/files/impl/PolyFile";
import { PolyFolder } from "../../components/files/impl/PolyFolder";
import { PolyFileBase } from "../../components/files/PolyFileBase";
import PolyFileEditor from "../../components/files/PolyFileEditor";
import Sidebar from "../../components/Sidebar";
import { url } from "../../utils/conf";


export default function PolyPage(props: {}) {

    const { pageId } = useParams();

    const navigate = useNavigate();
    const token = localStorage.getItem("access_token");
    const [file, setFile] = useState<PolyFileBase | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchFile = () => {
        return fetch(url + "/file/" + pageId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                const jsonFile = await response.json();

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, jsonFile.listFiles) :
                    new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, generateMatrixBlocks(jsonFile.blocks))

                setFile(polyFile);
                setLoading(false);
            } else {
                navigate("/home");
            }
        })
    }

    useEffect(() => {
        if (!pageId) {
            navigate("/home");
            return;
        }
        fetchFile();
    }, [])

    if (!file || !pageId) {
        navigate("/home");
        return <></>;
    }

    return <AuthChecker loading={loading}>
        <Sidebar>
            <PolyFileBaseDisplay polyfile={file} pageId={pageId} />
        </Sidebar>
    </AuthChecker>
}

function PolyFileBaseDisplay(props: { polyfile: PolyFileBase, pageId: string }) {

    if (props.polyfile.isDirectory) {
        const file = props.polyfile as PolyFolder;
        return <Box>
            <Typography>Folder Name: {file?.name}</Typography>
            <Typography>Last Modified: {file?.lastModified}</Typography>
            <Typography>isDirectory: {file?.isDirectory}</Typography>
        </Box>
    } else {
        const file = props.polyfile as PolyFile;
        return <PolyFileEditor file={file} pageId={props.pageId} />
    }
}