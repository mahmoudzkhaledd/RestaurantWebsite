
import MealPriceComponent from '@/GeneralComponents/MealPriceComponent/MealPriceComponent';
import Button from '@/GeneralElements/Button/Button';
import TextBox from '@/GeneralElements/TextBox/TextBox';
import { adminAxios } from '@/Utils/AdminAxios';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

const schema = z.object({
    mealId: z.string().length(24, "يجب ادخال كود الوجبة بشكل صحيح"),
    mealNumber: z.number().min(1, "يجب اختيار وجبة واحدة على الأقل"),
    size: z.enum(['smallSize', 'mediumSize', 'largeSize'], {
        errorMap: (issue, _ctx) => {
            return { message: 'من فضلك ادخل حجم الوجبة' };
        },
    }),
    _id: z.string().nullable().optional(),
})
export default function EditOrderItemModal({ closeModal, itemEdit }) {
    const param = useParams();
    const edit = (typeof itemEdit != 'string');
    const [itemLoaded, setitemLoaded] = useState(edit ? itemEdit : null);

    const [loading, setLoading] = useState(null);
    const mealIdRef = useRef();
    const editItem = async (e) => {
        e.preventDefault();
        if (!param.id || !window.confirm('هل أنت متأكد من حفظ البيانات؟')) return;
        const obj = Object.fromEntries(new FormData(document.getElementById('frm-edit-item-order')));
        obj.mealNumber = Number(obj.mealNumber);
        obj._id = itemEdit?._id;
        try {
            const model = await schema.parseAsync(obj);
            const res = await adminAxios.put(`/orders/${param.id}`, {
                item: model,
            });
            window.location.reload();
        } catch (ex) {
            if (ex.errors != null && ex.errors.length > 0) {
                toast.error(ex.errors[0].message);
            }
        }
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
            setitemLoaded({
                mealId: meal,
                mealNumber: 1,
                price: null,
                size: null,
            })
        } catch (ex) {

        }
        setLoading(null);
    };
    return (
        <Transition appear show={itemEdit != null} as={Fragment}>
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
                                    <h5 className=' font-bold mb-5'>تعديل الطلب</h5>
                                    <div className='flex items-end gap-4 w-full justify-between'>
                                        <TextBox reference={mealIdRef} name='mealId' disabled={loading} initialValue={itemLoaded?.mealId?._id} className='flex-1' maxLength={24} placeholder='كود الوجبة' label='كود الوجبة' />
                                        <Button onClick={getItem} disabled={loading} loading={loading == 'get-item'} className=' h-[45px]'>
                                            <i className="fa-solid fa-check-circle"></i>
                                        </Button>
                                    </div>
                                    {
                                        itemLoaded && <>
                                            <TextBox backgroundColor=" bg-gray-500"  disabled={true} onChanged={() => { }} value={itemLoaded?.mealId?.name || ""} className='flex-1 ' placeholder="اسم الوجبة" label="اسم الوجبة" />
                                            <TextBox minLength={1} name='mealNumber' disabled={loading} type='number' initialValue={itemLoaded?.mealNumber} className='flex-1 ' maxLength={24} placeholder="عدد الوجبات" label="عدد الوجبات" />
                                            <div className='space-y-4'>
                                                <h6 className=' text-sm mb-5'>الحجم </h6>
                                                <MealPriceComponent chosen={itemLoaded?.size} name={'smallSize'} selected={itemLoaded?.size == 'smallSize'} title='الحجم الصغير' priceObj={itemLoaded?.mealId?.smallSize?.active == true ? itemLoaded?.mealId?.smallSize : null} />
                                                <MealPriceComponent chosen={itemLoaded?.size} name={'mediumSize'} selected={itemLoaded?.size == 'mediumSize'} title='الحجم المتوسط' priceObj={itemLoaded?.mealId?.mediumSize?.active == true ? itemLoaded?.mealId?.mediumSize : null} />
                                                <MealPriceComponent chosen={itemLoaded?.size} name={'largeSize'} selected={itemLoaded?.size == 'largeSize'} title='الحجم الكبير' priceObj={itemLoaded?.mealId?.largeSize?.active == true ? itemLoaded?.mealId?.largeSize : null} />
                                            </div>
                                            <div className='flex'>
                                                <Button onClick={editItem} loading={loading == 'save-changes'} disabled={loading} className='mr-auto'>حفظ</Button>
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
