import { useParams } from "react-router-dom"
import Sidebar from "../../components/Sidebar";
import PolyFileLoader from "../../components/files/PolyFileLoader";


export default function PolyPage(props: {}) {

    const { pageId } = useParams();

    return <Sidebar>
        <PolyFileLoader id={pageId} />
    </Sidebar>
}