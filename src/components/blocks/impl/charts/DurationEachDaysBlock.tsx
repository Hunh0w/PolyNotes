import BaseBlock from "../../BaseBlock";
import {Box, CircularProgress, Typography} from "@mui/material";
import {url} from "../../../../utils/conf";
import DurationEachDays from "../../../charts/DurationEachDays";
import Loader from "../../../loader/Loader";
import {useEffect, useState} from "react";

export interface TimeTrackRecord {
    date: Date
    duration: number
}

export default class DurationEachDaysBlock extends BaseBlock {

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
        return "duration-each-days-chart";
    }

    getValues(): any {
        return {};
    }

}

function Component() {

    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        fetch(url+"/time-tracker/durations", {
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
                            label: "Durations by Day",
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
                Duration of each Days
            </Typography>
        </Box>
        <DurationEachDays data={data} />
    </Box>
}