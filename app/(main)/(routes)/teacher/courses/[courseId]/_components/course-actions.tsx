"use client";
import ConfirmModal from "@/components/global/confirm-modal";
import { Button } from "@/components/ui/button";
import { deleteCourse, publishCourse, unpublishCourse } from "@/data";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
};
const CourseActions = ({ courseId, isPublished, disabled }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        // unpublish
        await unpublishCourse(courseId);
        toast.success("Course unpublished");
      } else {
        // publish
        await publishCourse(courseId);
        toast.success("Course published");
      }
      router.refresh();
    } catch (error) {
      toast.error("Erro publish Course");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteCourse(courseId);
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      toast.error("Erro deleting Course");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={disabled || isLoading}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={handleDelete}>
        <Button size={"sm"} disabled={disabled}>
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default CourseActions;
