import React from "react";
import Sidebar from "../../components/Sidebar";
import { Box, Typography } from "@mui/material";
import RecentFiles from "../../components/RecentFiles";
import FilesExplorer from "../../components/tables/FilesExplorer";
import AuthChecker from "../../components/auth/AuthChecker";

export default function HomePage() {

    return <AuthChecker loading={false}>
        <Sidebar>
            <Typography variant={"h4"}>
                Recent
            </Typography>

            <RecentFiles />

            <Box mt={10}>
                <FilesExplorer />
            </Box>
        </Sidebar >
    </AuthChecker>
}