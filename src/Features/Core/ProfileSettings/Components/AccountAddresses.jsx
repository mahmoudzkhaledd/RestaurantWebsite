import UserAddressComponent from "@/GeneralComponents/UserAddress/UserAddressComponent";
import Button from "@/GeneralElements/Button/Button";
import { userStore } from "@/hooks/UserRedux/UserStore";
import { useEffect, useState } from "react";
import AddAddressModal from "./AddAddressModal";
import { userAxios } from "@/Utils/UserAxios";

export default function AccountAddresses({  }) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(null);
    
    const deleteAddress = async (id) => {

        if (!id || !window.confirm("هل أنت متأكد من حذف العنوان؟")) return;
        setLoading(`delete ${id}`);

        try {
            const res = await userAxios.delete(`delete-address/${id}`);
            window.location.reload();
        } catch (ex) {

        }
        setLoading(null);
    };
    return (
        <div className="bg-[color:var(--secondary)] rounded-2xl p-4 mb-6">
            {
                showModal && <AddAddressModal closeModal={() => setShowModal(false)} isOpen={showModal} />
            }
            <h3 className="mb-4 text-xl font-bold"> العناوين</h3>
            <div className=" space-y-4">
                {
                    userStore.getState().user.user?.addresses.map((e, idx) =>
                        <UserAddressComponent onDeleteAddress={deleteAddress} loading={loading} address={e} key={idx} />)
                }
                {
                    userStore.getState().user.user?.addresses.length ==0  && <p>
                        لا يوجد عناوين بعد
                    </p>
                }
            </div>
            <div className="mt-6">
                <Button onClick={() => setShowModal(true)}>
                    اضافة عنوان
                </Button>
            </div>
        </div>
    )
}
