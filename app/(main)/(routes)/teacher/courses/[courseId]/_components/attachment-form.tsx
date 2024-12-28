"use client";

import React from "react";
import { z } from "zod";
import { attachmentSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import { toast } from "sonner";
import { updateCourseAttachment, deleteAttachmentCourse } from "@/data";
import { Attachment, Course } from "@prisma/client";
import FileUpload from "@/components/global/file-upload";

type Props = {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
};

const AttachmentForm = ({ initialData, courseId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof attachmentSchema>) => {
    try {
      await updateCourseAttachment(courseId, values);
      toggleEditing();
      route.refresh();
    } catch (error) {
      toast.error("Error updating attachment");
      console.log(error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteAttachmentCourse(courseId,id);
      toast.success("attachment deleted")
      route.refresh();
    } catch (error) {
      toast.error("Error delete attachment");
      console.log(error);
    }finally{
      setDeletingId(null)
    }
  };

  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button variant={"ghost"} onClick={toggleEditing}>
          {isEditing && "Cancel"}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <div className="text-muted-foreground mt-2 italic">
              No attachments added yet
            </div>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="w-full flex items-center rounded-md p-3
                       border-foreground bg-primary/50 text-foreground"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <a href={attachment.url} target="blank" title="open attach" className="text-xs line-clamp-1">{attachment.url}</a>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button className="ml-auto hover:opacity-75 transition"
                    onClick={()=> onDelete(attachment.id)}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
