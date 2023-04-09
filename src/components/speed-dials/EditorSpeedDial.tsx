import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import {AddBox, Delete, PlusOne, ViewColumn, ViewWeek} from '@mui/icons-material';
import React, {useContext, useState} from 'react';
import { BlocksContext } from '../files/PolyFileEditor';
import {DropdownBlocks, toJson} from '../blocks/BlockFactory';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/conf';
import {AlertContext, PolyAlert} from '../AlertManager';
import {Divider} from "@mui/material";
import SharePageModal from "../modals/SharePageModal";
import {PolyFile} from "../files/impl/PolyFile";
import {deleteFile} from "../../services/FilesService";

export default function EditorSpeedDial(props: {}) {

    const { file, blocks } = useContext(BlocksContext);
    const navigate = useNavigate();
    const { addAlert } = useContext(AlertContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [shareModal, setShareModal] = useState(false);

    if(!file) return <></>

    const onSave = () => {
        if(!file.canEdit()) return;
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login")
            return;
        }

        const jsonBlocks = toJson(blocks);
        const jsonPolyFile = {
            id: file.id,
            name: file.name,
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
            }else if(response.status === 401){
                navigate("/login")
            }else if(response.status === 403){
                addAlert({message: "You don't have permission to write this Page", severity: "warning"})
            }
        })
    }

    const onAddBlock = (event: any) => {
        if(!file.canEdit()) return;
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onDelete = () => {
        deleteFile(file).then((result) => {
            if(result){
                addAlert(result as PolyAlert);
                if(result.severity === "success"){
                    setTimeout(() => {
                        navigate("/home")
                    }, 1000);
                }
            }
        })
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
                    icon={<AddBox />}
                    tooltipTitle={"Add Block"}
                    onClick={onAddBlock}
                />

                <SpeedDialAction
                    icon={<FileCopyIcon />}
                    tooltipTitle={"Clone"}
                />

                <SpeedDialAction
                    icon={<Delete />}
                    tooltipTitle={"Delete"}
                    onClick={onDelete}
                />

                <SpeedDialAction
                    icon={<ShareIcon />}
                    tooltipTitle={"Share"}
                    onClick={() => {
                        if(!file.canEdit()) return;
                        setShareModal(true)
                    }}
                />
            </SpeedDial >
            <DropdownBlocks handleClose={handleClose} anchorEl={anchorEl} />
            <SharePageModal pageId={file.id} fileName={file.name} modal={shareModal} setModal={setShareModal} />
        </>
    );
}