import Button from '@/GeneralElements/Button/Button';
import './style.css';
import { Link } from 'react-router-dom';

export default function CustomHeader({ linkTo, image, data,className }) {
    return (
        <section
            style={{
                backgroundSize: "cover",
                background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${image})`,
                backgroundPosition: "center ",
            }}
            id='landing-header' 
            className={`${className} p-5 relative h-[250px] flex flex-col items-center w-full overflow-hidden rounded-lg text-center bg-[color:var(--secondary)] mb-7`}>
            
            <div className=' max-w-[800px] my-auto text-center flex flex-col items-center justify-center '>
                <h1 className='text-3xl font-bold text-center'> {data?.title}</h1>
                <h1 className='text-lg font-normal text-gray-400 mt-5 text-center'> {data?.subTitle}</h1>
                {linkTo && <Link to={linkTo}>
                    <Button className="mt-5" text="تصفح الخدمات" faicon="fa-solid fa-circle-arrow-left" />
                </Link>}
            </div>
            
        </section>
    )
}
