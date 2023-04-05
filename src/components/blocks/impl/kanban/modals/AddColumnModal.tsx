import {styled} from "@mui/material/styles";
import {Box, Button, ButtonBase, Modal, TextField} from "@mui/material";
import * as React from "react";
import {useRef} from "react";
import {KanbanContainer} from "../../../../dnd/kanban/KanbanMatrix";
import Typography from "@mui/material/Typography";


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

export default function AddColumnModal(props: {hover: boolean, setMatrix: (arg: any) => void}){

    const [modal, setModal] = React.useState(false);

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
        props.setMatrix((prevState: KanbanContainer[]) => [...prevState, container]);
    }

    return <>
        <Modal
            open={modal}
            onClose={() => setModal(false)}
            aria-labelledby={"parent-modal-title"}
            aria-describedby={"parent-modal-description"}
        >
            <Box sx={createModalStyle}>
                <Typography id="modal-modal-title" variant="h4" mb={4}>
                    Kanban | Add a Column
                </Typography>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <TextField placeholder={"Column name..."} sx={{mt: 3, width: "80%"}} inputRef={nameRef} />

                    <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={onCreate}>Add</StyledButton>
                </Box>
            </Box>
        </Modal>
        <Button color={"secondary"} sx={{width: "20%", height: "50px"}} onClick={() => setModal(true)}>{props.hover ? "Add Column" : "..."}</Button>
    </>
}