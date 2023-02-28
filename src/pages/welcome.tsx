import { Box, Button, Container, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface StartingItemProps {
    setStarted: (started: boolean) => void
}

function StartingItem(props: StartingItemProps) {
    return (<Button color={"secondary"} variant="contained" size={"large"} onClick={e => { props.setStarted(true) }}>
        Start
    </Button>)
}

function StartedItem() {
    const navigate = useNavigate()

    return (<Grid container
        direction={"column"}
        alignItems={"center"}
    >
        <Grid item xs={8}>
            <Button color={"secondary"} variant="contained" size={"large"} onClick={e => navigate("/login")}>
                Se connecter
            </Button>
        </Grid>
        <Grid item xs={8}>
            <Button color={"secondary"} variant="contained" size={"large"} onClick={e => navigate("/register")}>
                S'inscrire
            </Button>
        </Grid>
    </Grid>)
}

export default function WelcomePage() {

    const [started, setStarted] = useState(false)

    return (<Container maxWidth={"xl"}>
        <Grid container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={15}
        >
            <Grid item container xs={8} justifyContent={"center"} alignItems={"center"}>
                <img src={"/img/polynotes1.png"} alt={"polynotes logo"} />
            </Grid>
            <Grid item container xs={12} justifyContent={"center"} alignItems={"center"}>
                <Box width={"100%"} paddingY={10} display={"flex"} justifyContent={"center"} sx={{ "border": "4px solid #9642D4", "backgroundColor": "rgba(0,0,0,0.8)", "boxShadow": "0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0)" }}>
                    {started ? <StartedItem /> : <StartingItem setStarted={setStarted} />}
                </Box>
            </Grid>
        </Grid >
    </Container>)
}