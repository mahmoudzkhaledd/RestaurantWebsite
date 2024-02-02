import DiscountComponent from "./DiscountComponent";

export default function Discounts({ className = "" }) {


    return (
        <section id="promo" className={className}>
            <div className="container flex flex-col gap-5 lg:gap-5">

                <DiscountComponent />
                <DiscountComponent reverse={true} />

            </div>
        </section>
    )
}
