import { configs } from "../../CoreTexts"
export default function ContactUsPage({ }) {


    return (
        <section className="bg-[color:var(--secondary)] rounded-md ">
            <div className="container px-6 py-12 mx-auto">
                <div>
                    <h1 className="mt-2 text-2xl font-semibold  md:text-3xl ">
                        {configs.contactUs.title}
                    </h1>
                    <p className="mt-3 text-fade ">
                        {configs.contactUs.subTitle}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-12 mt-10 md:grid-cols-2 lg:grid-cols-3">
                    {
                        configs.contactUs.points.map((e, idx) => <div key={idx}>
                            <span className="flex flex-col items-center justify-center w-12 h-12 text-[color:var(--text-invert)] rounded-full bg-white ">
                                <i className={`${e.icon} text-lg`}></i>
                            </span>
                            <h2 className="mt-4 text-lg font-medium  ">
                                {e.title}
                            </h2>
                            <p className="mt-2 text-fade ">
                                {e.subTitle}
                            </p>
                            <p className="mt-2 text-fade ">
                                {e.data}
                            </p>
                        </div>)
                    }

                </div>
            </div>
        </section>

    )
}
