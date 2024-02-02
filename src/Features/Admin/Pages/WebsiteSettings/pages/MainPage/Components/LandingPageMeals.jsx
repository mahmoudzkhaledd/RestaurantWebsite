import Button from "@/GeneralElements/Button/Button";
import AddLandingPageMealsModal from "./AddMealsModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { adminAxios } from "@/Utils/AdminAxios";

export default function LandingPageMeals({ meals, refetch, className }) {
    const [modal, setModal] = useState();
    const [loading, setLoading] = useState();
    const deleteMeal = async (id) => {
        if (!id || !window.confirm("هل أنت متأكد من حذف الوجبة؟")) return;
        try {
            const res = await adminAxios.delete(`/configs/remove-meal-landing-page?mealId=${id}`);
            refetch();
        } catch (ex) { }
    }
    return (
        <div className={`${className} w-100 p-5 bg-[color:var(--secondary)] border border-gray-200 rounded-lg shadow `}>
            {
                modal && <AddLandingPageMealsModal refetch={refetch} show={modal} closeModal={() => setModal(false)} />
            }
            <h5 className="mb-4 text-lg font-bold">
                الوجبات في الصفحة الرئيسية
            </h5>
            <div className="flex flex-col space-y-4">
                {
                    meals.map((e, idx) =>
                        <div key={idx} className="w-full flex justify-between items-center bg-[color:var(--secondary-select)] p-2 rounded-md">
                            <Link to={`/admin/meals/${e._id}`} className="w-full h-full">
                                <p>{e.name}</p>
                            </Link>
                            <Button className=" bg-red-500 hover:bg-red-400" color={false} disabled={loading} loading={loading == `delete ${e._id}`} onClick={() => deleteMeal(e._id)}>
                                حذف
                            </Button>
                        </div>)
                }
                {
                    meals.length == 0 && <p className="text-fade">
                        لم يتم اضافة أي وجبات الى الان
                    </p>
                }
            </div>
            <Button onClick={() => setModal(true)} className="mt-4">
                إضافة
            </Button>
        </div>
    )
}
