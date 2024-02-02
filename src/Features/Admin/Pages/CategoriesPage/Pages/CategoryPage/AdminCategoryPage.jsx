import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";

import { adminAxios } from "@/Utils/AdminAxios";

import { Link, redirect, useNavigate, useParams, } from "react-router-dom";
import { useQuery } from 'react-query';
import moment from 'moment';


import { useState } from "react";
import Button from "@/GeneralElements/Button/Button";
import { toast } from "react-toastify";
import UploadCategoryImage from "./Components/UploadCategoryImage";
import GuideComponent from "@/GeneralComponents/GuideComponent";
import { adminConfig } from "@/Features/Admin/AdminConfig";




export default function AdminCategoryPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);
    const nav = useNavigate();
    const { isLoading, error, data, refetch } = useQuery(
        `get-category-${searchParams.id || ""}`,
        () => adminAxios.get(`categories/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.category == null) {
        return <SorryDiv message="هذا التصنيف غير موجود الرجاء المحاولة مرة اخرى" />
    }
    const category = data.data.category;

    const deleteCategory = async () => {
        if (window.confirm("هل أنت متأكد من حذف التصنيف؟") && category != null) {
            setLoading('delete');
            try {
                const res = await adminAxios.delete(`categories/${category._id}`);

                toast("تم حذف التصنيف بنجاح");
                setLoading(null);
                return nav('/admin/categories');
            } catch (ex) {
                toast.error(ex.message);
                setLoading(null);
            }

        }
    }

    return (
        <main >
            <div className="flex-[4]">
                <div className="flex items-center gap-5">
                    <h5>{category.name}</h5>
                    <Link className="hover:text-[color:var(--text)] rounded-full h-10 flex justify-center items-center p-4 bg-[color:var(--primary)] aspect-square" to={`/admin/categories/${category._id}/edit`}>
                        <i className="fa-solid fa-pen "></i>
                    </Link>
                </div>
                <div className="grid grid-cols-2 px-4 pt-6 gap-6 md:grid-cols-2 xl:gap-6">
                    <div className="">
                        <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="mb-4 text-xl font-bold">بيانات التصنيف</h3>
                            </div>
                            <br />
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium  mb-2">رقم التصنيف</dt>
                                    <dd className="text-sm font-semibold text-fade">
                                        {category._id}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium  mb-2"> اسم التصنيف</dt>
                                    <dd className="text-sm font-semibold text-fade">
                                        {category.name}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium  mb-2"> الوصف</dt>
                                    <dd className="text-sm font-semibold text-fade">
                                        {category.description}
                                    </dd>
                                </div>




                                <div>
                                    <dt className="text-sm font-medium  mb-2">تاريخ إنشاء الحساب</dt>
                                    <dd className="text-sm font-semibold text-fade">
                                        {moment(category.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium  mb-2">أخر تعديل</dt>
                                    <dd className="text-sm font-semibold text-fade">
                                        {moment(category.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                    </dd>
                                </div>

                            </dl>
                            <br />
                            <div className="flex flex-row gap-4">

                                <Button className="bg-red-500 hover:bg-red-400" disabled={loading != null} loading={loading == 'delete'} onClick={deleteCategory}>
                                    حذف التصنيف
                                </Button>
                            </div>
                        </div>
                        <div className="bg-[color:var(--secondary)] rounded-2xl p-4  mb-6">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className=" text-xl font-bold">الوجبات المرتبطة</h3>
                            </div>
                            <br />
                            <div className="w-full flex flex-col">
                                {
                                    category?.meals?.length != 0 && category?.meals?.map((e, idx) =>
                                        <Link key={idx} to={`/admin/meals/${e._id}`} className="mt-5 text-lg font-bold w-100 border hover:bg-[color:var(--secondary-select)] rounded-md p-4 ">
                                            {e.name}
                                        </Link>)
                                }
                                {
                                    category?.meals?.length == 0 && <h6 className="text-center">
                                        لا يوجد وجبات مرتبطة !
                                    </h6>
                                }
                            </div>
                            <br />

                        </div>
                    </div>
                    <div className="space-y-5">
                        <GuideComponent guide={adminConfig.guides.categoryPage} />
                        <div className="rounded-md bg-[color:var(--secondary)] h-fit p-6 pt-8">
                            <UploadCategoryImage refetch={refetch} category={category} />
                        </div>
                    </div>
                </div>

            </div>

        </main>
    )
}
