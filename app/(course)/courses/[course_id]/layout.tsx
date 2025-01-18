// import { getCourseForUser, getProgress } from "@/data";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
    children: React.ReactNode
    params: {
        courseId: string
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Layout = async ({ children, params }: Props) => {
    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }

    // const course = await getCourseForUser(params.courseId);
    // const progress = await getProgress(params.courseId);
    
    return (
        <div className="w-full">
            <div className="h-[80px] md:pl-80 w-full z-50 fixed inset-y-0 backdrop-blur-md">

            </div>
            <div>

            </div>
            <main className="md:pl-80 h-full pt-[80px]">
                {children}
            </main>
        </div>
    );
}

export default Layout;