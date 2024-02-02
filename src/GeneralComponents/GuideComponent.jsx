import { useState } from "react"

export default function GuideComponent({ guide, children, className = "" }) {
    const [isOpen, setOpen] = useState(true);

    return (
        <div className={`bg-[color:var(--secondary)] w-full ${className} p-4 rounded-lg flex flex-col `}>
            <div className="flex gap-3 items-center  justify-between">
                <div className="flex gap-3 items-center ">
                    <i className="fa-solid fa-lightbulb text-2xl text-[color:var(--primary)]"></i>
                    <h5 className="font-bold p-0 m-0 ">{guide?.title}</h5>
                </div>
                <button
                    className=" text-lg w-[35px] h-[35px] text-black text-center bg-white rounded-full flex justify-center items-center"
                    onClick={() => setOpen(!isOpen)}>

                    <i className={`fa-solid ${isOpen ? "fa-arrow-up" : "fa-arrow-down"}`}></i>
                </button>
            </div>
            {
                isOpen && <>
                    <hr className="mb-5 border-gray-200 mt-3" />
                    <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} bg-[color:var(--secondary-select)] p-3  rounded-md `}>
                        {
                            children || <p>{guide?.description}</p>
                        }
                    </div>
                </>
            }
        </div>
    )
}
