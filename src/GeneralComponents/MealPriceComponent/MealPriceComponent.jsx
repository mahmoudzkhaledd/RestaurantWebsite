
import PriceComponent from "@/GeneralComponents/PriceComponent/PriceComponent";
export default function MealPriceComponent({ showSelect, priceObj, title = "", className = "", showFront, selected, name, chosen }) {
    if (priceObj == null) {
        return <></>
    }
    const id = `${Math.random()}`
    return <div className={`${className} border p-4 ${chosen == name && " bg-[color:var(--primary)]"} rounded-lg flex flex-row justify-between items-center gap-4 flex-wrap`}>
        <div className="flex gap-2">
            {
                showSelect != false && <input required={true} id={id} name="size" defaultChecked={selected} defaultValue={name} type="radio" />
            }
            <div className="flex items-center justify-center gap-2 text-md">
                {
                    showFront && <i className="fa-solid fa-circle-check" />
                }
                <label htmlFor={id} className="font-bold">{title}</label>
            </div>
        </div>
        <PriceComponent priceObj={priceObj} />

    </div>
}