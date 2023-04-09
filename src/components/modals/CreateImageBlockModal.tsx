import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ButtonBase, FormControlLabel, FormGroup, Modal, Slider, Switch, TextField} from "@mui/material";
import * as React from "react";
import {useContext, useRef, useState} from "react";
import {styled} from "@mui/material/styles";
import {BlocksContext} from "../files/PolyFileEditor";
import ImageBlock from "../blocks/impl/ImageBlock";

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

export default function CreateImageBlockModal(props: {open: boolean, setOpen: (arg: any) => void}){

    const { createNewBlock } = useContext(BlocksContext);

    const [sliderValue, setSliderValue] = useState<number | number[] | undefined>(undefined);

    const urlRef = useRef(null);

    const onCreate = () => {
        const urlObj: any = urlRef.current;
        if(!urlObj) return;
        const url = urlObj.value;
        if(!url || !sliderValue) return;

        createNewBlock(new ImageBlock(url, Number(sliderValue), true), 0);
        props.setOpen(false);
    }

    return <Modal
        open={props.open}
        onClose={() => props.setOpen(false)}
        aria-labelledby={"parent-modal-title"}
        aria-describedby={"parent-modal-description"}
    >
        <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h4" mb={4}>
                Create a new Image Block
            </Typography>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <TextField placeholder={"URL..."} sx={{mt: 3, width: "80%"}} inputRef={urlRef} />
                <Typography variant={"h5"} mt={3}>
                    Image Size
                </Typography>
                <Slider color={"secondary"} defaultValue={30} aria-label="Image Size" onChange={(evt, value) => setSliderValue(value)} />

                <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={onCreate}>Create</StyledButton>
            </Box>
        </Box>
    </Modal>
}