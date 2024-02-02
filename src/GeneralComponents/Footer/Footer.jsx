import { configs } from "@/Features/Core/CoreTexts"
export default function Footer({ }) {
    return (


        <footer className="bg-[color:var(--secondary)] rounded-lg shadow  mt-10 ">
            <div className="w-full mx-auto p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-fade sm:text-center ">
                    © 2023 {configs?.companyDetails?.name}. كل الحقوق محفوظة.
                </span>
                <ul className="list-none flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                            المزيد عنا
                        </a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">
                        سياسة الخصوصية
                        </a>
                    </li>
                   
                    <li>
                        <a href="#" className="hover:underline">
                            إتصل بنا
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
