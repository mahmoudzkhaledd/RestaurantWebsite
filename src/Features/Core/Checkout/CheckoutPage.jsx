import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import { userAxios } from "@/Utils/UserAxios";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "../LandingPage/Components/Menu/MenuItem";
import OrderItem from "./Checkout/MealItem";
import { useState } from "react";
import { userStore } from "@/hooks/UserRedux/UserStore";
import UserAddressComponent from "@/GeneralComponents/UserAddress/UserAddressComponent";
import Button from "@/GeneralElements/Button/Button";
import { toast } from "react-toastify";

export default function CheckoutPage({ }) {
    const [loading, setLoading] = useState(null);
    const [address, setAddress] = useState(null);
    const nav = useNavigate();
    const { isLoading, error, data, refetch } = useQuery(
        "get-user-cart",
        () => userAxios.get('orders/get-cart'),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    );
    if (isLoading) {
        return <Spinner />
    }
    const cart = data?.data?.cart;
    const total = data?.data?.total;
    if (cart == null) {
        return <SorryDiv message="حدثت مشكلة الرجاء اعادة المحاولة" />
    }
    const makeOrder = async () => {
        if (address == null) {
            return alert('الرجاء اختيار عنوان أولا');
        }
        if (window.confirm("هل أنت متأكد؟") && cart != null) {
            setLoading(`make`);
            try {
                const res = await userAxios.post(`orders/make-order`, {
                    address
                });
                if (res.data.order) {
                    nav(`/orders/${res.data.order._id}`);
                }
                else {
                    refetch();
                }
            } catch (ex) {
                toast.error(ex.message);
            }
            setLoading(null);
        }
    }
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
    if (cart.length == 0) {
        return <div className=" w-full h-full flex flex-col gap-3 items-center justify-center">
            <div className="my-6 p-7 rounded-lg flex flex-col items-center justify-center">
                <img className=" w-[150px]" src="/images/no-data.png" />
                <h5>
                    !لم يتم طلب أي وجبة بعد
                </h5>
            </div>
        </div>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="col-span-1 px-4 pt-8">
                <p className="text-xl font-medium">ملخص الطلب</p>
                <p className="text-fade">
                    تحقق من العناصر الخاصة بك.
                </p>
                <div className="mt-8 space-y-3 rounded-lg bg-[color:var(--secondary)] px-2 py-4 sm:px-6">
                    {
                        cart.map((e, idx) => <div key={idx}>
                            <OrderItem deleteCartItem={deleteCartItem} order={e} />
                            {
                                idx != cart.length - 1 && <hr className=" border-gray-600" />
                            }
                        </div>)
                    }
                </div>
            </div>
            <div className="col-span-1 h-fit mt-10 bg-[color:var(--secondary)] rounded-md px-4 pt-8 lg:mt-0">
                <p className="text-xl font-bold">تأكيد العنوان</p>

                <hr className="my-4" />
                <div className="flex flex-col gap-4">
                    {
                        userStore.getState().user.user?.addresses.map((e, idx) =>
                            <UserAddressComponent seleted={address} address={e} key={idx} onClick={setAddress} />)
                    }
                    <Link to={'/settings'} className="p-4 flex hover:text-[color:var(--text)] justify-between items-center rounded-md bg-[color:var(--secondary-select)]">
                        <p className="text-md">إضافة عنوان</p>
                        <i className="fa-solid fa-circle-plus text-lg"></i>
                    </Link>
                </div>
                <hr className="mt-5" />
                <div className="flex justify-between items-center mt-6">
                    <h6 className="text-lg font-semibold">الإجمالي</h6>
                    <h6 className="text-lg font-semibold">{total} جنيه</h6>
                </div>
                <Button onClick={makeOrder} loading={loading == 'make'} disabled={loading} color={false} className="mt-4 mb-8 flex gap-2 justify-center items-center w-full rounded-md bg-gray-600 hover:bg-gray-500 transition-colors px-6 py-3 font-medium text-[color:var(--text)]">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <p>طلب الان</p>
                </Button>
            </div>
        </div>

    )
}
