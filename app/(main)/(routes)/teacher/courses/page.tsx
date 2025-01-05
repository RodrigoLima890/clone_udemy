
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCourses } from "@/data";

export const dynamic = "force-dynamic";

const page = async() =>{
    const courses = await getCourses()
    const data = courses.map(course => {
        return {
            ...course,
            chapter: course.chapters.length
        }
    })
    return(
       
        <DataTable 
            columns={columns}
            data={data}
        />
    )
}

export default page