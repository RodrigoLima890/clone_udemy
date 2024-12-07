"use client"
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "./logo";
import SearchInput from "./search-input";
import Link from "next/link";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import { ModeToggle } from "./mode-togge";
import UserButton from "./user-button";

const NavBarRoutes = () =>{
    
    const authUser = useCurrentUser()
    const pathname = usePathname()

    const isHomePage = pathname === '/'
    const isTeacherPage = pathname.startsWith('/teacher')
    const isPlayerPage = pathname.startsWith('/courses')

    return (
        <>
            {
                !isPlayerPage && (
                    <div className="hidden md:flex p-4 items-center space-x-3">
                        <Logo />
                        <h1 className="font-bold text-2x1">Udemy</h1>
                    </div>
                )
            }
            {
                isHomePage && (
                    <div className="hidden md:block">
                        <SearchInput />
                    </div>
                )
            }
            {
                isTeacherPage || isPlayerPage && (
                    <Link href='/'>
                        <Button>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Sair
                        </Button>
                    </Link>
                )
            }
            <div className="flex gap-x-2 ml-auto">
                {
                    isPlayerPage && (
                        <Link href={"/"}>
                            <Button size={"sm"} variant={"ghost"}>Home</Button>
                        </Link>
                    )
                }
                {
                    authUser && !isPlayerPage && (
                        <Link href={"/teacher/courses"}>
                            <Button size={"sm"} variant={"ghost"}>
                                {isTeacherPage ? "Courses":"Teaching"}
                            </Button>
                        </Link>
                    )
                }
                {
                    authUser && isTeacherPage && !isPlayerPage && (
                        <Link 
                        href={"/teacher/analytics"}
                        className="hidden sm:block"
                        >
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                            >Teacher Analytics</Button>
                        </Link>
                    )
                }
                {
                    authUser && !isTeacherPage && !isPlayerPage && (
                        <Link 
                        href={"/analytics"}
                        className="hidden sm:block"
                        >
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                            >Analytics</Button>
                        </Link>
                    )
                }
                <UserButton />
                <ModeToggle />
            </div>
        </>
    )
}

export default NavBarRoutes