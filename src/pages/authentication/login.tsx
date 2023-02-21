import { Box, Button, Container, Divider, TextField, Typography } from "@mui/material";
import PasswordArea from "../../components/inputs/PasswordInput";

export default function LoginPage() {

    return <Container maxWidth="xl" sx={{ "display": "flex", "flexDirection": "column", "alignItems": "center" }}>
        <div style={{ "display": "flex", "marginTop": "30px" }}>
            <img src="/img/polybunny.png" width={200} />
            <Typography variant="h2" sx={{ "textAlign": "center", mt: 10 }}><span style={{ "color": "purple" }}>Poly</span>Notes</Typography>
        </div>

        <Box width={"70%"} height={"auto"} sx={{ "border": "4px solid black", my: 10, p: 8 }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Typography color="black" variant="h3" sx={{ "textAlign": "center" }} pb={5}>Authentication</Typography>
            <Divider variant="middle" sx={{ "width": "70%", mb: 5 }} />
            <Box display={"flex"} justifyContent="center" width={"100%"} mt={2}>
                <TextField
                    variant="outlined"
                    label="E-Mail Address"
                    sx={{ "width": "300px" }}
                />
            </Box>
            <Box display={"flex"} flexDirection="column" alignItems="center" width={"100%"} mt={3}>

                <PasswordArea sx={{ "width": "300px" }}>Password</PasswordArea>
            </Box>
            <Button variant="contained" size="large" sx={{ mt: 5 }}>Connexion</Button>
        </Box>
    </Container>
}