"use client";

import { cn, formatPrice } from "@/lib/utils";
import { Course } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type courseList = Course & {
  chapter: number;
};

export const columns: ColumnDef<courseList>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const course = row.original;
      return <div>{formatPrice(course.price!)}</div>;
    },
  },
  {
    accessorKey: "isPublisched",
    header: "Published",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <Badge
          className={cn(
            "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground",
            course.isPublisched && "bg-primary text-primary-foreground"
          )}
        >
          {course.isPublisched ? "Published" : "Draft"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "chapter",
    header: "Chapters",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const course = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/teacher/courses/${course.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-3.5 w-3.5" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
