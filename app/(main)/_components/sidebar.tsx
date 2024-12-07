import Logo from "@/components/global/logo";
import React from "react";
import SidebarRoute from "./sidebar-routes";

const Sidebar = () =>{
    return (
        <div className="h-full flex flex-col border-r overflow-y-auto shadow-sm">
            <div className="p-4 flex items-center space-x-3">
                <Logo/>
                <h1 className="font-bold text-2x1">Udemy</h1>
            </div>
            <div className="flex flex-col w-full">
                <SidebarRoute />
            </div>
        </div>
    )
}

export default Sidebar