
export default function RouteNotFound({ }) {
    return (
        <section className=" ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 ">
                        404
                    </h1>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-200 md:text-4xl ">
                        لا يمكن العثور على هذا الرابط
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 ">

                        لا يمكننا العثور على تلك الصفحة. يرجى الدخول على الصفحة الرئيسية.{" "}
                    </p>
                    
                </div>
            </div>
        </section>
    )
}
