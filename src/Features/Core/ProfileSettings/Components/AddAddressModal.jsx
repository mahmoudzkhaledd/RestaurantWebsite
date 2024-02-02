import Button from "@/GeneralElements/Button/Button";
import TextBox from "@/GeneralElements/TextBox/TextBox";
import { userAxios } from "@/Utils/UserAxios";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
    address: z.string().min(3, { message: "يجب أن يكون العنوان 3 أحرف على أقل" }).max(300, { message: "يجب أن يكون العنوان 300 حرف بحد اقصى" }),
    city: z.string().min(3, { message: "يجب أن تكون المدينة  3 أحرف على أقل" }).max(300, { message: "يجب أن تكون المدينة 300 حرف بحد اقصى" }),
    street: z.string().min(3, { message: "يجب أن يكون الشارع  3 أحرف على أقل" }).max(300, { message: "يجب أن يكون الشارع 300 حرف بحد اقصى" }),
});
export default function AddAddressModal({ isOpen, closeModal }) {
    const [loading, setLoading] = useState(null);
    const addAddress = async (e) => {
        e.preventDefault();
        const obj = Object.fromEntries(new FormData(document.getElementById('frm-add-address')).entries());
        setLoading(true);

        try {
            const model = await schema.parseAsync(obj);

            const res = await userAxios.post('add-new-address', {
                address: obj.address,
                city: obj.city,
                street: obj.street,
            });
            window.location.reload();
        } catch (ex) {
            if (ex.issues != null && ex.issues.length != 0) {
                toast.error(ex.issues[0].message);
            } else {
                toast.error(ex.message);
            }
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
                            <Dialog.Panel className="w-full max-w-md  text-right transform overflow-hidden rounded-2xl bg-[color:var(--secondary)] p-6 align-middle  transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 "
                                >
                                    طلب الخدمة
                                </Dialog.Title>
                                <form onSubmit={addAddress} className="space-y-5" id="frm-add-address">
                                    <TextBox name="address" disabled={loading} label="العنوان" placeholder="العنوان" />
                                    <TextBox name="city" disabled={loading} label="المدينة" placeholder="المدينة" />
                                    <TextBox name="street" disabled={loading} label="الشارع" placeholder="الشارع" />
                                    <div className="flex flex-row justify-between items-center">
                                        <Button
                                            onClick={addAddress}
                                            loading={loading}
                                            disabled={loading}
                                            className="text-center text-base font-bold text-[color:var(--text)]">
                                            اضافة
                                        </Button>
                                    </div>
                                </form>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
