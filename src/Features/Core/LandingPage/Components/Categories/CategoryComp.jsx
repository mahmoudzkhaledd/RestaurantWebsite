import { Link } from 'react-router-dom'
import style from './style.module.css'

export default function CategoryComp({ id, bgColor = "#ee890f", image = "", diagonalColor = "", title = "", description = "", btn = "" }) {


    return (
        <Link to={`/categories/${id}`}
            style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${image}')`
            }}
            className='relative w-full h-full flex-col items-center  rounded-lg overflow-hidden'>
            
            <div className={`px-10 py-4 w-full h-full flex gap-4  md:w-fit md:flex-1 relative`}>

                <div className='my-auto'>
                    <div className="mb-2">
                        <h5 className=' text-xl font-bold' >{title}</h5>
                        <p className="text-sm">
                            {description}
                        </p>
                    </div>

                </div>

            </div>
        </Link>
    )
}
