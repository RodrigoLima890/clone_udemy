"use client";
import { Category } from "@prisma/client";
import React from "react";
import {
  FcBusinessman,
  FcEngineering,
  FcFilmReel,
  FcMusic,
  FcSportsMode,
  FcBriefcase,
  FcReading,
  FcGraduationCap

} from "react-icons/fc";

import { IconType } from "react-icons";
import CategoryItem from "./category-item";

type Props = {
    itens: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  Music: FcMusic,
  Engineering: FcEngineering,
  Film: FcFilmReel,
  Sports: FcSportsMode,
  Business: FcBusinessman,
  "Business & Finance": FcBriefcase,
  Reading: FcReading,
  Education: FcGraduationCap,
  Technology: FcEngineering,
  Science: FcGraduationCap,
  Health: FcSportsMode,
  Art: FcMusic,
  Fashion: FcBriefcase,
};

const Categories = ({ itens }: Props) => {
  return (
  <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
    {
        itens.map((item, index) => (
             <CategoryItem
             key={index}
             label={item.name}
             icon={iconMap[item.name]}
             value={item.id}
             />
        ))
    }
  </div>
  )
};

export default Categories;
