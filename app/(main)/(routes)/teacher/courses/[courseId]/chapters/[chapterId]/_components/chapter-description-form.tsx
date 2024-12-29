"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { descriptionSchema } from "@/schema";
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
import { updateChapterDescription } from "@/data";
import { Chapter } from "@prisma/client";
import { cn } from "@/lib/utils";
import Tiptap from "@/components/global/tiptap";
type Props = {
  initialData: Chapter;
  courseId: string;
};

const ChapterDescriptionForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof descriptionSchema>>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      description: initialData.description || "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof descriptionSchema>) => {
    try {
      await updateChapterDescription(courseId, values, initialData.id);
      toggleEditing();
      route.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error updating description");
      console.log(error)
    }
  };
  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter description
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
            !initialData.description && "text-muted-foreground/50 italic"
          )}
        >
          {!initialData.description && "Add a description"}
          {
            initialData.description && (
              <div
                dangerouslySetInnerHTML={{__html: initialData.description}}
              />
            )
          }
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Tiptap val={field.value}/>
                  </FormControl>
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

export default ChapterDescriptionForm;
