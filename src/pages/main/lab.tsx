import * as React from 'react';
import {
    Box, Button
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AuthChecker from "../../components/auth/AuthChecker";
import DayDurationChart from "../../components/charts/DurationEachDays";
import ChooseChartModal from "../../components/modals/ChooseChartModal";
import {useState} from "react";

export default function Lab(){

    const [modal, setModal] = useState<boolean>(false);

    return <AuthChecker loading={false}>
        <Sidebar>

        </Sidebar>
    </AuthChecker>
}





