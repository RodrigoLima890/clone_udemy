"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isFreeSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { updateChapterAccess } from "@/data";
import { Switch } from "@/components/ui/switch"
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";
type Props = {
  initialData: Chapter;
  courseId: string;
};

const ChapterAccessForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof isFreeSchema>>({
    resolver: zodResolver(isFreeSchema),
    defaultValues: {
      isFree: initialData.isFree || false,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof isFreeSchema>) => {
    try {
      await updateChapterAccess(courseId, values, initialData.id);
      toggleEditing();
      route.refresh();
    } catch (error) {
      toast.error("Error updating access chapter");
      console.log(error);
    }
  };
  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter access
        <Button variant={"ghost"} onClick={toggleEditing}>
          {isEditing && "Cancel"}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "mt-2 text-sm",
            !initialData.isFree && "text-muted-foreground/50 italic"
          )}
        >
          {initialData.isFree
            ? "This chapter is free"
            : "This chapter is not free"}
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex space-x-3 rounded-md border p-4 items-start text-sm space-y-0">
                  <FormControl>
                    <Switch 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <p className="space-y-1 leading-none">If enabled, this chapter will be free for all students</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? <Loader2 className="h-4 w-4" /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
