
import MealPriceComponent from '@/GeneralComponents/MealPriceComponent/MealPriceComponent';
import Button from '@/GeneralElements/Button/Button';
import TextBox from '@/GeneralElements/TextBox/TextBox';
import { adminAxios } from '@/Utils/AdminAxios';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useRef, useState } from 'react'

export default function AddLandingPageMealsModal({ closeModal, show, refetch }) {


    const [itemLoaded, setitemLoaded] = useState(null);
    const [loading, setLoading] = useState(null);
    const mealIdRef = useRef();
    const addMeal = async () => {
        if (itemLoaded == null || !window.confirm("هل أنت متأكد من اضافة الوجبة؟")) return;
        setLoading('save-changes');
        try {
            const res = await adminAxios.post('/configs/add-meal-landing-page', {
                mealId: itemLoaded._id,
            });
            refetch();
            closeModal();
        } catch (ex) { }
        setLoading(null);
    };
    const getItem = async () => {
        const mealId = mealIdRef.current.value;
        if (mealId.length != 24) {
            return alert("يجب ادخال كود الوجبة بشكل صحيح");
        }
        setLoading('get-item');
        try {
            const res = await adminAxios.get(`/meals/${mealId}?sizes=true&categories=false&images=false&thumbnailUrl=false`);
            const meal = res.data.meal;
            setitemLoaded(meal)
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
                                        <TextBox reference={mealIdRef} name='mealId' disabled={loading} initialValue={itemLoaded?._id} className='flex-1' maxLength={24} placeholder='كود الوجبة' label='كود الوجبة' />
                                        <Button onClick={getItem} disabled={loading} loading={loading == 'get-item'} className=' h-[45px]'>
                                            <i className="fa-solid fa-check-circle"></i>
                                        </Button>
                                    </div>
                                    {
                                        itemLoaded && <>
                                            <TextBox backgroundColor=" bg-gray-500" disabled={true} onChanged={() => { }} value={itemLoaded?.name || ""} className='flex-1 ' placeholder="اسم الوجبة" label="اسم الوجبة" />
                                            <div className='space-y-4'>
                                                <h6 className=' text-sm mb-5'>الحجم </h6>

                                                <MealPriceComponent showSelect={false} chosen={itemLoaded?.size} name={'smallSize'} selected={itemLoaded?.size == 'smallSize'} title='الحجم الصغير' priceObj={itemLoaded?.smallSize?.active == true ? itemLoaded?.smallSize : null} />
                                                <MealPriceComponent showSelect={false} chosen={itemLoaded?.size} name={'mediumSize'} selected={itemLoaded?.size == 'mediumSize'} title='الحجم المتوسط' priceObj={itemLoaded?.mediumSize?.active == true ? itemLoaded?.mediumSize : null} />
                                                <MealPriceComponent showSelect={false} chosen={itemLoaded?.size} name={'largeSize'} selected={itemLoaded?.size == 'largeSize'} title='الحجم الكبير' priceObj={itemLoaded?.largeSize?.active == true ? itemLoaded?.largeSize : null} />
                                            </div>
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

