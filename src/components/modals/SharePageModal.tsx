import {styled} from "@mui/material/styles";
import {ButtonBase, FormControlLabel, FormGroup, Modal, Switch, TextField} from "@mui/material";
import {PolyFileBase} from "../files/PolyFileBase";
import {useContext, useRef, useState} from "react";
import {AlertContext} from "../AlertManager";
import * as React from "react";
import {url} from "../../utils/conf";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {PolyFile} from "../files/impl/PolyFile";
import ShareIcon from "@mui/icons-material/Share";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledButton = styled(ButtonBase)(({ theme }) => ({
    width: '80%',
    height: '70%',
    borderRadius: "5px",
    fontSize: "17pt",
    color: "white",
    backgroundColor: "#A460DD",
    border: "2px solid black"
}));

export default function SharePageModal(props: {pageId: string, fileName: string, modal: boolean, setModal: (arg: any) => void}) {

    const { addAlert } = useContext(AlertContext);
    const { pageId, fileName, modal, setModal } = props;

    const [ isEditor, setIsEditor ] = useState(false);

    const emailRef = useRef();

    const onCreate = () => {
        const emailObj: any = emailRef.current;
        if(!emailObj) return;
        const email = emailObj.value;
        if(!email) return;

        const type = isEditor ? "editor" : "viewer";

        fetch(url+"/file/"+pageId+"/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem("access_token")
            },
            body: JSON.stringify({
              email: email,
              type: type
            })
        }).then(async (response) => {
            if(response.status === 200) {
                addAlert({message: `${email} successfully set as ${type} to file ${fileName}`, severity: "success"})
            }else if(response.status === 403){
                addAlert({message: "You don't have permission to change members of this Page", severity: "warning"})
            }else if(response.status === 404){
                const resultObj = await response.json();
                const message = resultObj.message;
                if(message && message.toLowerCase().includes("user not found")){
                    addAlert({message: `User ${email} not found`, severity: "warning"});
                }else {
                    addAlert({message: `File ${fileName} not found`, severity: "warning"});
                }
            }
        })
    }

    return <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby={"parent-modal-title"}
            aria-describedby={"parent-modal-description"}
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h4" mb={4}>
                    Share the file '{fileName}'
                </Typography>
                <Box display={"flex"} flexDirection={"column"}>
                    <FormGroup>
                        <FormControlLabel control={<Switch color={"secondary"} onChange={(evt) => setIsEditor(evt.target.checked)} />} label={"Is " + (isEditor ? "Editor" : "Viewer")} />
                    </FormGroup>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                        <TextField placeholder={"Email..."} sx={{mt: 3, width: "80%"}} inputRef={emailRef} />

                        <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={onCreate}>Share</StyledButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
}