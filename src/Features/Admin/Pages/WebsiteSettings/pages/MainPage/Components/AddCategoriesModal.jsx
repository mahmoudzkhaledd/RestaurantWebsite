
import MealPriceComponent from '@/GeneralComponents/MealPriceComponent/MealPriceComponent';
import Button from '@/GeneralElements/Button/Button';
import TextBox from '@/GeneralElements/TextBox/TextBox';
import { adminAxios } from '@/Utils/AdminAxios';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useRef, useState } from 'react'


export default function AddLandingPageCategoriesModal({ closeModal, show, refetch }) {


    const [itemLoaded, setitemLoaded] = useState(null);
    const [loading, setLoading] = useState(null);
    const categoryIdRef = useRef();
    const addMeal = async () => {
        if (itemLoaded == null || !window.confirm("هل أنت متأكد من اضافة الوجبة؟")) return;
        setLoading('save-changes');
        try {
            const res = await adminAxios.post('/configs/add-category-landing-page', {
                categoryId: itemLoaded._id,
            });
            refetch();
            closeModal();
        } catch (ex) { }
        setLoading(null);
    };
    const getItem = async () => {
        const mealId = categoryIdRef.current.value;
        if (mealId.length != 24) {
            return alert("يجب ادخال كود الوجبة بشكل صحيح");
        }
        setLoading('get-item');
        try {
            const res = await adminAxios.get(`/categories/${mealId}`);
            const category = res.data.category;
            setitemLoaded(category)
        } catch (ex) { }
        setLoading(null);
    };
    return (
        <Transition appear show={show} as={Fragment}>
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

                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[color:var(--secondary)]  text-right align-middle  transition-all">
                                <form id='frm-edit-item-order' onSubmit={(e) => e.preventDefault()} className="p-7 w-full space-y-5 ">
                                    <h5 className=' font-bold mb-5'> إضافة وجبة</h5>
                                    <div className='flex items-end gap-4 w-full justify-between'>
                                        <TextBox reference={categoryIdRef} name='mealId' disabled={loading} initialValue={itemLoaded?._id} className='flex-1' maxLength={24} placeholder='كود التصنيف' label='كود التصنيف' />
                                        <Button onClick={getItem} disabled={loading} loading={loading == 'get-item'} className=' h-[45px]'>
                                            <i className="fa-solid fa-check-circle"></i>
                                        </Button>
                                    </div>
                                    {
                                        itemLoaded && 
                                        <>
                                            <TextBox backgroundColor=" bg-gray-500" disabled={true} onChanged={() => { }} value={itemLoaded?.name || ""} className='flex-1 ' placeholder="اسم التصنيف" label="اسم التصنيف" />
                                            <div className='flex'>
                                                <Button onClick={addMeal} loading={loading == 'save-changes'} disabled={loading} className='mr-auto'>حفظ</Button>
                                            </div>
                                        </>
                                    }
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

