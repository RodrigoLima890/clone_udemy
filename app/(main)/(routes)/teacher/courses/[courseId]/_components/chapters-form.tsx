"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { chapterSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateChapterOrder, updateCourseChapter } from "@/data";
import { Chapter, Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import ChapterList from "./chapter-list";

type Props = {
  initialData: Course & {chapters : Chapter[]}
  courseId: string;
};

const ChaptersForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isCreating, setIsCreating] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const toggleCreating = () => setIsCreating((prev) => !prev);

  const form = useForm<z.infer<typeof chapterSchema>>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
        title: ""
    },
  });
  const { isSubmitting, isValid } = form.formState;

   const onSubmit = async (values: z.infer<typeof chapterSchema>) => {
    try {
        await updateCourseChapter(courseId, values)
        toggleCreating()
        route.refresh()
        toast.success("Chapter Created")
    } catch (error) {
        toast.error("Error updating title")
        console.log(error)
    }
  }

  const onReorder = async(updateData: { id: string; position: number }[]) => {
    try {
        setIsUpdating(true)
        await updateChapterOrder(courseId,updateData)
        route.refresh()
        toast.success("Chaptets reordered")
    } catch (error) {
      toast.error("Error updating title")
      console.log(error)
    }finally{
      setIsUpdating(false)
    }
  }
  const onEdit = (id:string) => {
    route.push(`/teacher/courses/${courseId}/chapters/${id}`)
  }
  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4 relative">
      <div className="font-medium flex items-center justify-between">
        Course chapters
        <Button variant={"ghost"} onClick={toggleCreating}>
          {isCreating && "Cancel"}
          {!isCreating && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {
      isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? <Loader2 className="h-4 w-4" /> : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      )}
      {
        !isCreating && (
            <div className={cn(
                "text-sm mt-2",
                !initialData.chapter.length && "text-muted-foreground/50 italic"
            )}>
                {!initialData.chapter.length && "No chapters added"}
                <ChapterList 
                  onEdit={onEdit}
                  onReorder={onReorder}
                  items={initialData.chapter || []}
                  />
            </div>
        )
      }
      {
        !isCreating && (
            <p className="text-xs text-muted-foreground mt-4">
                Drag and drop to reorder chapters
            </p>
        )
      }
    </div>
  );
};

export default ChaptersForm;
