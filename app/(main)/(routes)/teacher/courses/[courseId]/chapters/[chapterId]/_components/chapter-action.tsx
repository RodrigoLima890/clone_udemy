"use client";
import ConfirmModal from "@/components/global/confirm-modal";
import { Button } from "@/components/ui/button";
import { deleteChapter, publishChapter, unpublishChapter } from "@/data";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  courseId: string;
  chapterId: string;
  isPublished: boolean;
  disabled: boolean;
};
const ChapterActions = ({
  chapterId,
  courseId,
  isPublished,
  disabled,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const handlePublish = async() => {
    try {
      setIsLoading(true)
      if(isPublished){
        // unpublish
        await unpublishChapter(chapterId, courseId)
        toast.success("Chapter unpublished")
      }else{
        // publish
        await publishChapter(chapterId, courseId)
        toast.success("Chapter published")
      }
      router.refresh()
    } catch (error) {
      toast.error("Erro publish chapter")
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }
  const handleDelete = async() => {
    try {
      setIsLoading(true)
      await deleteChapter(chapterId, courseId)
      router.refresh()
      router.push(`/teacher/courses/${courseId}`)
    } catch (error) {
      toast.error("Erro deleting chapter")
      console.log(error)
    }finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button size={"sm"} variant={"outline"} disabled={disabled || isLoading} onClick={handlePublish}>
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal
      onConfirm={handleDelete}
      >
        <Button size={"sm"} disabled={disabled}>
          <Trash className="h-4 w-4" />
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default ChapterActions;
