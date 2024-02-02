import { Link } from "react-router-dom";
function getValueByKey(key, obj, replacement) {
    return (Array.isArray(key) && key.length > 1 && obj[key[0]] != null)
        ? getValueByKey(key.slice(1), obj[key[0]])
        : (obj[key] || replacement);
}
export default function DataTable({ data, header,className="" }) {


    return (
        <div className={`${className} relative overflow-x-auto  sm:rounded-lg`}>
            <table className="w-100 text-sm text-left rtl:text-right  ">
                <thead className="text-xs text-fade uppercase bg-[color:var(--secondary)] ">
                    <tr>
                        {
                            header.map((e, idx) => <th key={idx} scope="col" className="px-6 py-3">
                                {e.title}
                            </th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e) => <tr key={e._id} className="bg-[color:var(--secondary)] border-b   hover:bg-[color:var(--secondary-select)] ">

                            {
                                header.map((p, idx) => <td key={idx}
                                    style={{ maxWidth: "200px" }}
                                    className="px-6 py-4 overflow-hidden overflow-ellipsis font-medium whitespace-nowrap "
                                >
                                    {p.link ? <Link className="font-medium text-[color:var(--primary)] hover:underline" to={p.link + e[p.linkRef]}>{p.title}</Link> :
                                        !p.date ? (p.boolTrue || p.boolFalse) ? (getValueByKey(p.ref, e, p.replacement) ? p.boolTrue : p.boolFalse) : getValueByKey(p.ref, e, p.replacement)

                                            : getValueByKey(p.ref, e, p.replacement).split('T')[0]}

                                </td>)
                            }
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}
