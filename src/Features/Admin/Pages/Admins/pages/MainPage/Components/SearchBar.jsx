import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const userStates = [
    {
        name: "الكل",
        value: "all",
    },
    {
        name: "غير موقوف",
        value: "unsuspended",
    },
    {
        name: "موقوف",
        value: "suspended",
    },
]
export default function SearchBar({ value, onSearch, selectedState }) {
    const textRef = useRef();
    useEffect(() => { textRef.current.value = value; }, []);
    return (
        <div className="w-100 flex justify-between mb-5 flex-wrap gap-3">
            <div className="flex gap-3  justify-center items-center">
                <TextBox width={200} reference={textRef} placeholder="البحث" />
                <select
                    id="status"
                    name="status"
                    defaultValue={userStates.filter((e) => e.value == selectedState ).length == 0 ? "all" : selectedState}

                    className="bg-gray-50 px-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5      "
                >
                    {
                        userStates.map((e, idx) => <option key={idx} value={e.value} >{e.name}</option>)
                    }
                </select>

                <Button className="h-100 w-[50px] h-[50px]" onClick={() => onSearch({ search: textRef.current.value, state: document.getElementById('status').value })} >
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </div>
            <Link to="/admin/admins/new-admin">
                <Button >اضافة مدير</Button>
            </Link>
        </div>
    )
}
