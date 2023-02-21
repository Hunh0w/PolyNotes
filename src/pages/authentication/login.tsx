import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PrimarySearchAppBar from "../../components/header";


export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return <Container maxWidth="xl" sx={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
        <div style={{ "display": "flex", "marginTop": "30px" }}>
            <img src="/img/polybunny.png" width={200} />
            <Typography variant="h2" sx={{ "textAlign": "center", mt: 10 }}><span style={{ "color": "purple" }}>Poly</span>Notes</Typography>
        </div>

        <Box width={"70%"} height={"auto"} sx={{ "border": "4px solid black", mt: 10, p: 8 }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography color="black" variant="h3" sx={{ "textAlign": "center" }} pb={5}>Authentification</Typography>
            <Divider variant="middle" sx={{ "width": "70%", mb: 5 }} />
            <Box display={"flex"} justifyContent="center" width={"100%"}>
                <TextField
                    variant="outlined"
                    label="Prénom"
                    sx={{ "width": "200px", mr: 1 }}
                />
                <TextField
                    variant="outlined"
                    label="Nom"
                    sx={{ "width": "200px", ml: 1 }}
                />
            </Box>
            <Box display={"flex"} justifyContent="center" width={"100%"} mt={2}>
                <TextField
                    variant="outlined"
                    label="Adresse Mail"
                    sx={{ "width": "300px" }}
                />
            </Box>
            <Divider variant="middle" sx={{ "width": "50%", mt: 3 }} />
            <Box display={"flex"} flexDirection="column" alignItems="center" width={"100%"} mt={3}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <TextField
                    variant="outlined"
                    label="Password Confirmation"
                    sx={{ "width": "300px" }}
                />
            </Box>
            <Button variant="contained" size="large" sx={{ mt: 5 }}>Connexion</Button>
        </Box>
    </Container>
}