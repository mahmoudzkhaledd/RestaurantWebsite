import CheckBox from "@/GeneralElements/CheckBox/CheckBox";
import TextBox from "@/GeneralElements/TextBox/TextBox";

export default function PriceInputComponent({ title = "", name = "", priceObject, loading,showFront }) {
    const id = `${Math.random() * Math.random()}`;
    return (
        <div className='border p-4 rounded-md '>
            <div className="flex justify-between flex-wrap gap-4">
                <h6 className='flex gap-2 font-bold'>
                    <input id={id} type="radio" name={`showFront`} defaultValue={name} defaultChecked={showFront == name} />
                    <label htmlFor={id}>{title}</label>
                </h6>
                <CheckBox className="flex gap-2" defaultValue={true} defaultChecked={priceObject?.active} name={`${name}-active`} text="اظهار" />
            </div>
            <hr className='mt-2' />
            <div className='mt-3 grid md:grid-cols-2 grid-cols-1 gap-4'>
                <TextBox disabled={loading} initialValue={priceObject?.price || 0} required={true} type='number' name={`${name}-price`} placeholder='السعر' label='السعر' />
                <TextBox disabled={loading} initialValue={priceObject?.afterDiscount || 0} required={true} type='number' name={`${name}-afterDiscount`} placeholder='بعد الخصم' label='بعد الخصم' />
            </div>
        </div>
    )
}
