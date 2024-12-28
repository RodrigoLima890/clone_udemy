import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email()
})

export const createCourseSchema = z.object({
    title: z.string().min(1, {message:"Title is required"})
})

export const titleSchema = z.object({
    title: z.string().min(1, {message:"Title is required"})
})

export const descriptionSchema = z.object({
    description: z.string().min(1, {message:"description is required"})
})

export const priceSchema = z.object({
    price: z.coerce.number()
})

export const categorySchema = z.object({
    categoryId: z.string().min(1, {message:"category is required"})
})

export const imageSchema = z.object({
    imageUrl: z.string().min(1, {message:"image is required"})
})

export const attachmentSchema = z.object({
    url: z.string().min(1, {message:"attachment is required"})
})

export const chapterSchema = z.object({
    title: z.string().min(1, {message:"title is required"})
})