"use client";
import React from "react";
import { z } from "zod";
import { videoSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { toast } from "sonner";
import { updateChapterVideo } from "@/data";
import { Chapter, MuxData } from "@prisma/client";
import FileUpload from "@/components/global/file-upload";
import MuxPlayer from "@mux/mux-player-react"; 

type Props = {
  initialData: Chapter & { muxData: MuxData | null };
  courseId: string;
  chapterId: string
};

const ChapterVideoForm = ({ initialData, courseId, chapterId }: Props) => {
  const route = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditing = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof videoSchema>) => {
    try {
      await updateChapterVideo(courseId, values, chapterId);
      toggleEditing();
      route.refresh();
    } catch (error) {
      toast.error("Error updating video chapter");
      console.log(error)
    }
  };
  return (
    <div className="mt-6 border bg-muted text-muted-foreground p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter video
        <Button variant={"ghost"} onClick={toggleEditing}>
          {isEditing && "Cancel"}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (
          !initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-muted rounded-md">
            <Video className="h-12 w-12 text-muted-foreground" />
          </div>
        ) : (
          <div className="relative aspect-video mt-4 h-48">
              <MuxPlayer 
                playbackId={initialData.muxData?.playbackId || ""}
              />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
        </div>
      )}
      {
        initialData.videoUrl && !isEditing && (
          <div className="text-xs mt-2 text-muted-foreground">
            Video can take a few minuteres to process. Refresh the page if doesn't show up
          </div>
        )
      }
    </div>
  );
};

export default ChapterVideoForm;
