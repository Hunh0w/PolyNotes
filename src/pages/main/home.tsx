import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {Container, Typography} from "@mui/material";
import RecentFiles from "../../components/RecentFiles";


export default function HomePage(){

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) {
            navigate("/")
        }
    }, [navigate]);

    return <Sidebar>
        <Typography variant={"h4"}>
            Recent
        </Typography>
        <RecentFiles />
    </Sidebar>
}