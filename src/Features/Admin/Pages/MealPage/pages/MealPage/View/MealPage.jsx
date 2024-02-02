import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { adminAxios } from "@/Utils/AdminAxios";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImage from "../../../../../GeneralComponents/UploadImage/UploadImage";
import ProgressBar from "@/GeneralComponents/ProgressBar/ProgressBar";
import ImageComponent from "../../../../../GeneralComponents/ImageComponent/ImageComponent";
import PriceComponent from "@/GeneralComponents/PriceComponent/PriceComponent";
import HtmlParser from "@/GeneralComponents/HtmlParser/HtmlParser";
import MealCategories from "@/GeneralComponents/MealCategories/MealCategories";
import { adminConfig } from "@/Features/Admin/AdminConfig";
import GuideComponent from "@/GeneralComponents/GuideComponent";

export default function MealPage({ }) {
    const searchParams = useParams();
    const [loading, setLoading] = useState(null);
    const [percentage, setUploadPercentage] = useState(null);
    const nav = useNavigate();
    const { isLoading, error, data, refetch } = useQuery(
        `get-meal-${searchParams.id || ""}`,
        () => adminAxios.get(`meals/${searchParams.id || ""}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
        });

    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data.meal == null) {
        return <SorryDiv message="هذه الوجبة غير موجودة الرجاء اعادة المحاولة" />
    }
    const meal = data.data.meal;
    const publishMeal = async () => {
        if (window.confirm("هل أنت متأكد ؟") && meal != null) {

            setLoading('publish');
            try {
                const res = await adminAxios.put(`meals/${meal._id}/publish-toggle`);
                refetch();
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        }
    }
    const deleteMeal = async () => {
        if (window.confirm("هل أنت متأكد ؟") && meal != null) {

            setLoading('delete meal');
            try {
                const res = await adminAxios.delete(`meals/${meal._id}`);
                nav('/admin/meals');
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        }
    }
    const addImage = async (e, isThumbnail) => {
        e.preventDefault();
        setLoading(isThumbnail);
        try {
            const form = document.getElementById(`frm-upload-${isThumbnail}`);

            if (meal == null) return setLoading(null);

            const data = new FormData(form)

            const file = data.get('file');

            if (file == null || file.size == 0) return setLoading(null);
            if (!adminConfig.supportedImages.includes(file.type)) {
                setLoading(null);
                return toast.error("صيغة الملف غير مسموح بها")
            }
            if (file.size / 1000000 > 1) {
                toast.error("من فضلك اختر ملف أقل من 1MB");
                return setLoading(null);
            }


            setUploadPercentage({
                name: file.name,
                progress: 0,
            });
            const options = {
                onUploadProgress: event => {
                    const { loaded, total } = event;
                    let percent = Math.floor((loaded * 100) / total);
                    if (percent < 100) {
                        setUploadPercentage({
                            name: file.originalname,
                            progress: percent,
                        });
                    }
                }
            }
            // const res = await adminAxios.post(`/meals/${meal._id}/upload-image?thumbnail=${isThumbnail}`, data, options);
            const res = await adminAxios.post(`/images?thumbnail=${isThumbnail}&mealId=${meal._id}`, data, options);
            document.getElementsByName('file').forEach(e => e.value = null)
            setUploadPercentage(null);
            refetch();
        } catch (ex) {
            if (ex?.response?.data?.msg == null) {
                toast.error(`${ex.message}`)
            }
        }
        setLoading(null);
    }
    const deleteImage = async (id) => {

        if (!id || !window.confirm('هل أنت متأكد من حذف الصورة؟')) return;
        setLoading(`delete ${id}`)
        try {
            const res = await adminAxios.delete(`/images/${id}?mealId=${meal._id}`);
            refetch();
        } catch (ex) {

        }
        setLoading(null)
    }
    return (
        <>
            <main>
                <div className="flex items-center gap-5">
                    <h5>{meal.name}</h5>
                    <Link className="hover:text-[color:var(--text)] rounded-full h-10 flex justify-center items-center p-4 bg-[color:var(--primary)] aspect-square" to={`/admin/meals/${meal._id}/edit`}>
                        <i className="fa-solid fa-pen "></i>
                    </Link>
                </div>
                <div className="grid grid-cols-2 px-4 pt-6 gap-6 md:grid-cols-2 xl:gap-6">
                    <div className="">
                        <div className="bg-[color:var(--secondary)]   rounded-2xl p-4 mb-6">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="mb-4 text-xl font-bold"> بيانات الوجبة</h3>
                            </div>
                            <br />
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div>
                                    <dt className="text-md font-medium  mb-2">كود الوجبة</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        {meal._id}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-md font-medium  mb-2"> الاسم</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        {meal.name}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-md font-medium  mb-2"> الإتاحة</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        {meal.available ? "منشروة" : "غير منشورة"}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-md font-medium  mb-2"> الطلبات</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        <Link to={'orders'} className="text-[color:var(--primary)] underline">
                                            اضغط هنا
                                        </Link>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-md font-medium  mb-2">تاريخ إنشاء الحساب</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        {moment(meal.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-md font-medium  mb-2">أخر تعديل</dt>
                                    <dd className="text-md font-semibold text-fade">
                                        {moment(meal.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                                    </dd>
                                </div>

                            </dl>
                            <br />

                            <div className="mb-5">
                                <dt className="text-md font-medium  mb-2"> الوصف المخصر</dt>
                                <dd className="text-md font-semibold text-fade">
                                    {meal.subDescription}
                                </dd>
                            </div>
                            <div className="mb-5">
                                <dt className="text-md font-medium  mb-2"> الوصف</dt>
                                <dd className="text-md font-semibold text-fade">
                                    <HtmlParser className=" px-4" content={meal.description} />
                                </dd>
                            </div>
                            <div className="flex flex-row gap-4">
                                <Button onClick={publishMeal} disabled={loading != null} loading={loading == 'publish'} >
                                    {meal.available ? "الغاء النشر" : "نشر"}
                                </Button>
                                <Button className="bg-red-500 hover:bg-red-400" onClick={deleteMeal} disabled={loading != null} loading={loading == 'delete meal'} >
                                    حذف الوجبة
                                </Button>
                            </div>
                        </div>
                        <div className="bg-[color:var(--secondary)]   rounded-2xl p-4  mb-6">
                            <div className="flex flex-row justify-between items-center">
                                <h3 className=" text-xl font-bold">الأسعار </h3>
                            </div>
                            <br />
                            <PricesComp showFront={meal.showFront == "smallSize"} priceObj={meal.smallSize} className="mb-5" title="الحجم الصغير" />
                            <PricesComp showFront={meal.showFront == "mediumSize"} priceObj={meal.mediumSize} className="mb-5" title="الحجم المتوسط" />
                            <PricesComp showFront={meal.showFront == "largeSize"} priceObj={meal.largeSize} title="الحجم الكبير" />
                        </div>


                    </div>
                    <div className="space-y-5">
                        <GuideComponent guide={adminConfig.guides.mealPage}/>
                        <MealCategories link={true} categories={meal.categories} title={'التصنيفات'} />
                        <div className="bg-[color:var(--secondary)]  flex flex-col rounded-2xl mb-6 p-6 px-7  ">
                            <h3 className="text-xl font-bold mb-5"> الصور </h3>
                            <form id="frm-upload-thumbnail" className="mb-6" onSubmit={(e) => addImage(e, 'thumbnail')}>
                                <div className="flex justify-between  mb-5 flex-wrap items-center">
                                    <h6 >الصورة المصغرة</h6>
                                    <Button loading={loading == 'thumbnail'} disabled={loading}>رفع</Button>
                                </div>

                                <div className="flex flex-col mb-4">
                                    {
                                        meal?.thumbnailUrl == null ?
                                            <UploadImage loading={loading} name={"file"} id="image-picker" />
                                            : <ImageComponent loading={loading} text="الصورة المصغرة" image={meal?.thumbnailUrl} deleteImage={deleteImage} />
                                    }
                                    {
                                        loading == 'thumbnail' && <ProgressBar showValue={true} value={percentage?.progress || 0} />
                                    }
                                </div>
                            </form>

                            <form id="frm-upload-image" className="mb-4" onSubmit={(e) => addImage(e, 'image')}>
                                <div className="flex justify-between mb-3  flex-wrap items-center">
                                    <h6 >معرض الصور </h6>
                                    <Button loading={loading == 'image'} disabled={loading}>رفع</Button>
                                </div>
                                <div className="flex flex-col">
                                    {
                                        meal.imagesUrl?.map((e, idx) =>
                                            <ImageComponent loading={loading} className=" mb-3" key={idx} text={`صورة ${idx + 1}`} image={e} deleteImage={deleteImage} />)
                                    }
                                    <UploadImage loading={loading} name={"file"} id="image-picker" />
                                    {
                                        loading == 'image' && <ProgressBar showValue={true} value={percentage?.progress || 0} />
                                    }
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}

function PricesComp({ priceObj, title = "", className = "", showFront }) {
    return <div className={`${className} border p-4 ${priceObj.active && " bg-[color:var(--primary)]"} rounded-lg flex flex-row justify-between items-center gap-4 flex-wrap`}>

        <div className="flex items-center justify-center gap-2 text-md">
            {
                showFront && <i className="fa-solid fa-circle-check" />
            }
            <h6 className="font-bold">{title}</h6>
        </div>
        <PriceComponent priceObj={priceObj} />

    </div>
}