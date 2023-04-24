import AuthChecker from "../../components/auth/AuthChecker";
import Sidebar from "../../components/Sidebar";
import {Box, Breadcrumbs, Button, Link, TextField, Typography} from "@mui/material";
import {EditorContent} from "@tiptap/react";
import React, {useRef} from "react";


export default function TimeTrackerPage(){

    const time_ref = useRef(null);
    const project_ref = useRef(null);
    const desc_ref = useRef(null);

    const onSend = () => {
        const timeObj: any = time_ref.current;
        const projectObj: any = project_ref.current;
        const descObj: any = desc_ref.current;


    }

    return <AuthChecker loading={false}>
        <Sidebar>
            <Box mb={5}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography fontWeight={"bold"}>
                        <span style={{ color: "purple" }}>Poly</span>
                        <span style={{ color: "#000" }}>Notes</span>
                    </Typography>
                    <Typography color="text.primary" fontWeight={"bold"}>
                        <span style={{ "color": "purple" }}>Time</span><span style={{ "color": "black" }}>Tracker</span>
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box width={"100%"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} py={4} borderRadius={4} boxShadow={"0px 0px 21px 3px #000000"}>
                    <TextField
                        error={false}
                        inputRef={time_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Time"
                        sx={{ "width": "300px", mr: 3 }}
                    />
                    <TextField
                        error={false}
                        inputRef={project_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Project"
                        sx={{ "width": "300px", mr: 3 }}
                    />
                    <TextField
                        error={false}
                        inputRef={desc_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Description"
                        sx={{ "width": "300px", mr: 5 }}
                    />
                    <Button onClick={onSend} color={"secondary"} variant={"outlined"} sx={{width: "100px", height: "55px"}}>
                        <span style={{fontSize: "13pt", fontWeight: "bold"}}>Register</span>
                    </Button>
                </Box>
            </Box>
        </Sidebar>
    </AuthChecker>
}