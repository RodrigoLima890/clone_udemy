/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schema";
import {FaGithub} from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc';
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react"; 
import { DEFAULT_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";
import FormError from "@/components/global/form-error";

const page = () =>{

    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get('callbackUrl')
    const urlError = searchParams.get('error') === "OAuthAccountNotLinked" ? "Conta não encontrada":null;

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
        }
    })

    const isPending = form.formState.isSubmitting

    const [isGooglePending, setGooglePending] = React.useState(false);
    const [isGitHubPending, setGitHubPending] = React.useState(false);

    const onSubmit = async (data: z.infer<typeof LoginSchema>) =>{
        try {
            signIn('resend', {email: data.email, redirectTo: callbackUrl || DEFAULT_REDIRECT})
        } catch (error) {
            console.log(error)
        }
    }

    const onclick = async (provider: 'google' | 'github') => {
        signIn(provider, { callbackUrl: callbackUrl || DEFAULT_REDIRECT })
    }
    
    return (
        <div className="w-full h-full flex justify-center items-center">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Faça login com sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FormError message={urlError} />
                    <Form {...form}>
                        <form className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField name='email'
                            render={({field})=>(
                                <>
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled={isPending} type="email" placeholder="Entre com seu email"></Input>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                </>
                            )}>
                            </FormField>
                            <Button
                             type="submit"
                             className="w-full"
                             disabled={isPending}
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
                        className="w-full flex space-x-2"
                        disabled={isPending}
                        onClick={()=>{
                            setGooglePending(true);
                            onclick('google');
                        }}>
                        {
                            isGooglePending ? <Loader2 className="w-6 h-6 animate-spin" />:
                        <>
                        <FcGoogle />
                        <span>Entrar Com Google</span>
                        </>
                        }
                    </Button>
                   
                    <Button
                        variant={"outline"}                            
                        className="w-full flex space-x-2"
                        disabled={isPending}
                        onClick={()=>{
                            setGitHubPending(true);
                            onclick('github');
                        }}>
                        {
                            isGitHubPending? <Loader2 className="w-6 h-6 animate-spin" />:
                        <>
                        <FaGithub className="w-6 h-6" />
                        <span>Entrar Com Github</span>
                        </>
                        }
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default page;