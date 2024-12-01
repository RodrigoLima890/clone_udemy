import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () =>{
    return(
        <Link href={"/"}>
            <Image src={"/logo.svg"} alt="Logo" className="object-cover"
                width={40}
                height={40}
            />
        </Link>
    )
}

export default Logo