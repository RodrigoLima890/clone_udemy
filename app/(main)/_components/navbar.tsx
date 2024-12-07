import NavbarRoutes from "@/components/global/navbar-routes";
import React from "react";
import MobileSideBar from "./mobile-sidebar";

const NavBar = () => {
    return (
        <div className="p-6 border-b h-full shadow-sm backdrop-blur-sm flex items-center">
            <MobileSideBar/>
            <NavbarRoutes />
        </div>
    )
}

export default NavBar