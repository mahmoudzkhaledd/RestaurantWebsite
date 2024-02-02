"use strict";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { useQuery } from "react-query";
import CategoryComponent from "../Components/CategoryComponent";
import { adminAxios } from "@/Utils/AdminAxios";
import { getObjectWithArray, getObjectWithNestedObjects } from "@/Utils/Helper";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import PriceInputComponent from "../Components/PriceInputComponent";

import TipTap from "@/GeneralComponents/TipTap/TipTap";

function validateShowFront(priceObj, showFront, name) {
    if (!priceObj.active && showFront == name) {
        return false;
    }
    return true;
}

export default function AddNewMeal({ editMode }) {
    const nav = useNavigate();
    const [loading, setLoading] = useState();
    const params = useParams();
    
    const { isLoading, isError, data, refetch } = useQuery(
        ['get-categories'],
        () => adminAxios.get(`categories?get=all`),
        {
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            retry: 0,
        }
    );
    const { isLoading: isLoadingMeal, error: errorMeal, data: dataMeal, refetch: refetchMeal } = useQuery(
        `get-meal-${params.id || ""}`,
        () => adminAxios.get(`meals/${params.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: editMode == true,
        });

    if (isLoading || (isLoadingMeal && editMode)) {
        return <Spinner />;
    }
    const categories = data.data.categories;
    const meal = dataMeal?.data.meal;

    if (isError || categories == null || (!meal && editMode)) {
        return <SorryDiv message="الرجاء المحاولة مرة اخرى" />
    }

    const addMeal = async (e) => {
        e.preventDefault();
        const frm = document.getElementById('add-meal-form');
        let obj = getObjectWithArray(Object.fromEntries(new FormData(frm).entries()), 'categories');
        obj = getObjectWithNestedObjects(obj, 'smallSize');
        obj = getObjectWithNestedObjects(obj, 'mediumSize');
        obj = getObjectWithNestedObjects(obj, 'largeSize');
        obj.description = description;
        if (!['smallSize', 'mediumSize', 'largeSize'].includes(obj.showFront)) {
            return alert("الرجاء اختيار سعر للظهور للمستخدم");
        }
        if (!validateShowFront(obj.smallSize, obj.showFront, "smallSize") ||
            !validateShowFront(obj.mediumSize, obj.showFront, "mediumSize") ||
            !validateShowFront(obj.largeSize, obj.showFront, "largeSize")) {
            return alert("يجب اختيار سعر للظهور للمستخدم ويكون تم اظهاره");
        }
        setLoading(true);
        try {
            const res = editMode ? await adminAxios.put(`/meals/${meal?._id}`, obj) : await adminAxios.post('/meals', obj);

            // if (res.data?.meal != null)
            //     nav(`/admin/meals/${res.data.meal._id}`);
        } catch (ex) { }
        setLoading(false);
    }
    const mealCategories = {};
    if (meal?.categories != null) {
        for (const x of meal.categories) {
            mealCategories[x._id] = true;
        }
    }
    let description = meal?.description || '';
    return (
        <div className="flex flex-col  px-6 py-8  md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow  md:mt-0 xl:p-0  ">
                <div className="p-0 md:p-5 space-y-4 md:space-y-6 sm:p-8">
                    <form onSubmit={(e) => e.preventDefault()} id="add-meal-form"  >
                        <div className='flex justify-between items-center flex-wrap '>
                            <h5 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                                {editMode ? meal?.name : "إضافة وجبة جديدة"}
                            </h5>
                            <Button loading={loading} onClick={addMeal} disabled={loading}>
                                {editMode ? "تعديل الوجبة" : "إضافة الوجبة"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1  pt-6 gap-6 xl:grid-cols-2 xl:gap-6">
                            <div className='col-span-full xl:col-auto space-y-4 bg-[color:var(--secondary)] px-6 py-8 rounded-lg'>
                                <h5 className="text-lg font-bold leading-tight tracking-tight ">
                                    المعلومات الأساسية
                                </h5>
                                <TextBox disabled={loading} initialValue={meal?.name} required={true} name="name" placeholder="اسم الوجبة" label="اسم الوجبة" />
                                <TextBox disabled={loading} initialValue={meal?.subDescription} maxLength={150} required={true} name="subDescription" placeholder="وصف مختصر" label="الوصف المختصر" area={true} />
                                {/* <TextBox disabled={loading} initialValue={meal?.description} required={true} name="description" placeholder="الوصف" label="الوصف" area={true} /> */}
                                <TipTap onChange={(e) => description = e} label="الوصف" content={description} />
                            </div>
                            <div className='col-span-full h-fit xl:col-auto space-y-5 bg-[color:var(--secondary)] px-6 py-8 rounded-lg'>
                                <h5 className="text-lg font-bold leading-tight tracking-tight ">
                                    الأحجام والأسعار
                                </h5>
                                <PriceInputComponent showFront={meal?.showFront} priceObject={meal?.smallSize} name="smallSize" title="الصغير" />
                                <PriceInputComponent showFront={meal?.showFront} priceObject={meal?.mediumSize} name="mediumSize" title="المتوسط" />
                                <PriceInputComponent showFront={meal?.showFront} priceObject={meal?.largeSize} name="largeSize" title="الكبير" />

                            </div>
                        </div>
                        <div className="grid grid-cols-1 mt-6 gap-6 xl:gap-6">
                            <div className='h-fit col-span-full xl:col-auto space-y-4 bg-[color:var(--secondary)] px-6 py-8 rounded-lg'>
                                <h5 className="text-lg font-bold leading-tight tracking-tight ">
                                    تصنيف الوجبة
                                </h5>
                                <ul className="list-none text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg ">
                                    {
                                        categories.map((e, idx) => <CategoryComponent selected={mealCategories[e._id] != null} category={e} key={idx} />)
                                    }
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
