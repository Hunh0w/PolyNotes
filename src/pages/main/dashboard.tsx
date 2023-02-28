import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {isConnected} from "../../utils/auth-manager";
import MiniDrawer from "../../components/Sidebar";
import {Typography} from "@mui/material";


export default function DashboardPage(){

    const navigate = useNavigate();

    useEffect(() => {
        isConnected().then(connected => {
            if(!connected)
                navigate("/")
        })
    }, [navigate]);

    return <>
        <MiniDrawer>

        </MiniDrawer>
    </>
}