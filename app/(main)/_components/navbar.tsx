import NavbarRoutes from "@/components/global/navbar-routes";
import React from "react";

const NavBar = () => {
    return (
        <div className="p-6 border-b h-full shadow-sm backdrop-blur-sm flex items-center">
            {/* mobile sidebar */}
            <NavbarRoutes />

        </div>
    )
}

export default NavBar