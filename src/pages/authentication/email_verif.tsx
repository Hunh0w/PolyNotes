import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect} from "react";
import {url} from "../../utils/conf";
import {AlertContext} from "../../components/AlertManager";
import Loader from "../../components/loader/Loader";

export default function EmailVerifPage(){

    const { token } = useParams();
    const navigate = useNavigate();
    const { addAlert } = useContext(AlertContext);

    const verifyEmail = () => {
        fetch(url+"/register/verify/"+token, {
            method: "GET"
        }).then((response) => {
            let toNavigate = "/login";
            if(response.status === 201){
                addAlert({severity: "success", message: "Your account is successfully created !"})
            }else if(response.status === 401){
                addAlert({severity: "warning", message: "Your account already exists"});
            }else if(response.status === 404) {
                addAlert({severity: "error", message: "This verification doesn't exists"})
                toNavigate = "/";
            }
            setTimeout(() => {
                navigate(toNavigate)
            }, 1500);
        })
    }

    useEffect(() => {
        if(!token) {
            navigate("/")
            return;
        }
        verifyEmail();
    }, []);

    return <Loader />
}