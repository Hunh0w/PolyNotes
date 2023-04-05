import {useContext, useRef, useState} from "react";
import {
    DataGrid, GridCellEditStopParams, GridCellParams,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector, GridToolbarExport,
    GridToolbarFilterButton
} from "@mui/x-data-grid";
import {Box, Button, ButtonBase, Modal, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {generateId} from "../../../../utils/string-utils";
import {KeyboardCode} from "@dnd-kit/core";
import {DatabaseContext} from "./DatabaseBlock";
import {BlocksContext} from "../../../files/PolyFileEditor";

const initialState = {
    columns: {
        columnVisibilityModel: {id: false}
    }
};

export interface Table {
    name: string
    data: any
}

function withInitialState(data: any){
    return {...data, initialState: initialState};
}

function formatData(data: any){

    const columns = data.columns;
    const rows = data.rows;

    const columnsArray = [];
    const rowsArray = [];
    for(const key in columns){
        const column = columns[key];
        columnsArray.push(column);
    }
    for(const key in rows){
        const row = rows[key];
        rowsArray.push(row);
    }
    return {
        columns: columnsArray,
        rows: rowsArray
    }
}

export function TableComponent(props: {table: Table}) {

    const { tables, setTables } = useContext(DatabaseContext);
    const { file } = useContext(BlocksContext);

    let data = props.table.data;
    if(!data) return <></>
    data = withInitialState(data);

    const saveComponent = (dataObj: any) => {
        setTables(tables.map((table: Table) => {
                if(table.name.toLowerCase() === props.table.name.toLowerCase())
                    return {name: props.table.name, data: dataObj}
                return table;
            }));
    }

    const onCellEdit = (params: GridCellParams, evt: any) => {

        const row: any = params.row;
        row[params.field] = evt.target.value;

        const dataObject: any = {
            columns: data.columns,
            rows: data.rows.map((rowObj: any) => {
                if(rowObj.id === row.id)
                    return {...row};
                return rowObj;
            })
        };

        saveComponent(dataObject);
    }

    if(!file) return <></>

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                {...data}
                onCellEditStop={onCellEdit}
                isCellEditable={() => file.canEdit()}
                slotProps={{
                    toolbar: {
                        setData: saveComponent,
                        data: data
                    }
                }}
                slots={{
                    toolbar: file.canEdit() ? CustomToolbar : null,
                }}
            />
        </div>
    );
}

function CustomToolbar(props: {data: any, setData: (data: any) => void}) {

    const [addFieldOpen, setAddFieldOpen] = useState<boolean>(false);

    const { data, setData } = props;

    const addField = (field: any) => {
        setData({
                rows: [...data.rows],
                columns: [
                    ...data.columns,
                    field
                ]
        })
    }

    const addRow = (row: any) => {
        setData({
            columns: [...data.columns],
            rows: [
                ...data.rows,
                row
            ]
        });
    }

    const addFieldHandle = () => {
        setAddFieldOpen(true);
    }

    const addRowHandle = () => {
        let row: any = {id: generateId(16)};
        for(let i = 0; i < data.columns.length; i++){
            const column = data.columns[i];
            if(column.field === "id") continue;
            row[column.field] = "";
        }

        addRow(row);
    }

    return (<>
        <GridToolbarContainer>
            <GridToolbarColumnsButton color={"secondary"} />
            <GridToolbarFilterButton color={"secondary"} />
            <GridToolbarDensitySelector color={"secondary"} />
            <GridToolbarExport color={"secondary"} />
            <Box>
                <Button color={"secondary"} onClick={addFieldHandle}>
                    <Add />
                    Add Field
                </Button>
                <Button color={"secondary"} onClick={addRowHandle}>
                    <Add />
                    Add Row
                </Button>
            </Box>
        </GridToolbarContainer>
        <AddFieldModal open={addFieldOpen} setOpen={setAddFieldOpen} addField={addField} />
    </>);
}


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

function AddFieldModal(props: {open: boolean, setOpen: (open: boolean) => void, addField: (obj: any) => void}) {

    const { open, setOpen, addField } = props;

    const nameRef = useRef(null);

    const addNewField = () => {
        setOpen(false);
        const nameObj: any = nameRef.current;
        if(!nameObj) return;
        const name = nameObj.value;
        if(!name) return;

        const regex: RegExp = /[^a-zA-Z0-9_]/gm
        const fieldName = name.toLowerCase().replaceAll(regex, "_");

        console.log(fieldName)
        addField({
            field: fieldName,
            editable: true,
            headerName: name,
            width: 130
        });
    }

    return <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby={"parent-modal-title"}
        aria-describedby={"parent-modal-description"}
    >
        <Box sx={createModalStyle}>
            <Typography id="modal-modal-title" variant="h4" mb={4}>
                + Add a new Field
            </Typography>
            <Box display={"flex"} flexDirection={"column"}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
                    <TextField placeholder={"Field Name..."} sx={{mt: 3, width: "80%"}} inputRef={nameRef} />

                    <StyledButton sx={{mt: 3, width: "60%", height: "50px"}} onClick={addNewField}>Add Field</StyledButton>
                </Box>
            </Box>
        </Box>
    </Modal>
}