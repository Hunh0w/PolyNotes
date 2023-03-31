import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Box, Container, Typography } from "@mui/material";
import RecentFiles from "../../components/RecentFiles";
import FilesExplorer from "../../components/tables/FilesExplorer";
import Loader from "../../components/loader/Loader";
import AuthChecker from "../../components/auth/AuthChecker";
import { url } from "../../utils/conf";
import { PolyFileBase } from "../../components/files/PolyFileBase";
import { PolyFolder } from "../../components/files/impl/PolyFolder";
import { PolyFile } from "../../components/files/impl/PolyFile";
import {getOwnedFiles} from "../../services/FilesService";

interface APIResponse {
    files: PolyFileBase[] | null
    loading: boolean
}

export default function HomePage() {

    const [ response, setResponse ] = useState<APIResponse>({files: [], loading: true})
    const navigate = useNavigate();

    const fetchFile = () => {
        getOwnedFiles().then((response) => {
            if(response.status === 200){
                const files = response.files;
                setResponse({files: files, loading: files === null})
            }else if(response.status === 401){
                navigate("/login");
            }else {
                navigate("/");
            }
        })
    }

    useEffect(() => {
        fetchFile();
    }, []);

    return <AuthChecker loading={response.loading}>
        <Sidebar>
            <Typography variant={"h4"}>
                Recent
            </Typography>

            <RecentFiles />

            <Box mt={10}>
                <FilesExplorer files={response.files as PolyFileBase[]} />
            </Box>
        </Sidebar >
    </AuthChecker>
}