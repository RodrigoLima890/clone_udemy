"use server"

import { signOut } from "@/auth"


export const LogOut = async() =>{
    
    // some stuff
    await signOut({
        redirect: true,
        redirectTo: "/sign-in"
    })
}