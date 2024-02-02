import { adminConfig } from "@/Features/Admin/AdminConfig";
import GuideComponent from "@/GeneralComponents/GuideComponent";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams, } from "react-router-dom";
import { toast } from "react-toastify";

export default function NewCategoryPage({ editMode }) {
    const searchParams = useParams();

    const [loading, setLoading] = useState();
    const nav = useNavigate();
    const { isLoading, error, data, refetch } = useQuery(
        `get-category-${searchParams.id || ""}`,
        () => adminAxios.get(`categories/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: editMode == true,
        });
    const addCategory = async (e) => {
        e.preventDefault();
        const form = document.getElementById("add-category-form");
        const { name, description } = Object.fromEntries(new FormData(form).entries());

        if (!name || !description || name.length == 0) {
            toast.error("الرجاء ادخال كافة البيانات");
            return null;
        }
        setLoading('add');
        try {
            const res = editMode ?
                await adminAxios.put(`/categories/${searchParams.id}`, { name, description }) :
                await adminAxios.post("/categories", { name, description });
            return nav(`/admin/categories/${editMode ? searchParams.id : res.data.category._id}`, { replace: true });
        } catch (ex) {

            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            }
        }
        setLoading(null);
    }
    if (editMode) {
        if (isLoading) {
            return <Spinner />;
        }
        if (error || data == null || data.data.category == null) {
            return <SorryDiv message="هذا التصنيف غير موجود الرجاء المحاولة مرة اخرى" />
        }
    }
    const category = data?.data?.category;

    return (
        <div className="flex flex-col lg:flex-row  px-6 py-8  md:h-screen lg:py-0">
            <div className="w-full flex-[3] rounded-lg shadow  md:mt-0 xl:p-0  ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h5 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                        {editMode ? "تعديل تصنيف" : "إضافة تصنيف جديد"}
                    </h5>

                    <form id="add-category-form" onSubmit={addCategory} className="flex flex-col gap-4" >
                        <TextBox initialValue={category?.name} required={true} name="name" placeholder="اسم التصنيف" label="اسم الوجبة" />
                        <TextBox initialValue={category?.description} required={true} name="description" placeholder="الوصف" label="الوصف" area={true} />
                        <Button loading={loading == 'add'} disabled={loading} className="mr-auto" >
                            {editMode ? "تعديل التصنيف" : "إضافة التصنيف"}
                        </Button>
                    </form>
                </div>
            </div>
            <GuideComponent className="flex-[1]" guide={adminConfig.guides.addCategoryPage}/>
        </div>
    )
}
