"use client"
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
    icon: LucideIcon,
    label: string,
    href: string
}
const SidebarItem = ({icon:Icon, label, href}:Props) =>{
    const route = useRouter()
    const pathname = usePathname()

    const isActive = (pathname === "/") && (href === "/") ||
    pathname === href || pathname.startsWith(`${href}/`)

    const onClick = () => {
        route.push(href)
    }

    return (
        <button
        onClick={onClick} 
        className={cn(
        "flex w-full items-center gap-x-2 text-muted-foreground text-sm pl-6 transition-all hover:bg muted-40 font-[500]",
        isActive && "text-muted-foreground bg-muted hover:bg-muted"
    )}>
        <div className="flex items-center gap-x-2 py-4">
            <Icon className={cn(
                "text-muted-foreground",
                isActive && "text-muted-foreground"
            )} />
            {label}
        </div>
        <div className={cn(
            "ml-auto opacity-0 border-2 border-muted-foreground h-full transiction-all",
            isActive && "opacity-100"
        )} />            
        </button>
    )
}

export default SidebarItem