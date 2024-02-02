
export default function UploadImage({ onChange, id, name, className }) {


    return (
        <div className={`font-[sans-serif] ${className} `}>
            <input
                id={id}
                onChange={onChange}
                multiple={false}
                name={name}
                accept=".png, .jpg, .jpeg"
                type="file"
                className="w-full  text-sm bg-[color:var(--secondary-select)]  file:cursor-pointer cursor-pointer file:border-0 file:py-2.5 file:px-4 file:bg-[color:var(--secondary-select)] file:text-[color:var(--text)] file:hover:bg-[color:var(--primary)]  rounded"
            />

        </div>
    )
}
