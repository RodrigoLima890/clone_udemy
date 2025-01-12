import { Category, Course } from "@prisma/client"

export type GetCourse = {
    userId: string,
    title: string,
    categoryId: string
}

export type GetCourseWithoutProgress = {
    title: string,
    categoryId: string
}


export type CourseProgressWithCategory = Course & {
    category: Category | null,
    progresas: number | null,
    chapter: [id:string] []
}

export type CourseWithCategory = Course & {
    category: Category | null,
    progresas: number | null,
    chapter: [id:string] []
}