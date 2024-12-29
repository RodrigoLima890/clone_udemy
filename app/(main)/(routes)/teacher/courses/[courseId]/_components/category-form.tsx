"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/schema";
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
import { updateCourseCategory } from "@/data";
import { Course } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox"
type Props = {
  initialData: Course
  courseId: string
  options: {label: string, value: string}[]
};

const CategoryForm = ({ initialData, courseId, options }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: initialData.description || undefined,
    },
  });
  const selectOption = options.find((option) => option.value === initialData.categoryId)
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    try {
      await updateCourseCategory(courseId, values);
      toggleEditing();
      route.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error updating title");
    }
  };
  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
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
        <p
          className={cn(
            "mt-2 text-sm",
            !initialData.categoryId && "text-muted-foreground/50 italic"
          )}
        >
          {selectOption ? selectOption.label : "Add a category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox 
                      options={options}
                      {...field}
                    />
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

export default CategoryForm;
