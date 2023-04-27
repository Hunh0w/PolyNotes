import BaseBlock from "../../BaseBlock";
import {useEffect, useState} from "react";
import {url} from "../../../../utils/conf";
import {Box, CircularProgress, Typography} from "@mui/material";
import DurationEachDays from "../../../charts/DurationEachDays";
import {TimeTrackRecord} from "./DurationEachDaysBlock";
import DurationDaysByProject from "../../../charts/DurationDaysByProject";

export default class DurationEachDaysProjectBlock extends BaseBlock {

    data: any = null;
    projectName: string;

    constructor(projectName: string, generateId: boolean) {
        super();
        this.projectName = projectName;
        if(generateId)
            this.generateId();
    }

    getComponent(): React.ReactNode {
        return <Component projectName={this.projectName} />;
    }

    getOverlayLabel(): string {
        return "Chart";
    }

    getType(): string {
        return "duration-each-days-project-chart";
    }

    getValues(): any {
        return {
            projectName: this.projectName
        };
    }

}

function Component(props: {projectName: string}) {

    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        fetch(url+"/time-tracker/project/"+props.projectName+"/durations", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        }).then(async (response) => {
            if(response.status === 200){
                const result = await response.json();
                let records: TimeTrackRecord[] = result.results.map((obj: any) => ({
                    duration: obj.duration,
                    date: new Date(obj.date)
                }))
                records = records.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                if(records){
                    setData([
                        {
                            label: "Durations by Day of Project "+props.projectName,
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
                Duration of each Days of Project {props.projectName}
            </Typography>
        </Box>
        <DurationDaysByProject data={data} />
    </Box>
}