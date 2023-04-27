import {AxisOptions, Chart} from "react-charts";
import * as React from "react";
import {useEffect, useState} from "react";
import {url} from "../../utils/conf";
import {TimeTrackRecord} from "../blocks/impl/charts/DurationEachDaysBlock";
import Loader from "../loader/Loader";




export default function DurationEachDays(props: {data: any}) {

    const [data,] = useState<any>(props.data);

    const primaryAxis = React.useMemo((): AxisOptions<TimeTrackRecord> => ({
            getValue: record => record.date,
            scaleType: "time"
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