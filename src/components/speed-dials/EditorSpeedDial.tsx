import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import {AddBox, PlusOne, ViewColumn, ViewWeek} from '@mui/icons-material';
import React, { useContext } from 'react';
import { BlocksContext } from '../files/PolyFileEditor';
import {DropdownBlocks, toJson} from '../blocks/BlockFactory';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/conf';
import { AlertContext } from '../AlertManager';
import {Divider} from "@mui/material";

export default function EditorSpeedDial(props: { pageId: string, fileName: string }) {

    const { blocks } = useContext(BlocksContext);
    const navigate = useNavigate();
    const { addAlert } = useContext(AlertContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const onSave = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login")
            return;
        }

        const jsonBlocks = toJson(blocks);
        const jsonPolyFile = {
            id: props.pageId,
            name: props.fileName,
            blocks: jsonBlocks
        }

        fetch(url + "/files", {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(jsonPolyFile)
        }).then((response) => {
            if (response.status === 200) {
                addAlert({ message: "File successfully saved !", severity: "success" })
            }
        })
    }

    const onAddBlock = (event: any) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial openIcon example"
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                sx={{ bottom: 32, right: 32, position: "fixed" }}
                FabProps={{
                    style: {
                        backgroundColor: "#9452DE"
                    }
                }}
            >
                <SpeedDialAction
                    icon={<SaveIcon />}
                    tooltipTitle={"Save"}
                    onClick={onSave}
                />

                <SpeedDialAction
                    icon={<FileCopyIcon />}
                    tooltipTitle={"Clone"}
                />

                <SpeedDialAction
                    icon={<ShareIcon />}
                    tooltipTitle={"Share"}
                />

                <SpeedDialAction
                    icon={<ViewWeek />}
                    tooltipTitle={"Edit Columns"}
                />
                <SpeedDialAction
                    icon={<AddBox />}
                    tooltipTitle={"Add Block"}
                    onClick={onAddBlock}
                />
            </SpeedDial >
            <DropdownBlocks handleClose={handleClose} anchorEl={anchorEl} />
        </>
    );
}