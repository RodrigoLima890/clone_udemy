import { Category, Course } from "@prisma/client";
import React from "react";
import CourseCard from "./course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null
    chapters: {id: string} []
    progress?: number | null
}

type Props = { itens: CourseWithProgressWithCategory[]}

const CourseList = ({itens}:Props) => {
    return (
        <div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    itens.map((item, index) => (
                        <CourseCard 
                          key={index}
                          id={item.id}
                          title={item.title}
                          imageUrl={item.imageUrl!}  
                          chaptersLength={item.chapters.length}
                          price={item.price!}
                          progress={item.progress}
                          category={item.category?.name}
                        />
                    ))
                }
                
            </div>
            {
                itens.length === 0 && (
                    <div className="w-full h-screen flex items-center justify-center">
                        No courses found
                    </div>
                )
            }
        </div>
    )
}

export default CourseList