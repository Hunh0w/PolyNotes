import * as React from 'react';
import {
    Box,
    Tab, Tabs,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Table, TableComponent} from "../../components/blocks/impl/database/TableComponent";
import {useState} from "react";
import {generateId} from "../../utils/string-utils";

export default function Lab(props: {}){
    return <DatabaseComponent />
}


interface DatabaseContextPrototype {
    tables: Table[]
    setTables: (arg: any) => void
}
export const DatabaseContext = React.createContext<DatabaseContextPrototype>({
    tables: [],
    setTables: (arg: any) => null
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    table: Table
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, table, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <TableComponent table={table} />
            )}
        </div>
    );
}

export function DatabaseComponent(){
    const [value, setValue] = React.useState(0);

    const [ tables, setTables ] = useState<Table[]>([{
        name: "users",
        data: {
            columns: [
                {
                    field: "id",
                    editable: true,
                    headerName: "ID",
                    width: 120
                },
                {
                    field: "name",
                    editable: true,
                    headerName: "Name",
                    width: 120
                }
            ],
            rows: [
                {
                    id: generateId(16),
                    name: "Exampleee"
                }
            ]
        }
    },
    {
        name: "livres",
        data: {
            columns: [
                {
                    field: "id",
                    editable: true,
                    headerName: "ID",
                    width: 120
                },
                {
                    field: "name",
                    editable: true,
                    headerName: "Name",
                    width: 120
                }
            ],
            rows: [
                {
                    id: generateId(16),
                    name: "LivreExample"
                }
            ]
        }
    }]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const DatabaseContextValue: DatabaseContextPrototype = {
        tables: tables,
        setTables: setTables
    }

    return (
        <Box sx={{ m: 10, width: '70%', border: "1px solid rgba(0,0,0,0.1)" }}>
            <DatabaseContext.Provider value={DatabaseContextValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} textColor={"secondary"} indicatorColor={"secondary"}>
                        {tables.map((table, index) => {
                          return <Tab label={table.name} key={index} />
                        })}
                    </Tabs>
                </Box>
                {tables.map((table, index) => {
                    return <TabPanel key={index} value={value} index={index} table={table}>
                        {table.name}
                    </TabPanel>
                })}
            </DatabaseContext.Provider>
        </Box>
    );
}

