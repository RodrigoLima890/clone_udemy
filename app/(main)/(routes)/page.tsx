/* eslint-disable @typescript-eslint/no-unused-vars */
import SearchInput from "@/components/global/search-input";
import { getCategories } from "@/data";
import { currentUser } from "@/lib/auth";

import React from "react";
import Categories from "./_components/categories";

type Props = {
    searchParams: {
        title: string
        categoryIs: string
    }
}

const page = async({searchParams}:Props) =>{
    const user = await currentUser()
    const categories = await getCategories()

    return(
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <SearchInput />
            </div>
            <div className="p-6 space-y-5">
                <Categories
                    itens={categories}
                />

            </div>
            </>
    )
}

export default page