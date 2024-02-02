import Button from "@/GeneralElements/Button/Button"
const data = [
    {
        title: "العنوان",
        icon: "fa-solid fa-location-dot",
        ref: "address",
    },
    {
        title: "المدينة",
        icon: "fa-solid fa-building-wheat",
        ref: "city",
    },
    {
        title: "الشارع",
        icon: "fa-solid fa-road",
        ref: "street",
    },
]
export default function UserAddressComponent({ address, loading, onDeleteAddress, onClick, seleted }) {

    if (!address) return <></>
    return (
        <div onClick={() => onClick == null ? null : onClick(address._id)} className={`${onClick && " cursor-pointer"}  bg-[color:var(--${seleted == address._id ? "primary" : "secondary-select"})] p-4 rounded-md flex justify-between `}>

            <div className="space-y-2">
                {
                    data.map((e, idx) => <div key={idx} className=" row-span-1 flex gap-2">
                        <i className={e.icon}>{"  "}</i>
                        <p>{e.title}: {address[e.ref]}</p>
                    </div>)
                }
            </div>
            <div className="">
                {
                    onDeleteAddress && <Button onClick={() => onDeleteAddress(address._id)} loading={loading == `delete ${address._id}`} disabled={loading} className=" bg-red-500 hover:bg-red-400" color={false}>
                        حذف
                    </Button>
                }
            </div>
        </div>
    )
}
