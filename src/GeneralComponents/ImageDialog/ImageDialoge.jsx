
export default function ImageDialoge({ src, closeDialog }) {


    return (
        <div  onClick={() => closeDialog()} className="top-0 left-0 right-0 bottom-0 z-[9999px] absolute flex  justify-center items-center">
            <dialog
                className="mx-auto absolute"
                open={true}
               
            >
                <img
                    className="z-[9999px]"
                    src={src}
                   
                    alt="no image"
                />
            </dialog>
            <div  className="  bg-black w-full h-full"></div>
        </div>
    )
}
