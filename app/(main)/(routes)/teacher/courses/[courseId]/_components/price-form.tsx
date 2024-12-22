"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { priceSchema } from "@/schema";
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
import { updateCoursePrice } from "@/data";
import { Course } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/input";
type Props = {
  initialData: Course;
  courseId: string;
};

const PriceForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof priceSchema>>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      price: initialData.price || undefined,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof priceSchema>) => {
    try {
      await updateCoursePrice(courseId, values);
      toggleEditing();
      route.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error updating title");
    }
  };
  return (
    <div className="mt-6 border bg-meted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Course price
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
            !initialData.price && "text-muted-foreground/50 italic"
          )}
        >
          {initialData.price ? formatPrice(initialData.price) : "Add a price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step={0.01}
                      placeholder="Edit price"
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
                {isSubmitting ? <Loader2 className="h-4 w-4" /> : "Save"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default PriceForm;
