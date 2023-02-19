import {Button, Container, Grid, Typography} from "@mui/material";
import React from "react";
import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";

export default function ErrorPage() {

    const error = useRouteError()
    const navigate = useNavigate()

    if(!isRouteErrorResponse(error)){
        navigate("/")
        return <></>;
    }


    return (<Container maxWidth={"xl"} style={{"marginTop": "2%", "textAlign": "center"}}>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={"h1"}>
                    { error.status }
                </Typography>
                <Typography variant={"h4"}>
                    { error.statusText }
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <img src={"/img/error.jpg"} width={"60%"} alt={"error"} />
            </Grid>
            <Grid item xs={12}>
                <Button variant={"contained"} onClick={evt => navigate("/")}>Back to Home</Button>
            </Grid>
        </Grid>
    </Container>)
}