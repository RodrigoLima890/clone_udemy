"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
  
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schema";
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';


const page = () =>{
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = (data: z.infer<typeof LoginSchema>) =>{
        console.log(data);
    }
    return (
        <div className="w-full h-full flex-col justify-center items-center">
            <Card className="max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Faça login com sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Form {...form}>
                        <form className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name='email'
                            render={({field})=>(
                                <>
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" placeholder="Entre com seu email"></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}>
                            </FormField>
                            <Button
                             type="submit"
                             className="w-full"
                            >
                               Entrar</Button>
                        </form>
                    </Form>
                    <div className="w-full flex items-center space-x-2">
                        <div className="w-full h-[1px] border" />
                        <span className="flex-1">OU</span>
                        <div className="w-full h-[1px] border" />
                    </div>
                    <Button
                        variant={"outline"}                            
                        className="w-full flex- space-x-2"
                    >
                        <>
                        <FcGoogle />
                        <span>Entrar Com Google</span>
                        </>
                    </Button>
                   
                    <Button
                        variant={"outline"}                            
                        className="w-full flex- space-x-2"
                    >
                        <>
                        <FaGithub className="w-6 h-6" />
                        <span>Entrar Com Github</span>
                        </>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default page;