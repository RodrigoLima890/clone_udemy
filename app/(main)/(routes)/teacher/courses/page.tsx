import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async() =>{
    return(
        <div>
            <Link href={"/teacher/create"}>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Course
            </Button>
            </Link>
        </div>
    )
}

export default page