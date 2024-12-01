"use client"
import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const SearchInput = () =>{
    const [value, setValue] = React.useState('');
    return(
        <div className="relative">
            <Search
                className="absolute h-4 w-4 top-3 left-3 text-muted-foreground"
            />
            <Input
                className="w-full md:w-[500px] pl-9 rounded-full"
                placeholder="Search ..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    )
}

export default SearchInput