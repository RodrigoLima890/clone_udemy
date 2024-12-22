import { getCategories, getCourse } from "@/data";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import PriceForm from "./_components/price-form";
import CategoryForm from "./_components/category-form";
import ImageForm from "./_components/image-form";

type Props = {
  params: {
    courseId: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await currentUser();

  if (!user) redirect("/");
  const course = await getCourse(params.courseId);
  if (!course) redirect("/");
  const requiredField = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
    course.chapter.some((chapter) => chapter.isPublisched),
  ];

  const categories = await getCategories()
  const totalFields = requiredField.length;
  const completedFields = requiredField.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;
  //const isCompleted = completedFields === totalFields;

  return (
    <>
      {/* {add banner} */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-3xl font-bold">Course Setup</h1>
            <span className="text-muted-foreground">
              {completionText} fields completed
            </span>
          </div>
          {/* {add actions} */}
        </div>
        <div className="mt-14">
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList>
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="content">Course Chapters</TabsTrigger>
              <TabsTrigger value="resources">Course Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                    <CardTitle>
                        Course Details
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <TitleForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div className="space-y-2">
                        <DescriptionForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div className="space-y-2">
                        <PriceForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div className="space-y-2">
                        <CategoryForm 
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                              label: category.name,
                              value: category.id
                            }))}
                        />
                    </div>
                    <div className="space-y-2">
                        <ImageForm 
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              Make changes to your account here.
            </TabsContent>

            <TabsContent value="resources">
              Make changes to your account here.
            </TabsContent>
        
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default page;
