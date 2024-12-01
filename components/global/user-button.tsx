"use client"
import React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "@/lib/logout";
import { Button } from "../ui/button";



const UserButton = () =>{
    const authUser = useCurrentUser()
    const router = useRouter()

    return(
        <div>
            {
                authUser ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                      <Avatar>
                          <AvatarImage src={authUser.image || undefined} />
                          <AvatarFallback>{authUser.name?.toUpperCase().slice(0,2)}</AvatarFallback>
                    </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[100px]">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => await LogOut()}>Sign Out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                ): (
                    <Button
                        onClick={()=> router.push('sign-in')}
                    >Sign in
                    </Button>
                )
            }
        </div>
    )
}

export default UserButton