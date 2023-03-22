import { useParams } from "react-router-dom"
import PolyFileLoader from "../../components/files/PolyFileLoader";
import Sidebar from "../../components/Sidebar";


export default function PolyPage(props: {}) {

    const { pageId } = useParams();
    if (!pageId)
        return <></>

    return <Sidebar>
        <PolyFileLoader id={pageId} />
    </Sidebar>
}