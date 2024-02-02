import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function OrderModal({ order, isOpen, closeModal,refetch, meal, editMode }) {
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const orderMeal = async () => {
        setLoading(true);
        try {
            const notes = document.getElementById('notes').value;
            const res = (editMode && order != null) ?
                await userAxios.put(`/orders/${order._id}`, { notes: notes || "" }) :
                await userAxios.post(`/Meals/${Meal._id}/order`, { notes: notes || "" });
            if (res.data.order != null ) {
                if(refetch) refetch();
                else nav(`/orders/${res.data.order._id}`);
                closeModal();

            }
        } catch (ex) {
            toast.error(ex.message);
        }
        setLoading(false);
    }
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md text-right transform overflow-hidden rounded-2xl bg-[color:var(--secondary)] p-6 align-middle  transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    طلب الخدمة
                                </Dialog.Title>

                                <TextBox initialValue={order?.notes} id={"notes"} disabled={loading} maxLength={2000} className=" my-8" area={true} placeholder="ملاحظات" label="ملاحظات" />
                                <div className="flex flex-row justify-between items-center">
                                    <p>
                                        {Meal.price + " جنية "}
                                    </p>
                                    <Button
                                        onClick={orderMeal}
                                        loading={loading}
                                        disabled={loading}
                                        className="bg-gray-900 text-center text-base font-bold text-[color:var(--text)] hover:bg-gray-800 px-12 "
                                        text={editMode ? "تعديل" : "طلب"} />
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
