import BaseBlock from "../../BaseBlock";
import {useEffect, useState} from "react";
import {url} from "../../../../utils/conf";
import {Box, CircularProgress, Typography} from "@mui/material";
import DurationEachDays from "../../../charts/DurationEachDays";
import {TimeTrackRecord} from "./DurationEachDaysBlock";
import DurationEachProjects from "../../../charts/DurationEachProjects";
import Paper from "@mui/material/Paper";

export interface TimeTrackProjectRecord {
    _id: string,
    name: string
    ownerId: string
    totalDuration: number
    membersId?: string[]
}

export default class DurationEachProjectBlock extends BaseBlock {

    data: any = null;

    constructor(generateId: boolean) {
        super();
        if(generateId)
            this.generateId();
    }

    getComponent(): React.ReactNode {
        return <Component />;
    }

    getOverlayLabel(): string {
        return "Chart";
    }

    getType(): string {
        return "duration-each-project-chart";
    }

    getValues(): any {
        return {};
    }

}

function Component() {

    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        fetch(url+"/time-tracker/projects/durations", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(async (response) => {
            if(response.status === 200){
                const result = await response.json();
                let records: TimeTrackProjectRecord[] = result.results;
                if(records){
                    setData([
                        {
                            label: "Durations of Each Projects",
                            data: records
                        }
                    ]);
                }
            }
        })
    }, []);

    if(data === null)
        return <CircularProgress />

    return <Box width={"100%"} height={"500px"} mt={3}>
        <Box width={"100%"} textAlign={"center"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography variant={"h5"}>
                Duration of each Projects
            </Typography>
        </Box>

        <DurationEachProjects data={data} />
    </Box>
}