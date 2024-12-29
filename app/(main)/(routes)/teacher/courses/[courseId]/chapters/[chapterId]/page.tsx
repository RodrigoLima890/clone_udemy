import { getChapter } from "@/data";
import { ArrowLeft, PenSquare } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChapterTitleForm from "./_components/chapter-title-form";

type Props = {
  params: {
    courseId: string;
    chapterId: string;
  };
};

const Page = async ({ params }: Props) => {
  const chapter = await getChapter(params.chapterId, params.courseId);
  if (!chapter) redirect("/");

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];

  const totalFields = requiredFields.length;
  const completedField = requiredFields.filter(Boolean).length;
  const completionText = `${completedField}/${totalFields}`;
  const isCompleted = completedField === totalFields;

  return (
    <>
      {/* Add banner */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.chapterId}`}
              className="flex items-center text-sm hover:opacity-75 mb-6 transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-3x1 font-bold">Chapter setup</h1>
                <span className="text-muted-foreground text-sm">
                  {completionText} fields completed
                </span>
              </div>
              {/* filds actions */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
          <Card>
            <CardHeader>
              <CardTitle className="flex items">
                <PenSquare className="mr-2" />
                Customize chapter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <ChapterTitleForm 
                    initialData={chapter}
                    courseId={params.courseId}
                    chapterId={params.chapterId}
                    />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
