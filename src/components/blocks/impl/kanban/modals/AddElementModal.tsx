import * as React from "react";
import {useContext, useRef} from "react";
import {AlertContext} from "../../../../AlertManager";
import {KanbanContainer} from "../../../../dnd/kanban/KanbanMatrix";
import KanbanBlock from "../KanbanContent";
import {Box, Button, ButtonBase, Modal, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

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

export default function AddElementModal(props: {hover: boolean, setMatrix: (arg: any) => void}){

    const [modal, setModal] = React.useState(false);

    const { addAlert } = useContext(AlertContext);

    const nameRef = useRef(null);

    const onCreate = () => {
        const nameObj: any = nameRef.current;
        if(!nameObj) return;
        const name = nameObj.value;
        if(!name) return;

        const container: KanbanContainer = {
            itemList: [],
            name: name
        }

        setModal(false);

        props.setMatrix((prevState: KanbanContainer[]) => {
            if(prevState.length === 0){
                addAlert({message: "You must have at least 1 column", severity: "warning"})
                return prevState;
            }

            return prevState.map((container: KanbanContainer, index) => {
                if(index === 0){
                    container.itemList = [...container.itemList, new KanbanBlock(name)];
                }
                return container;
            })
        })
    }

    return <>
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby={"parent-modal-title"}
            aria-describedby={"parent-modal-description"}
        >
            <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h4" mb={4}>
                    Kanban | Add an Element
                </Typography>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <TextField placeholder={"Element content..."} sx={{mt: 3, width: "80%"}} inputRef={nameRef} />

                    <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={onCreate}>Add</StyledButton>
                </Box>
            </Box>
        </Modal>
        <Button color={"secondary"} sx={{width: "20%", height: "50px"}} onClick={() => setModal(true)}>{props.hover ? "Add Element" : "..."}</Button>
    </>
}