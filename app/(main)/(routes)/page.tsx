import { currentUser } from "@/lib/auth";

import React from "react";

const page = async() =>{
    const user = await currentUser()
    return(
        <div>
            {user?.name}
        </div>
    )
}

export default page