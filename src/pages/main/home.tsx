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


export default function HomePage() {

    const [files, setFiles] = useState<PolyFileBase[]>([]);
    const navigate = useNavigate();

    const fetchFile = () => {
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
                    const polyfile: PolyFileBase = jsonFile.isDirectory ?
                        new PolyFolder(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, []) :
                        new PolyFile(jsonFile.id, jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, []);
                    files.push(polyfile);
                }

                setFiles(files);
            } else if (response.status === 401) {
                navigate("/login");
            } else {
                navigate("/");
            }
        })
    }

    return <AuthChecker promise={fetchFile()}>
        <Sidebar>
            <Typography variant={"h4"}>
                Recent
            </Typography>

            <RecentFiles />



            <Box mt={10}>
                <FilesExplorer files={files} />
            </Box>


        </Sidebar >
    </AuthChecker>
}