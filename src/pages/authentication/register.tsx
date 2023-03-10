import {
    Box,
    Button,
    Checkbox,
    Container,
    Divider, FormControl,
    FormControlLabel,
    FormHelperText,
    Link,
    TextField,
    Typography
} from "@mui/material";
import PasswordArea, {InputError} from "../../components/inputs/PasswordInput";
import {useRef, useState} from "react";
import {url} from "../../utils/conf";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {

    const navigate = useNavigate();

    const firstname_ref = useRef(null);
    const lastname_ref = useRef(null);
    const email_ref = useRef(null);
    const password_ref = useRef(null);
    const password_confirm_ref = useRef(null);
    const cgu_ref = useRef(null);

    const [apiError, setApiError] = useState<string | undefined>(undefined);

    const [firstnameError, setFirstnameError] = useState<string | undefined>(undefined);
    const [lastnameError, setLastnameError] = useState<string | undefined>(undefined);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);

    const [passwordError, setPasswordError] = useState<InputError | undefined>(undefined);
    const [passwordConfirmError, setPasswordConfirmError] = useState<InputError | undefined>(undefined);

    const [cguError, setCGUError] = useState<string | undefined>(undefined);

    const verify = (): boolean => {
        const firstname: any = firstname_ref.current;
        const lastname: any = lastname_ref.current;
        const email: any = email_ref.current;
        const password: any = password_ref.current;
        const password_confirm: any = password_confirm_ref.current;
        const cgu: any = cgu_ref.current;

        let pass = true;

        if(firstname.value === ""){
            setFirstnameError("cannot be empty")
            pass = false;
        }

        if(lastname.value === ""){
            setLastnameError("cannot be empty")
            pass = false;
        }

        if(email.value === ""){
            setEmailError("cannot be empty")
            pass = false;
        }

        if(password.value !== password_confirm.value){
            const message = "different passwords !";
            setPasswordError({message: message})
            setPasswordConfirmError({message: message})
            pass = false;
        }else if(password.value === "") {
            const message = "cannot be empty";
            setPasswordError({message: message})
            setPasswordConfirmError({message: message})
            pass = false;
        }

        if(!cgu.checked){
            setCGUError("You must accept the CGU");
            pass = false;
        }

        return pass;
    }

    const register = () => {
        if(!verify()) return;

        const firstname: any = firstname_ref.current;
        const lastname: any = lastname_ref.current;
        const email: any = email_ref.current;
        const password: any = password_ref.current;

        const register_payload = {
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            password: password.value
        }

        fetch(url+"/register", {
            method: "POST",
            body: JSON.stringify(register_payload),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async resp => {
            if(resp.status === 401){
                const jsonObj: any = await resp.json();
                setApiError("Error: "+jsonObj.message)
                return;
            }
            if(resp.status === 201){
                navigate("/login")
            }
        });
    }

    const resetError = (inputError: any,
                        inputErrorSetter: (inputError: any) => void) => {
        if(inputError){
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
            <Box display={"flex"} justifyContent="center" width={"100%"}>
                <TextField
                    error={firstnameError ? true : false}
                    onChange={() => resetError(firstnameError, setFirstnameError)}
                    variant="outlined"
                    label="First Name"
                    sx={{ "width": "200px", mr: 1 }}
                    inputRef={firstname_ref}
                    helperText={firstnameError}
                />
                <TextField
                    error={lastnameError ? true : false}
                    onChange={() => resetError(lastnameError, setLastnameError)}
                    variant="outlined"
                    label="Last Name"
                    sx={{ "width": "200px", ml: 1 }}
                    inputRef={lastname_ref}
                    helperText={lastnameError}
                />
            </Box>
            <Box display={"flex"} justifyContent="center" width={"100%"} mt={2}>
                <TextField
                    error={emailError ? true : false}
                    onChange={() => resetError(emailError, setEmailError)}
                    variant="outlined"
                    label="E-Mail Address"
                    sx={{ "width": "300px" }}
                    inputRef={email_ref}
                    helperText={emailError}
                />
            </Box>
            <Divider variant="middle" sx={{ "width": "50%", mt: 3 }} />
            <Box display={"flex"} flexDirection="column" alignItems="center" width={"100%"} mt={3}>
                <PasswordArea
                    sx={{ "width": "300px" }}
                    onChange={() => resetError(passwordError, setPasswordError)}
                    inputRef={password_ref}
                    error={passwordError}>Password</PasswordArea>
                <PasswordArea
                    sx={{ "width": "300px" }}
                    onChange={() => resetError(passwordConfirmError, setPasswordConfirmError)}
                    inputRef={password_confirm_ref}
                    error={passwordConfirmError}>Password Confirmation</PasswordArea>
            </Box>
            <Box mt={3} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <FormControl
                    error={cguError ? true : false}>
                    <FormControlLabel
                        control={<Checkbox inputRef={cgu_ref} onChange={() => resetError(cguError, setCGUError)} />}
                        label={<span>I accept the <Link href="#">CGU</Link></span>} />
                    <FormHelperText>{cguError}</FormHelperText>
                </FormControl>


                <Button variant="contained" size="large" sx={{ mt: 5 }} onClick={register}>Sign Up</Button>
            </Box>
        </Box>
    </Container>
}