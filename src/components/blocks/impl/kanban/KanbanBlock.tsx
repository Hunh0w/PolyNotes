import BaseBlock from "../../BaseBlock";
import KanbanMatrix, {KanbanContainer} from "../../../dnd/kanban/KanbanMatrix";
import {useContext, useState} from "react";
import {Box} from "@mui/material";
import AddColumnModal from "./modals/AddColumnModal";
import AddElementModal from "./modals/AddElementModal";
import * as React from "react";
import {BlocksContext} from "../../../files/PolyFileEditor";


export default class KanbanBlock extends BaseBlock {

    public containers: KanbanContainer[]

    constructor(containers: KanbanContainer[], generateId: boolean) {
        super();
        this.containers = containers;
        if(generateId)
            this.generateId();
    }

    getComponent(): React.ReactNode {
        return <Component block={this} />;
    }

    getOverlayLabel(): string {
        return "Kanban";
    }

    getType(): string {
        return "kanban";
    }

    getValues(): any {
        return {
            containers: this.containers
        }
    }

}


function Component(props: {block: KanbanBlock}){

    const [toolOver, setToolOver] = useState(false);
    const { file } = useContext(BlocksContext);

    const [ matrix, setMatrix ] = useState<KanbanContainer[]>(props.block.containers);

    const setMatrixWrapper = (getMatrix: (prevState: KanbanContainer[]) => KanbanContainer[]) => {
        const newMatrix = getMatrix(matrix);
        props.block.containers = newMatrix;
        setMatrix(newMatrix);
    }

    if(!file) return <></>

    return <Box width={"100%"} display={"flex"} flexDirection={"column"}>
        {file.canEdit() &&
            <Box width={"100%"} height={"50px"} display={"flex"} justifyContent={"start"} onMouseEnter={() => setToolOver(true)} onMouseLeave={() => setToolOver(false)}>
                <AddColumnModal hover={toolOver} setMatrix={setMatrixWrapper} />
                <AddElementModal hover={toolOver} setMatrix={setMatrixWrapper} />
            </Box>
        }

        <KanbanMatrix itemMatrix={matrix} setItemMatrix={setMatrixWrapper} />
    </Box>
}