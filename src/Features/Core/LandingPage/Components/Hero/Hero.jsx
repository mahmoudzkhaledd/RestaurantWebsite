import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";


export default function Hero({ className = "" }) {


    return (
        <section id="home" className={className}>
            <div className="container flex flex-col items-center gap-10 md:flex-row">
                <div className="mx-auto md:basis-1/2 lg:basis-2/5 animate-movingY">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/022/598/687/original/tasty-beef-burger-png.png"
                        alt="home image"
                        className="w-60 md:w-full"
                    />
                </div>
                <div className=" text-center md:basis-1/2 md:text-start lg:basis-3/5">
                    <h2 className="font-bold text-2xl lg:text-5xl  mb-5">
                        تذوق تميز الطهي في برجر!
                    </h2>
                    <div className="bg-[color:var(--primary)] w-[200px] h-[3px] rounded-md mb-4 mx-auto md:mx-0" />
                    <p className="text-sm text-fade">
                        استمتع بتجربة فريدة ولذيذة معنا في برجر، حيث يتم استخدام أفضل المكونات الطازجة ويجتمع الإبداع الطهو لتقديم أشهى الأطباق. يفتخر فريقنا بتقديم وجبات لذيذة تتسم بالجودة والتنوع، مما يخلق تجربة تناول طعام استثنائية لكل زائر.
                        اكتشف قائمتنا المتنوعة التي تشمل المأكولات البحرية الطازجة، واللحوم الشهية، والخيارات اللذيذة للنباتيين. نحن هنا لنلبي جميع توقعاتك الغذائية ونقدم لك تجربة تذوق فريدة تجمع بين النكهات الرائعة والجو المميز لدينا.
                    </p>
                    <div className="text-base flex items-center justify-center gap-4 py-10 md:justify-start md:gap-20">
                        <div className="text-center text-[color:var(--text)]">
                            <i className="fa-solid fa-utensils  text-4xl" />
                            <br />
                            لذيذ
                        </div>
                        <div className="text-center text-[color:var(--text)]">
                            <i className="fa-solid fa-droplet  text-4xl" />
                            <br />
                            طازج
                        </div>
                        <div className="text-center text-[color:var(--text)]">
                            <i className="fa-brands fa-envira  text-4xl text-[color:var(--primary)]" />
                            <br />
                            طبيعي
                        </div>
                    </div>

                    <Link to={'/menu'}>
                        <Button className="mt-4 text-lg">
                            ابدأ الان
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
