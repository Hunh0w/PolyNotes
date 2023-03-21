import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/conf";
import { PolyFile } from "../files/impl/PolyFile";
import { PolyFolder } from "../files/impl/PolyFolder";
import { PolyFileBase } from "../files/PolyFileBase";

export default function FileProvider(props: { id: string, children: ReactNode }) {
    if (!props.id) return <></>

    const token = localStorage.getItem("access_token");
    if (!token) return <></>;

    const [file, setFile] = useState<PolyFileBase | null>(null);

    useEffect(() => {

        fetch(url + "/file/" + props.id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                const jsonFile = await response.json();

                const polyFile: PolyFileBase = jsonFile.isDirectory ?
                    new PolyFile(jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, jsonFile.blocks) :
                    new PolyFolder(jsonFile.name, jsonFile.lastModified, jsonFile.ownerId, jsonFile.listFiles)

                setFile(polyFile);
            }
        })
    }, [props.id, file, token]);

    return props.children
}