import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

type Props = { 
    id:string
    title: string
    imageUrl: string
    chaptersLength: number
    price: number
    progress?: number | null
    category: string | undefined
}

const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}:Props) => {
    return (
    <Link
        href={"/courses/"+id}
    >
        <Card className="borde-none shadow-none">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
        <CardContent>
            <div className="border w-fit h-fit mb-6">
            <div className="w-full aspect-video rounded-md overflow-hidden">
                <Image
                    alt={title}
                    src={imageUrl}
                    width={350}
                    height={200}
                    className="object-cover -w-full h-full"
                    />
            </div>
            </div>
            <Badge>{category}</Badge>
            <div className="my-3 flex itens-center gax-x-2 text-sm md:text-xs">
                <div className="flex items-center gap-x-1 text-muted-foreground">
                    <span>
                        {chaptersLength} {chaptersLength > 1 ? "Chapters" : "Chapter"}
                    </span>
                </div>
            </div>
            {
                progress ? (
                    <div>
                        {/* progress */}
                    </div>
                ): (
                    <div className="text-muted-foreground font-medium">
                        {formatPrice(price)}
                    </div>
                )
            }
        </CardContent>
        </Card>
    </Link>
    )
}

export default CourseCard