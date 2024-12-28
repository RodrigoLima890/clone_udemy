"use client";
import React from "react";
import { z } from "zod";
import { imageSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";

import { toast } from "sonner";
import { updateCourseImage } from "@/data";
import { Course } from "@prisma/client";
import FileUpload from "@/components/global/file-upload";
import Image from "next/image";

type Props = {
  initialData: Course;
  courseId: string;
};

const ImageForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof imageSchema>) => {
    try {
      await updateCourseImage(courseId, values);
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
        Course image
        <Button variant={"ghost"} onClick={toggleEditing}>
          {isEditing && "Cancel"}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (
          !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-muted rounded-md">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-4 h-48">
            <Image
              src={initialData.imageUrl}
              alt="course image"
              fill
              className="rounded-md object-cover ml-0"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
