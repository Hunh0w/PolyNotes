import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import PasswordArea, { InputError } from "../../components/inputs/PasswordInput";
import { useRef, useState } from "react";
import { url } from "../../utils/conf";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const identifier_ref = useRef(null);
    const password_ref = useRef(null);

    const [identifierError, setIdentifierError] = useState<string | undefined>(undefined);
    const [passwordError, setPasswordError] = useState<InputError | undefined>(undefined);

    const [apiError, setApiError] = useState<string | undefined>(undefined);

    const verify = (): boolean => {
        const identifier: any = identifier_ref.current;
        const password: any = password_ref.current;

        let pass = true;

        if (identifier.value === "") {
            setIdentifierError("cannot be empty")
            pass = false;
        }

        if (password.value === "") {
            setPasswordError({ message: "cannot be empty" })
            pass = false;
        }

        return pass;
    }

    const login = () => {

        if (!verify()) return;

        const identifier: any = identifier_ref.current;
        const password: any = password_ref.current;

        const login_payload = {
            identifier: identifier.value,
            password: password.value
        }

        fetch(url + "/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login_payload)
        }).then(resp => {
            if (resp.status === 401) {
                setApiError("Invalid identifier or password")
                return;
            }
            if (resp.status === 200) {
                let token = resp.headers.get("Authorization");
                if (token == null) {
                    console.log("token null!");
                    return;
                }
                token = token.split(" ")[1];

                localStorage.setItem("access_token", token);
                navigate("/home")
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const resetError = (inputError: any,
        inputErrorSetter: (inputError: any) => void) => {
        if (inputError) {
            inputErrorSetter(undefined);
        }
    }

    return <Container maxWidth="xl" sx={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
        <div style={{ "display": "flex", "marginTop": "30px" }}>
            <img src="/img/polybunny.png" width={200} alt={"a polybunny"} />
            <Typography variant="h2" sx={{ "textAlign": "center", mt: 10 }}><span style={{ "color": "purple" }}>Poly</span>Notes</Typography>
        </div>

        <Box width={"70%"} height={"auto"} sx={{ "border": "4px solid black", my: 10, p: 8 }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography color="black" variant="h3" sx={{ "textAlign": "center" }} pb={2}>Authentication</Typography>
            <Typography color="darkred" variant="h5" sx={{ "textAlign": "center" }} pb={2}>{apiError}</Typography>
            <Divider variant="middle" sx={{ "width": "70%", mb: 5 }} />
            <Box display={"flex"} justifyContent="center" width={"100%"} mt={2}>
                <TextField
                    error={identifierError ? true : false}
                    inputRef={identifier_ref}
                    variant="outlined"
                    label="Nickname or Email"
                    sx={{ "width": "300px" }}
                    onChange={() => resetError(identifierError, setIdentifierError)}
                    helperText={identifierError}
                />
            </Box>
            <Box display={"flex"} flexDirection="column" alignItems="center" width={"100%"} mt={3}>
                <PasswordArea sx={{ "width": "300px" }} error={passwordError} onChange={() => resetError(passwordError, setPasswordError)} inputRef={password_ref}>Password</PasswordArea>
            </Box>
            <Button variant="contained" size="large" sx={{ mt: 5 }} onClick={login}>Sign In</Button>
        </Box>
    </Container>
}