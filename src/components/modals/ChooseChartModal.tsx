import {styled} from "@mui/material/styles";
import {ButtonBase, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Modal, Select, Switch, TextField} from "@mui/material";
import {useContext, useRef, useState} from "react";
import {AlertContext} from "../AlertManager";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {BlocksContext} from "../files/PolyFileEditor";
import DurationEachDaysBlock from "../blocks/impl/charts/DurationEachDaysBlock";
import BaseBlock from "../blocks/BaseBlock";
import DurationEachDaysProjectBlock from "../blocks/impl/charts/DurationDaysProjectBlock";
import DurationEachProjectBlock from "../blocks/impl/charts/DurationEachProjectBlock";

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

interface ChartType {
    id: number
    name: string
}

const types = [
    {
        id: 1,
        name: "Duration each Days"
    },
    {
        id: 2,
        name: "Duration each Days of Project"
    },
    {
        id: 3,
        name: "Duration each Projects"
    },
    /*
    {
        id: 4,
        name: "Duration by Tag"
    },
    {
        id: 5,
        name: "Duration by Project and Tag"
    }
     */
]

export default function ChooseChartModal(props: {open: boolean, setOpen: (arg: any) => void}) {

    const {open, setOpen} = props;
    const { createNewBlock } = useContext(BlocksContext);

    const { addAlert } = useContext(AlertContext);

    const [ type, setType ] = useState<number>(1);

    const tagRef1 = useRef(null);

    const tagRef2 = useRef(null);
    const projectRef2 = useRef(null);

    const projectRef1 = useRef(null);

    const onCreate = () => {

        let baseBlock: BaseBlock | null = null;
        if(type === 1) baseBlock = new DurationEachDaysBlock(true);
        else if(type === 2){
            const obj: any = projectRef1.current;
            const projectName: string = obj.value;
            if(!projectName) return;
            baseBlock = new DurationEachDaysProjectBlock(projectName, true);
        }else if(type === 3)
            baseBlock = new DurationEachProjectBlock(true);

        if(baseBlock) {
            createNewBlock(baseBlock, 0);
            setOpen(false);
        }
    }

    return <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby={"parent-modal-title"}
            aria-describedby={"parent-modal-description"}
        >
            <Box sx={createModalStyle}>
                <Typography id="modal-modal-title" variant="h4" mb={4}>
                    Create a Chart
                </Typography>
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={type}
                            label="Type"
                            onChange={(evt) => setType(Number(evt.target.value))}
                        >
                            {types.map((type, index) => {
                              return <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    {type === 4 &&
                        <TextField placeholder={"Tag..."} sx={{mt: 3, width: "80%"}} inputRef={tagRef1} />
                    }
                    {type === 5 &&
                        <>
                            <TextField placeholder={"Project Name..."} sx={{mt: 3, width: "80%"}} inputRef={projectRef2} />
                            <TextField placeholder={"Tag..."} sx={{mt: 3, width: "80%"}} inputRef={tagRef2} />
                        </>
                    }
                    {type === 2 &&
                        <TextField placeholder={"Project Name..."} sx={{mt: 3, width: "80%"}} inputRef={projectRef1} />
                    }
                    <StyledButton onClick={onCreate} sx={{mt: 5, height: "50px", width: "40%"}}>+ Create</StyledButton>
                </Box>
            </Box>
        </Modal>
}