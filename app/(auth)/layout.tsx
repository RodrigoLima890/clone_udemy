import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link"; // Usado para roteamento no Next.js
import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <div className="w-full h-full flex flex-col p-4">
            <Link href={"/"}>
                <Button
                    variant={"outline"}
                    className="rounded-full flex items-center"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Home
                </Button>
            </Link>
            {children}
        </div>
    );
};

export default Layout;
