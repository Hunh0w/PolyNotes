import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/conf";
import Loader from "../loader/Loader";

export default function AuthChecker(props: { children: any, loading: boolean }) {

    const [checked, setChecked] = useState<boolean>(false);
    const navigate = useNavigate();

    const check = () => {
        const token = localStorage.getItem("access_token");
        if (!token) navigate("/login")

        fetch(url + "/user_check", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        }).then(async (response) => {
            if (response.status === 200) {
                setChecked(true)
            } else {
                navigate("/login")
            }
        });
    }

    useEffect(() => {
        setTimeout(check, 2000)
    }, []);

    if (!checked || props.loading) return <Loader />

    return props.children
}