import { useQuery } from "react-query";
import { webConfig } from "../../../Utils/WebConfigs";
import { userAxios } from "@/Utils/UserAxios";
import { Link, useParams } from "react-router-dom";
import Spinner from "@/GeneralElements/Spinner/Spinner";
import SorryDiv from "@/GeneralComponents/SorryDiv/SorryDiv";
import moment from "moment";
import Button from "@/GeneralElements/Button/Button";
import { useState } from "react";
import OrderModal from "@/GeneralComponents/OrderModal/OrderModal";
import OrderItem from "../Checkout/Checkout/MealItem";
import UserAddressComponent from "@/GeneralComponents/UserAddress/UserAddressComponent";

function getStatusNumber(status) {
    const arr = (status != "refused" && status != "canceled") ? webConfig.orderStages : status == "refused" ? webConfig.refusedStages : webConfig.canceledStages;
    for (let i = 0; i < (arr).length; i++) {
        if (arr[i].state == status) {
            return i;
        }
    }
    return arr.length;
}
export default function OrderPage({ }) {
    const params = useParams();
    const [loading, setLoading] = useState(null);
    const [showModal, setModal] = useState(false);

    const { isLoading, error, data, refetch } = useQuery(
        `get-order-${params.id}`,
        () => userAxios.get(`orders/${params.id}`),
        {
            refetchOnWindowFocus: false,
            enabled: params.id != null && params.id.length == 24,
            retry: 0,
        },
    );
    if (isLoading) {
        return <Spinner />;
    }
    if (error || data == null || data.data == null || data.data.order == null) {
        return <SorryDiv message="لا يمكن ايجاد هذا الطلب, الرجاء المحاولة مع طلب اخر" />
    }
    const order = data.data.order;
    const statusNumber = getStatusNumber(order.status || "");
    const cancelOrder = async () => {
        if (window.confirm("هل أنت متأكد من الغاء الطلب؟")) {
            setLoading('cancel');
            try {
                const res = await userAxios.post(`/orders/${order._id}/cancel`);
                refetch();
            } catch (ex) {
            }
            setLoading(null);
        }
    }

    return (
        <div >
            <div className=" grid grid-cols-2 gap-6 mb-6">
                <div>
                    <h5>طلب رقم #{order.number}</h5>
                    <br />

                    <div className="bg-[color:var(--secondary)] space-y-4  rounded-2xl p-4 mb-6">
                        <h3 className="mb-4 text-xl font-bold">معلومات عن الطلب</h3>
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <dt className="text-sm font-medium ">كود الطلب</dt>
                                <dd className="text-sm font-semibold text-fade">
                                    {order._id}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium ">رقم الطلب</dt>
                                <dd className="text-sm font-semibold text-fade">
                                    {order.number}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium ">تاريخ الإنشاء</dt>
                                <dd className="text-sm font-semibold text-fade">
                                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                                </dd>
                            </div>

                        </dl>
                        <div className=" space-y-2">
                            <h6 className=" font-bold">عنوان الطلب</h6>
                            <UserAddressComponent address={order.address} />
                            {
                                order.status == "refused" && <>
                                    <br />
                                    <div
                                        id="alert-2"
                                        className="flex items-center p-4 mb-4  rounded-lg bg-red-500 "
                                        role="alert"
                                    >
                                        <i className="fa-solid fa-circle-exclamation text-2xl "></i>
                                        <span className="sr-only"></span>
                                        <div className="ms-3 text-sm font-medium inline-block w-5/6">
                                            <h6 className=" mb-1 font-bold">سبب الرفض</h6>

                                            <p className=" break-words">{order.refuseReason || ""}</p>
                                        </div>

                                    </div>

                                </>
                            }

                            {
                                (order.status == "pending" || order.status == 'canceled' || order.status == 'accepted') && <>
                                    <br />
                                    <div className="flex flex-row gap-4">
                                        <Button loading={loading == 'cancel'} disabled={loading != null} onClick={cancelOrder}  >
                                            {order.status == 'canceled' ? "تفعيل الطلب" : "الغاء الطلب"}
                                        </Button>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className=" h-fit rounded-md bg-[color:var(--secondary)] p-5 px-6 space-y-4">
                    <h6 className=" font-bold mb-4 text-lg">الوجبات المطلوبة</h6>
                    {
                        order.orders.map((e, idx) => <OrderItem order={e} key={idx} />)
                    }
                    <hr className="my-4 border-gray-300"/>
                    <div className="flex justify-between items-center">
                        <p className=" font-bold">المبلغ الذي سيتم دفعه</p>
                        <p className=" font-bold">{data.data.total} جنيه</p>
                    </div>
                </div>
            </div>
            <h5 className=" font-bold mb-5">حالة الطلب</h5>
            <ol className="items-start sm:flex list-none mb-5">
                {
                    ((order.status != "refused" && order.status != "canceled") ? webConfig.orderStages : order.status == "refused" ? webConfig.refusedStages : webConfig.canceledStages)
                        .map((s, idx) => <li key={idx} className="relative mb-6 sm:mb-0 flex-1 flex flex-col justify-center items-center text-center lg:block lg:text-start">
                            <div className="flex items-center">
                                <div className={`z-10 flex flex-col items-center justify-center  w-12 h-12 bg-[color:${idx <= statusNumber ? "var(--primary)" : "var(--secondary)"}] rounded-full ring-0 ring-white  sm:ring-2  shrink-0`}>
                                    <i className={s.icon}></i>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 " />
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-fade ">
                                    {s.name}
                                </h3>
                                <p className="text-base font-normal  ">
                                    {s.description}
                                </p>
                            </div>
                        </li>)
                }


            </ol>
        </div>

    )
}
