"use client";
import { Search } from "lucide-react";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import queryString from "query-string";
import { useDebounce } from "@/hooks/use-debounce";

const SearchInput = () => {
  const [value, setValue] = React.useState("");
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("category");
  const debounceValue = useDebounce(value, 1000);

  useEffect(() => {
    const url = queryString.stringifyUrl(
      {
        url: pathName,
        query: {
          categoryId: categoryId,
          title:debounceValue
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debounceValue, categoryId, pathName, router]);

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-3 text-muted-foreground" />
      <Input
        className="w-full md:w-[500px] pl-9 rounded-full"
        placeholder="Search ..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
