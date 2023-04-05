import BaseBlock from "../../BaseBlock";
import {Table, TableComponent} from "./TableComponent";
import * as React from "react";
import {useState} from "react";
import {Box, Tab, Tabs} from "@mui/material";

interface DatabaseContextPrototype {
    tables: Table[]
    setTables: (arg: any) => void
}
export const DatabaseContext = React.createContext<DatabaseContextPrototype>({
    tables: [],
    setTables: (arg: any) => null
});

export default class DatabaseBlock extends BaseBlock {

    public name: string
    public tables: Table[]

    constructor(name: string, tables: Table[], generateId: boolean) {
        super();
        this.name = name;
        this.tables = tables;
        if (generateId)
            this.generateId();
    }

    getOverlayLabel(): string {
        return "Database";
    }

    getType(): string {
        return "database";
    }

    getValues(): any {
        return {
            name: this.name,
            tables: this.tables
        }
    }

    getComponent(): React.ReactNode {
        return <DatabaseComponent block={this} />;
    }

}



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

export function DatabaseComponent(props: {block: DatabaseBlock}){
    const [ value, setValue ] = React.useState(0);
    const [ tables, setTables ] = useState<Table[]>(props.block.tables);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const setTableWrapper = (tables: Table[]) => {
        props.block.tables = tables;
        setTables(tables);
    }

    const DatabaseContextValue: DatabaseContextPrototype = {
        tables: tables,
        setTables: setTableWrapper
    }

    return (
        <Box sx={{ width: '100%', border: "1px solid rgba(0,0,0,0.1)" }}>
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


/*
[{
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
        }]
 */