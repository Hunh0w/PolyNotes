import { Alert, AlertColor, Box } from "@mui/material";
import React, { useState } from "react";
import { ReactNode } from "react";



interface AlertContextPrototype {
    alerts: PolyAlert[]
    addAlert: (alert: PolyAlert) => void
}

const AlertContextDefaultValue: AlertContextPrototype = {
    alerts: [],
    addAlert: (alert: PolyAlert) => null
}
export const AlertContext = React.createContext<AlertContextPrototype>(AlertContextDefaultValue);

export interface PolyAlert {
    message: string
    severity: AlertColor
}

export default function AlertManager(props: { children: ReactNode }) {

    const [alerts, setAlerts] = useState<PolyAlert[]>([]);

    const addAlert = (alert: PolyAlert) => {
        setAlerts((prev: PolyAlert[]) => {
            return [alert, ...prev];
        })
    }

    const removeAlert = (index: number) => {
        setAlerts((prev: PolyAlert[]) => {
            return prev.filter((alert: PolyAlert, alertIndex: number) => alertIndex !== index);
        })
    }

    const AlertContextValue: AlertContextPrototype = {
        alerts: alerts,
        addAlert: addAlert
    }

    return <AlertContext.Provider value={AlertContextValue}>
        {props.children}
        <Box width={"20%"} left={20} position="fixed" bottom={20} zIndex={"99999"}>
            {alerts.map((alert: PolyAlert, index: number) => {
                return <Alert sx={{ mt: 2 }} key={index} onClose={() => { removeAlert(index) }} severity={alert.severity}>{alert.message}</Alert>
            })}
        </Box>
    </AlertContext.Provider>
}