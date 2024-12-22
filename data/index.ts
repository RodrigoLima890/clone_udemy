"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";


const _isAuthUser = async () => {
    try {
        const auth = await currentUser()
        if (!auth || !auth.email) throw Error("User is not authenticated");

        const user = db.user.findUnique({
            where: {
                email: auth.email
            }
        })

        return user
    } catch (error) {
        console.log("Error in _isAuthUser: ", error)
        throw error
    }
}


export const createCourse = async (data: { title: string }) => {
    try {

        const user = await _isAuthUser()

        if (!user) throw Error("User not found");
        const course = db.course.create({
            data: {
                title: data.title,
                teacherId: user?.id
            }
        })
        return course
    } catch (error) {
        console.log("Error in createCourse: ", error)
        throw error
    }
}

export const getCourse = async (courseId: string) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.findUnique({
            where: {
                id: courseId,
                teacherId: user.id
            },
            include: {
                attachments: true,
                chapter: {
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })
        return course
    } catch (error) {
        console.log("Error in getCourse: ", error)
        throw error
    }
}
export const updateCourseTitle = async (courseId: string, data: { title: string }) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                title: data.title
            }
        })
        return course
    } catch (error) {
        console.log("Error in updateCourseTitle: ", error)
        throw error
    }
}

export const updateCourseDescription = async (courseId: string, data: { description: string }) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                description: data.description
            }
        })
        return course
    } catch (error) {
        console.log("Error in updateCourseDescription: ", error)
        throw error
    }
}

export const updateCoursePrice = async (courseId: string, data: { price: number }) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                price: data.price
            }
        })
        return course
    } catch (error) {
        console.log("Error in updateCoursePrice: ", error)
        throw error
    }
}
export const updateCourseCategory = async (courseId: string, data: { categoryId: string }) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                categoryId: data.categoryId
            }
        })
        return course
    } catch (error) {
        console.log("Error in updateCourseCategory: ", error)
        throw error
    }
}

export const updateCourseImage = async (courseId: string, data: { imageUrl: string }) => {
    try {
        const user = await _isAuthUser()
        if (!user) throw Error("User not found");

        const course = db.course.update({
            where: {
                id: courseId,
                teacherId: user.id
            },
            data: {
                imageUrl: data.imageUrl
            }
        })
        return course
    } catch (error) {
        console.log("Error in updateCourseImage: ", error)
        throw error
    }
}

export const getCategories = async() => {
    try {
    
        const categories = db.category.findMany({
            orderBy: {
                name: "asc"
            }
        })
        return categories
    } catch (error) {
        console.log("Error in getCategories: ", error)
        throw error
    }
}