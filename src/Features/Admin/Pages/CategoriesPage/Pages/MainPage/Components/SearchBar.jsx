import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ value, onSearch, responsable }) {
    const textRef = useRef();
    useEffect(() => {
        textRef.current.value = value;
    }, []);
    return (
        <div className="w-100 flex flex-wrap justify-between mb-5 gap-4">
            <div className="flex gap-3  justify-center items-center">

                <TextBox width={200} reference={textRef} placeholder="البحث" />
                <Button className="h-100 w-[50px] h-[40px]" onClick={() => onSearch({  search: textRef.current.value })} >
                    <i className="fa-solid fa-magnifying-glass p-0 m-0" ></i>
                </Button>
            </div>
            <div className="flex items-center mb-4 justify-center">
                
                <Link className="mx-4" to="/admin/categories/new-category">
                    <Button>
                        اضافة تصنيف
                    </Button>
                </Link>
            </div>
        </div>
    )
}
