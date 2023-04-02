import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function Lab(props: {}){
    return <DatabaseComponent />
}

function DatabaseComponent(props: any) {
    return <ToolbarGrid />
}



export function ToolbarGrid() {
    const data: any = {
        columns: [
            {
                field: "id",
                editable: true,
                headerName: "ID",
                width: 180
            },
            {
                field: "name",
                editable: true,
                headerName: "Name",
                width: 280
            }
        ],
        initialState: {
            columns: {
                columnVisibilityModel: {id: false}
            }
        },
        rows: [
            {
                id: "29774927642Y4",
                name: "HELLO"
            },
            {
                id: "29774D927642Y4",
                name: "HELLO"
            },
            {
                id: "29774927642EY4",
                name: "HELLO"
            }
        ]
    }

    console.log(data);

    return (
        <div style={{ height: 400, width: '70%', margin: 10 }}>
            <DataGrid
                {...data}
                slots={{
                    toolbar: GridToolbar,
                }}
            />
        </div>
    );
}