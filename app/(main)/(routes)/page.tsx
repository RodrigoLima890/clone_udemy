/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchInput from "@/components/global/search-input";
import {
  getCategories,
  getCourseWithoutProgress,
  getCourseWithProgress,
} from "@/data";
import { currentUser } from "@/lib/auth";

import React from "react";
import Categories from "./_components/categories";
import CourseList from "@/components/global/course-list";

type Props = {
  searchParams: {
    title: string;
    categoryId: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const user = await currentUser();
  const categories = await getCategories();
  let couses;
  if (user?.id) {
    couses = await getCourseWithProgress({
      userId: user.id,
      title: searchParams.title,
      categoryId: searchParams.categoryId,
    });
  } else {
    couses = await getCourseWithoutProgress({
      title: searchParams.title,
      categoryId: searchParams.categoryId,
    });
  }

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-5">
        <Categories itens={categories} />
        <CourseList itens={couses} />
      </div>
    </>
  );
};

export default page;
