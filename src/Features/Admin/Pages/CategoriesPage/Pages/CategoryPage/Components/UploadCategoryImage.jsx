import { adminConfig } from "@/Features/Admin/AdminConfig";
import ImageComponent from "@/Features/Admin/GeneralComponents/ImageComponent/ImageComponent";
import UploadImage from "@/Features/Admin/GeneralComponents/UploadImage/UploadImage";
import ProgressBar from "@/GeneralComponents/ProgressBar/ProgressBar";
import Button from "@/GeneralElements/Button/Button";
import { adminAxios } from "@/Utils/AdminAxios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UploadCategoryImage({ category,refetch }) {
    const [loading, setLoading] = useState(null);
    const [percentage, setUploadPercentage] = useState(null);
    const deleteImage = async (id) => {

        if (!id || !window.confirm('هل أنت متأكد من حذف الصورة؟')) return;
        setLoading(`delete ${id}`)
        try {
            const res = await adminAxios.delete(`/images/${id}?categoryId=${category._id}`);
            refetch();
        } catch (ex) {

        }
        setLoading(null)
    }
    const addImage = async (e) => {

        e.preventDefault();
        setLoading('thumbnail');
        try {
            const form = document.getElementById(`frm-upload-thumbnail-category`);

            if (category == null) return setLoading(null);

            const data = new FormData(form)

            const file = data.get('file');

            if (file == null || file.size == 0) return setLoading(null);
            if (!adminConfig.supportedImages.includes(file.type)) {
                setLoading(null);
                return toast.error("صيغة الملف غير مسموح بها")
            }
            if (file.size / 1000000 > 1) {
                toast.error("من فضلك اختر ملف أقل من 1MB");
                return setLoading(null);
            }


            setUploadPercentage({
                name: file.name,
                progress: 0,
            });
            const options = {
                onUploadProgress: event => {
                    const { loaded, total } = event;
                    let percent = Math.floor((loaded * 100) / total);
                    if (percent < 100) {
                        setUploadPercentage({
                            name: file.originalname,
                            progress: percent,
                        });
                    }
                }
            }
            const res = await adminAxios.post(`/images?categoryId=${category?._id}`, data, options);
            document.getElementsByName('file').forEach(e => e.value = null)
            setUploadPercentage(null);
            refetch();
        } catch (ex) {
            if (ex?.response?.data?.msg == null) {
                toast.error(`${ex.message}`)
            }
        }
        setLoading(null);
    }
    return (
        <form id="frm-upload-thumbnail-category" className="mb-6" onSubmit={(e) => addImage(e)}>
            <div className="flex justify-between  mb-5 flex-wrap items-center">
                <h6 >الصورة المصغرة</h6>
                <Button loading={loading == 'thumbnail'} disabled={loading}>رفع</Button>
            </div>

            <div className="flex flex-col mb-4">
                {
                    category?.image == null ?
                        <UploadImage name={"file"} id="image-picker" />
                        : <ImageComponent loading={loading} text="الصورة المصغرة" image={category?.image} deleteImage={deleteImage} />
                }
                {
                    loading == 'thumbnail' && <ProgressBar showValue={true} value={percentage?.progress || 0} />
                }
            </div>
        </form>
    )
}
