import TopBar from "../../components/header/TopBar";
import SideBar from "../../components/header/SideBar";

import { Outlet } from "react-router-dom";
export default function Dashboard () {
    return (
        <div>
            <TopBar/>
            <div className="content-flex">
                <SideBar/>
                <div style={{width:"80%"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}