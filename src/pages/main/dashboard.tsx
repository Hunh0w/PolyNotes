import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {isConnected} from "../../utils/auth-manager";
import MiniDrawer from "../../components/Sidebar";
import {Typography} from "@mui/material";


export default function DashboardPage(){

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if(!token) {
            navigate("/")
        }
    }, []);


    return <MiniDrawer>
    </MiniDrawer>
}