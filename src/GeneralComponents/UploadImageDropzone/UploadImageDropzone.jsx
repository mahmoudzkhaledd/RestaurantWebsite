"use client";

import Button from "@/GeneralElements/Button/Button";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import './style.css'
export default function UploadImageDropzone({ id, className = "",onClick }) {
    id = id || "file-dropzone"
    const [image, setImage] = useState(null);

    const handelImage = () => {
        const files = document.getElementById(id);
        if (!(files != null && files.files != null && files.files.length != 0)) return;

        const file = files.files[0];
        if (file.size / 1000000 > 1) {
            files.value = null;
            toast.error("من فضلك اختر ملف أقل من 1MB");
            return;
        }
        setImage(URL.createObjectURL(files.files[0]));
    };
    const deleteImage = async () => {
        const files = document.getElementById(id);
        if (files != null && files.files.length != 0) {
            files.value = null;
            setImage(null);
        }
    }

    return (
        <div className={`${className}`}>
            {
                image && 
                <div className={`upload_image__containerr `}>
                    <img src={image} alt="" className={`upload_image__img rounded-xl   object-cover`} />
                    <div className='upload_image__middle'>
                        <Button onClick={deleteImage} fontSize={20} verticalPadding={20} className="mr-auto aspect-square" >
                            <RiDeleteBin6Line />
                        </Button>
                    </div>
                </div>
            }
            <div className={`${image == null ? "" : "hidden"} flex items-center justify-center w-full ${className}`}>
                <label
                    htmlFor={id}
                    className="flex flex-col items-center justify-center w-full max-h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[color:var(--secondary)] transition-all  hover:bg-[color:var(--secondary-select)] "
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-fade "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-fade ">
                            <span className="font-semibold ">اضغط لاختيار صورة</span>
                        </p>
                        <p className="text-xs text-fade ">
                            PNG, JPG
                        </p>
                    </div>
                    <input id={id} multiple={false} onChange={onClick || handelImage} name="image" type="file" className="hidden" accept=".png, .jpg, .jpeg" />
                </label>
            </div>
        </div>

    )
}
