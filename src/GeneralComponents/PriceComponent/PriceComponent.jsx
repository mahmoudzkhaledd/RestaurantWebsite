
export default function PriceComponent({ priceObj, className = "", title, }) {


    return (
        <>
            {
                <div className={`flex gap-2 items-center ${className}`}>
                    <p>{title}</p>
                    {
                        (priceObj?.afterDiscount || 0) > 0 ?
                            <>
                                <strong className="text-2xl text-inherit">{priceObj?.afterDiscount}$</strong>
                                <del><p className="text-xl text-inherit">{priceObj?.price}$</p></del>
                            </> : <p className="text-2xl text-inherit" >{priceObj?.price}$</p>
                    }
                </div>
            }
        </>
    )
}
