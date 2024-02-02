import { adminConfig } from "@/Features/Admin/AdminConfig";
import Button from "@/GeneralElements/Button/Button";
import { logOut } from "@/hooks/AdminRedux/AdminModelSlice";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function AdminModal({ isOpen, closeModal, selected }) {
    const nav = useNavigate();
    const disp = useDispatch();


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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[color:var(--secondary)] p-6 text-left align-middle  transition-all">

                                <div className="mt-2">
                                    {
                                        Object.values(adminConfig.sidebarItems).map((e, idx) =>
                                            <Link
                                                to={e.link != null ? e.link : e.name && `/admin/${e.name}`}
                                                onClick={e.action == "logout" ? () => {
                                                    disp(logOut());
                                                    window.location.href = "/admin/login";
                                                } : () => closeModal()}

                                                key={idx}>
                                                <Button
                                                    className={`mb-3 flex w-full gap-3 ${selected == e.name ? "bg-[color:var(--primary-select)]" : ""} items-center p-2 text-[color:var(--text)] rounded-lg hover:bg-[color:var(--primary)] group`}
                                                >
                                                    <i className={e.icon} />
                                                    <p>{e.title}</p>
                                                </Button>
                                            </Link>)
                                    }
                                </div>


                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
