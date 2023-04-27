import {useState} from "react";
import * as React from "react";
import {AxisOptions, Chart} from "react-charts";
import {TimeTrackRecord} from "../blocks/impl/charts/DurationEachDaysBlock";
import Loader from "../loader/Loader";

export default function DurationDaysByProject(props: {data: any}) {

    const [data,] = useState<any>(props.data);

    const primaryAxis = React.useMemo((): AxisOptions<TimeTrackRecord> => ({
            getValue: record => record.date,
            scaleType: "time",

        }),[]
    )

    const secondaryAxes = React.useMemo((): AxisOptions<TimeTrackRecord>[] => [
            {
                getValue: record => record.duration,
                min: 0
            },
        ],[]
    )

    if(data.length === 0)
        return <Loader />

    return <Chart
        options={{
            data,
            primaryAxis,
            secondaryAxes,
        }}
    />
}