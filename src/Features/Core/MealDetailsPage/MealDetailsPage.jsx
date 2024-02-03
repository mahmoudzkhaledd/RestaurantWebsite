import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import ImageCarousel from "@/GeneralComponents/ImageScroll/ImagesScroll";
import HtmlParser from "@/GeneralComponents/HtmlParser/HtmlParser";
import MealCategories from "@/GeneralComponents/MealCategories/MealCategories";
import OrderCounter from "./Components/OrderCounter";
import { toast } from "react-toastify";
import MealPriceComponent from "@/GeneralComponents/MealPriceComponent/MealPriceComponent";

export default function MealDetailsPage({ }) {
    const params = useParams();
    const nav = useNavigate();
    const [loading, setLoading] = useState();
    const { isLoading, error, data, } = useQuery(
        `get-Meal-${params.id}`,
        () => userAxios.get(`meals/${params.id}`),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            enabled: params.id != null && params.id.length == 24,
        }
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data == null || data.data.meal == null) {
        return <SorryDiv message="لم نتمكن من العثور على الوجبة المطلوبة" />;
    }
    const meal = data.data.meal;
    const orderMeal = async () => {
        if (!meal || !window.confirm('هل أنت متأكد من اضافة الوجبة الى العربة؟')) return;
        const sizes = [
            'smallSize',
            'mediumSize',
            'largeSize',
        ];
        const frm = Object.fromEntries(new FormData(document.getElementById('frm-order')).entries());
        if (parseInt(frm.number) < 1 || !sizes.includes(frm.size)) {
            return toast.error("يجب اختيار حجم الوجبة أو عدد الوجبات")
        }
        setLoading(true);
        try {
            const res = await userAxios.post(`/orders/order-meal/${meal._id}`, {
                number: frm.number,
                size: frm.size,
            });
            
        } catch (ex) {

        }
        setLoading(false);
    }
    return (
        <section >
            <div className="container mx-auto px-4">
                <div className="lg:col-gap-6 xl:col-gap-6 mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-6">
                    <div className="lg:col-span-1 lg:row-span-2 lg:row-end-2">
                        <h1 className="text-2xl font-bold sm:text-3xl">
                            {meal.name}
                        </h1>

                        <form id='frm-order' onSubmit={(e) => e.preventDefault()} className="mt-10 gap-4 flex flex-col  space-y-2 border-t  py-4 ">
                            <h5>الأحجام المتوفرة</h5>
                            <MealPriceComponent name={'smallSize'} selected={true} title="الحجم الصغير" priceObj={meal.smallSize} />
                            <MealPriceComponent name={'mediumSize'} selected={meal.smallSize == null} title="الحجم المتوسط" priceObj={meal.mediumSize} />
                            <MealPriceComponent name={'largeSize'} selected={meal.smallSize == null && meal.mediumSize == null} title="الحجم الكبير" priceObj={meal.largeSize} />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-center w-full justify-start">
                                <OrderCounter name={"number"} disabled={loading} className="w-full col-span-1 h-full" />
                                <Button disabled={loading} loading={loading} onClick={orderMeal} className="w-full col-span-1 h-full flex gap-2 justify-center items-center">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <p> أضف الى العربة</p>
                                </Button>
                            </div>
                        </form>
                        <MealCategories className="mt-5 bg-none" title={"تصنيف الوجبة"} categories={meal.categories} />
                    </div>
                    <div className="lg:col-span-1 lg:row-end-1 border py-4 px-3 rounded-lg">
                        <ImageCarousel className={'mx-auto'} images={
                            meal.imagesUrl?.length > 0 ?
                                [meal.thumbnailUrl?.url, ...meal.imagesUrl?.map((e) => e.url)] : [meal.thumbnailUrl?.url || '/images/food.png']} />
                    </div>

                </div>
                <hr className="my-5" />
                <div className="mt-5 w-full">
                    <h4 className="mb-3 font-semibold">وصف الوجبة</h4>
                    <HtmlParser className="w-full" content={meal.description} />
                </div>
            </div>
        </section>

    )
}
