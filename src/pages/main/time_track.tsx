import AuthChecker from "../../components/auth/AuthChecker";
import Sidebar from "../../components/Sidebar";
import {Box, Breadcrumbs, Button, Link, TextField, Typography} from "@mui/material";
import {EditorContent} from "@tiptap/react";
import React, {useContext, useRef, useState} from "react";
import {url} from "../../utils/conf";
import {AlertContext} from "../../components/AlertManager";

export interface PolyTime {
    unit: "day" | "month" | "minute" | "year" | "second" | "hour";
    time: number
}

interface FieldError {
    error: boolean,
    message: string
}

export default function TimeTrackerPage(){

    const { addAlert } = useContext(AlertContext);

    const [fieldErrors, setFieldErrors] = useState<{time: FieldError, project: FieldError, desc: FieldError}>({
        time: {
            error: false,
            message: ""
        },
        project: {
            error: false,
            message: ""
        },
        desc: {
            error: false,
            message: ""
        }
    });

    const time_ref = useRef(null);
    const project_ref = useRef(null);
    const desc_ref = useRef(null);

    const onSend = () => {
        const timeObj: any = time_ref.current;
        const projectObj: any = project_ref.current;
        const descObj: any = desc_ref.current;

        const matches = descObj.value.matchAll(/#[^# ]+/g)
        const tags = [];
        let description = descObj.value;
        for(const match of matches){
            if(match.length === 0)
                continue;
            const tag = match[0].replace(/^#/, "");
            description = description.replaceAll(` ${match[0]}`, "");
            description = description.replaceAll(match[0], "");
            tags.push(tag)
        }

        fetch(url + "/time-tracker", {
            method: "POST",
            body: JSON.stringify({
                time: timeObj.value,
                projectName: projectObj.value,
                description: description,
                tags: tags
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then((response) => {
            if(response.status === 201){
                addAlert({message: "Time Track successfully sent !", severity: "success"});
            }else {
                addAlert({message: "Time Track could not be sent !", severity: "error"});
            }
        });
    }

    const isValidTime = (time: string): boolean => {
        if(/^[0-9]+[dmh]$/g.test(time))
            return true;
        if(/^[0-9]+h[0-9]+$/gi.test(time))
            return true;
        if(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2},[ ]*[0-9]+h$/gi.test(time))
            return true;
        if(/^[0-9]+$/g.test(time))
            return true;
        return false;
    }

    const getTime = (time: string): PolyTime[] => {
        let regex = /^[0-9]+[a-z]$/gi;
        if(regex.test(time)) {
            const timeNumber = removeTime(time);
            if(time.toLowerCase().endsWith("m")){
                return [{time: Number(timeNumber), unit: "minute"}];
            }else if(time.toLowerCase().endsWith("d")){
                return [{time: Number(timeNumber), unit: "day"}];
            }else if(time.toLowerCase().endsWith("h")){
                return [{time: Number(timeNumber), unit: "hour"}];
            }
        }

        regex = /^[0-9]+h[0-9]+$/gi;
        if(regex.test(time)){
            const table = time.split("h");
            return [
                {
                    time: Number(table[0]),
                    unit: "hour"
                },
                {
                    time: Number(table[1]),
                    unit: "minute"
                }
            ]
        }

        regex = /^[0-9]{4}\/[0-9]{2}\/[0-9]{2},[ ]*[0-9]+h$/gi
        if(regex.test(time)){
            const timestr = removeTime(time.replaceAll(/[ ]+/g, ""));
            const tab1 = timestr.split(",");
            const tab2 = tab1[0].split("/");
            return [
                {
                    time: Number(tab1[1]),
                    unit: "hour"
                },
                {
                    time: Number(tab2[0]),
                    unit: "year"
                },
                {
                    time: Number(tab2[1]),
                    unit: "month"
                },
                {
                    time: Number(tab2[2]),
                    unit: "day"
                }
            ]
        }

        regex = /^[0-9]+$/g
        if(regex.test(time))
            return [
                {
                    time: Number(time),
                    unit: "minute"
                }
            ]

        return [];
    }

    const removeTime = (time: string) => time.replaceAll(/[^0-9]/g, '');

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
                <Box display={"flex"} justifyContent={"center"} alignItems={"start"} py={4} height={70} borderRadius={4} boxShadow={"0px 0px 21px 3px #000000"}>
                    <TextField
                        error={fieldErrors.time.error}
                        inputRef={time_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Time"
                        sx={{ "width": "300px", mr: 3 }}
                        helperText={fieldErrors.time.message}
                        onChange={(evt) => {
                            const value = evt.target.value;
                            const error = !isValidTime(value);
                            setFieldErrors((fieldErrors) => ({
                                ...fieldErrors,
                                time: {
                                    error: error,
                                    message: error ? "Invalid Time" : ""
                                }
                            }))
                        }}
                    />
                    <TextField
                        error={fieldErrors.project.error}
                        inputRef={project_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Project"
                        sx={{ "width": "300px", mr: 3 }}
                        helperText={fieldErrors.project.message}
                        onChange={(evt) => {
                            const value = evt.target.value;
                            const error = value.replaceAll(/[ \\s]/g, "") === "";
                            console.log(error)
                            setFieldErrors((fieldErrors) => ({
                                ...fieldErrors,
                                project: {
                                    error: error,
                                    message: error ? "Empty Project" : ""
                                }
                            }))
                        }}
                    />
                    <TextField
                        error={false}
                        inputRef={desc_ref}
                        variant="outlined"
                        color={"secondary"}
                        label="Description"
                        sx={{ "width": "300px", mr: 5 }}
                    />
                    <Button onClick={onSend} color={"secondary"} variant={"outlined"} sx={{width: "140px", height: "55px"}}>
                        <span style={{fontSize: "13pt", fontWeight: "bold"}}>Register</span>
                    </Button>
                </Box>
            </Box>
        </Sidebar>
    </AuthChecker>
}


function getAllMatches(regex: RegExp, text: string) {
    if (regex.constructor !== RegExp) {
        throw new Error('not RegExp');
    }

    var res = [];
    var match = null;

    if (regex.global) {
        while (match = regex.exec(text)) {
            res.push(match);
        }
    }
    else {
        if (match = regex.exec(text)) {
            res.push(match);
        }
    }

    return res;
}