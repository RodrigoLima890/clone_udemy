import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email()
})

export const createCourseSchema = z.object({
    title: z.string().min(1, {message:"Title is required"})
})