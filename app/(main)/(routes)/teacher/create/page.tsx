"use client";

import { z } from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { createCourseSchema } from "@/schema";
import Link from "next/link";
import { toast } from "sonner";
import { createCourse } from "@/data";
import { useRouter } from "next/navigation";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<z.infer<typeof createCourseSchema>>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof createCourseSchema>) {
    try{
      const response = await createCourse(data)
      toast.success("Course created")
      router.push(`/teacher/courses/${response.id}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      toast.error("Error creating course")
    }
  }
  return (
    <div className="max-w-5xl mx-auto h-full w-full flex md:items-center md:justify-center p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-muted-foreground">
          Give your course a title that describes what students will learn.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add title"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    What will students learn in your course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center gap-x-2">
              <Link href={"/"}>
              <Button variant={"ghost"} type="button">
                Cancel
              </Button>
              </Link>
              <Button disabled={isSubmitting || !isValid} type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
