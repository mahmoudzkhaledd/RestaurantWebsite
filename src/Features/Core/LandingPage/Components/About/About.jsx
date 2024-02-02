import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";

export default function About({ className = "" }) {


    return (
        <section id="about" className={className}>
            <div className="container flex flex-col gap-10 md:flex-row">
                <div className="flex-1">
                    <img src="https://static.vecteezy.com/system/resources/previews/022/598/687/original/tasty-beef-burger-png.png" alt="about image" className="rounded-lg" />
                </div>
                <div className="flex-1 my-auto">
                    <h4 className="mb-3">
                        ابحث عن الطعام والمشروبات، كلها في مكان واحد لتحظى بأفضل تجربة طعام.
                    </h4>
                    <div className="separator" />
                    <p className="paragraph">
                        اعثر على الطعام والمشروبات في مكان واحد لأفضل تجربة طعام لك. تمتع بألذ النكهات بمكان واحد.
                    </p>
                    <ul className="list-none grid text-[color:var(--text)] grid-cols-2 py-5 space-y-1">
                        {[
                            "أفضل الأسعار",
                            "مكونات طازجة",
                            "أفضل الخدمات",
                            "نهتم بصحتك",

                        ].map((e, idx) => <li key={idx} className="flex gap-3 items-center">
                            <i className="fa-solid fa-check text-[color:var(--primary)]" />
                            <span>{e}</span>
                        </li>)}

                    </ul>
                    <Link to="/contact" className="btn btn-primary">
                        <Button>
                            اتصل بنا
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
