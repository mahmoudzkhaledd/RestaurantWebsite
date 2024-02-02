
export default  function CategoryComponent({ category, selected }) {

    return (
        <li className="w-full border-b border-gray-200 rounded-t-lg ">
            <div  className="flex items-center ps-3">
                <input
                    id={category._id}
                    type="checkbox"
                    name={`categories[${category._id}]`}
                    defaultValue={category._id}
                    defaultChecked={selected == true}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label
                    htmlFor={category._id}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900">
                    {category.name}
                </label>
            </div>
        </li>

    )
}
