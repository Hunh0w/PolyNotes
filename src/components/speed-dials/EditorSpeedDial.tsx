import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import { ViewColumn, ViewWeek } from '@mui/icons-material';
import { useContext } from 'react';
import { BlocksContext } from '../files/PolyFileEditor';
import { toJson } from '../blocks/BlockFactory';
import { useNavigate } from 'react-router-dom';
import { url } from '../../utils/conf';
import { AlertContext } from '../AlertManager';

export default function EditorSpeedDial(props: { pageId: string }) {

    const { blocks } = useContext(BlocksContext);
    const navigate = useNavigate();
    const { addAlert } = useContext(AlertContext);

    const onSave = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login")
            return;
        }

        const jsonBlocks = toJson(blocks);
        const jsonPolyFile = {
            id: props.pageId,
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

    return (
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

        </SpeedDial >
    );
}