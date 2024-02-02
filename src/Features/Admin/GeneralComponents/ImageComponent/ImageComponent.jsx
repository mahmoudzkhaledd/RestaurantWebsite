import Button from "@/GeneralElements/Button/Button";
import { Link } from "react-router-dom";

export default function ImageComponent({ className, image, text, loading, deleteImage }) {


    return (
        <div className={`${className} flex flex-row items-center justify-between rounded-md select-none w-full bg-[color:var(--secondary-select)] p-4`}><Link
            to={image?.url}
        >
            {text}
        </Link>
            <Button
                disabled={loading}
                loading={loading?.startsWith('delete ') && loading?.split(' ')[1] == image?._id}
                onClick={() => deleteImage(image._id)}
                className=" bg-red-500 hover:bg-red-400">حذف</Button>
        </div>
    )
}
