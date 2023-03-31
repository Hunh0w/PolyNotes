import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, ButtonBase, FormControlLabel, FormGroup, Modal, Switch, TextField} from "@mui/material";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {useContext, useRef} from "react";
import {url} from "../../utils/conf";
import {AlertContext} from "../AlertManager";
import TextBlock from "../blocks/impl/TextBlock";
import {PolyFileBase} from "../files/PolyFileBase";

const createModalStyle = {
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

export default function CreatePageModal(props: {sidebarOpen: boolean, selectedFile: PolyFileBase | null}) {

    const { addAlert } = useContext(AlertContext);

    const [createModal, setCreateModal] = React.useState(false);
    const [isDirectory, setIsDirectory] = React.useState(false);

    const nameRef = useRef(null);

    const onCreate = () => {
        const currentName: any = nameRef.current;

        const defaultBlock = new TextBlock("", "h3", true);
        const parentId = props.selectedFile ? {parentId: props.selectedFile.id} : {};

        const object = {
            ...parentId,
            name: currentName.value,
            isDirectory: isDirectory,
            blocks: [{
                id: defaultBlock.id,
                rowIndex: 0,
                columnIndex: 0,
                kind: defaultBlock.getType(),
                values: {
                    text: "",
                    type: defaultBlock.headerType
                }
            }],
            listFiles: []
        }

        const token = localStorage.getItem("access_token");

        const kind = isDirectory ? "folder" : "file";

        fetch(url + "/files", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(object)
        }).then((response) => {
            setCreateModal(false);
            if (response.status == 201) {
                addAlert({message: "your " + kind + " has been successfully created", severity: "success"})
                setTimeout(() => {
                   window.location.reload();
                }, 1000);
            } else {
                addAlert({message: "the " + kind + " could not be created", severity: "error"})
            }
        });
    }

    return <>
        <Modal
            open={createModal}
            onClose={() => setCreateModal(false)}
            aria-labelledby={"parent-modal-title"}
            aria-describedby={"parent-modal-description"}
        >
            <Box sx={createModalStyle}>
                <Typography id="modal-modal-title" variant="h4" mb={4}>
                    Create a new {isDirectory ? "folder" : "page"}
                </Typography>
                <Box display={"flex"} flexDirection={"column"}>
                    <FormGroup>
                        <FormControlLabel control={<Switch color={"secondary"} onChange={(evt) => setIsDirectory(evt.target.checked)} />} label={"Is a " + (isDirectory ? "Folder" : "Page")} />
                    </FormGroup>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                        <TextField placeholder={"Name..."} sx={{mt: 3, width: "80%"}} inputRef={nameRef} />

                        <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={onCreate}>Create</StyledButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
        <StyledButton onClick={() => setCreateModal(true)}>
            {props.sidebarOpen ? "+ Create" : "+"}
        </StyledButton>
    </>
}