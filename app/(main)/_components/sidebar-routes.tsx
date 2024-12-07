"use client"
import { BarChart, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import SidebarItem from "./sidebar-item";

const homeRoutes = [
    {
        icon: Layout,
        label: 'Home',
        href: '/'
    },
    {
        icon: BarChart,
        label: 'Analytics',
        href: '/analytics'
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: 'Courses',
        href: '/teacher/courses'
    },
    {
        icon: BarChart,
        label: 'Analytics',
        href: '/teacher/analytics'
    }
]

const SidebarRoute = () =>{
    const pathname = usePathname()
    const isTeacher = pathname.includes('/teacher')
    const routes = isTeacher ? teacherRoutes : homeRoutes

    return (
        <div className="h-full flex flex-col">
            {
                routes.map((route,index) => (
                    <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    />
                ))
            }
          
        </div>
    )
}

export default SidebarRoute