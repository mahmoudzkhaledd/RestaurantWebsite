import Button from "@/GeneralElements/Button/Button";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import MealItem from "../../Features/Core/Checkout/Checkout/MealItem";
import { useState } from "react";
import { toast } from "react-toastify";


export default function Cart({ show, closeCart }) {
    const [loading, setLoading] = useState();
    const { isLoading, error, data, refetch } = useQuery(
        "get-user-cart",
        () => userAxios.get('orders/get-cart'),
        {
            refetchOnWindowFocus: false,
            retry: 0,
            enabled: show,
        }
    );
    if (!show) return <></>;
    const cart = data?.data?.cart;
    const total = data?.data?.total;

    const deleteCartItem = async (id) => {
        if (window.confirm("هل أنت متأكد؟") && cart != null) {

            setLoading(`delete ${id}`);
            try {
                const res = await userAxios.delete(`orders/cart/remove/${id}`);
                refetch();
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        }
    }
    return (
        <div
            className="relative z-10"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
        >

            <div onClick={closeCart} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />


            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white  shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2
                                            className="text-lg font-medium text-gray-900"
                                            id="slide-over-title"
                                        >
                                            عربة التسوق
                                        </h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button
                                                onClick={closeCart}
                                                type="button"
                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                            >
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8 h-full">
                                        <div className="flow-root h-full">
                                            <ul role="list" className="-my-6 divide-y h-full divide-gray-200">
                                                {
                                                    isLoading ? <div className=" w-full h-full">
                                                        <Spinner className=" text-[color:var(--text-invert)] text-2xl my-auto" />
                                                    </div> :
                                                        cart.map((e, idx) => <MealItem disabled={loading} deleteCartItem={deleteCartItem} key={idx} order={e} />)
                                                }
                                                {
                                                    cart?.length == 0 && <div className="w-full h-full flex items-center justify-center text-center">
                                                        <p className="text-[color:var(--text-invert)]">
                                                            لا يوجد عناصر في العربة
                                                        </p>
                                                    </div>
                                                }
                                                {
                                                    (error || cart == null) && <div className="w-full h-full flex items-center justify-center text-center">
                                                        <p className="text-[color:var(--text-invert)]">
                                                            حدث خطأ الرجاء اعادة المحاولة
                                                        </p>
                                                    </div>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
                                    <div className="text-[color:var(--text-invert)] flex justify-between items-center mb-5">
                                        <h6 className=" font-bold text-inherit">الاجمالي</h6>
                                        {
                                            isLoading ? <Spinner /> : <h6 className=" text-xl font-bold text-inherit">{total} جنيه</h6>
                                        }
                                    </div>
                                    <Button
                                        onClick={!(isLoading || error || cart == null || cart.length == 0) ? () => window.location.href = "/check-out" : null}
                                        disabled={isLoading || error || cart == null || cart.length == 0} className=" bg-blue-600 hover:bg-blue-400 w-full py-5">
                                        متابعة الطلب
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
