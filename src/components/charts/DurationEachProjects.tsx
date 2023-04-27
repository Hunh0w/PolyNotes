import {useState} from "react";
import * as React from "react";
import {AxisOptions, Chart} from "react-charts";
import Loader from "../loader/Loader";
import {TimeTrackProjectRecord} from "../blocks/impl/charts/DurationEachProjectBlock";

export default function DurationEachProjects(props: {data: any}) {

    const [data,] = useState<any>(props.data);

    const primaryAxis = React.useMemo<
        AxisOptions<TimeTrackProjectRecord>
    >(
        () => ({
            getValue: (record) => record.name,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<TimeTrackProjectRecord>[]
    >(
        () => [
            {
                getValue: (record) => record.totalDuration,
                elementType: "bar",
                min: 0
            },
        ],
        []
    );

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