import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

type Props = {
  label: string;
  icon?: IconType;
  value?: string;
};

const CategoryItem = ({ label, icon: Icon, value }: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");
  const title = searchParams.get("title");

  const onClick = () => {
    const url = queryString.stringifyUrl(
      {
        url: pathName,
        query: {
          categoryId: isSelected ? undefined : value,
          title: title,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url)
  };

  const isSelected = categoryId === value;
  return (
    <button
      className={cn(
        "mb-2 p-2 px-3 text-sm border rounded-full flex items-center gap-x-1 hover:bg-primary hover:text-primary-foreground",
        isSelected && "bg-primary text-primary-foreground border-primary"
      )}
      type="button"
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      <span className="truncate">{label}</span>
    </button>
  );
};

export default CategoryItem;
