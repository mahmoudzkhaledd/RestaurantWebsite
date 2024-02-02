import { useState } from "react"

export default function OrderCounter({ className, disabled, name }) {
    const [count, setCount] = useState(1);
    const setValue = (e) => {
        let num = parseInt(e.target.value) || 0;
        if (num < 1) {
            num = 1;
        }
        setCount(num)
    }
    const setCountNum = (e) => {
        if (!e) {
            if (count - 1 < 1) {
                return;
            }
            setCount(count - 1);
            return;
        }
        setCount(count + 1);
    }
    return (
        <div className={`${className} relative flex items-center h-full`}>
            <button
                onClick={() => setCountNum(false)}
                type="button"
                id="decrement-button"
                data-input-counter-decrement="quantity-input"
                className="bg-gray-100  hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none"
            >
                <svg
                    className="w-3 h-3 text-gray-900 dark:text-[color:var(--text)]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M1 1h16"
                    />
                </svg>
            </button>
            <input
                name={name}
                min={1}
                disabled={disabled}
                type="text"
                id="quantity-input"
                data-input-counter=""
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 focus:outline-none border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm   block w-full py-2.5 "
                placeholder={0}
                value={count}
                style={{
                    WebkitAppearance: "none",
                    "margin": 0,
                }}
                onChange={setValue}
                required=""
            />
            <button
                onClick={() => setCountNum(true)}
                type="button"
                id="increment-button"
                data-input-counter-increment="quantity-input"
                className="bg-gray-100    hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11   focus:ring-2 focus:outline-none"
            >
                <svg
                    className="w-3 h-3 text-gray-900 dark:text-[color:var(--text)]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 1v16M1 9h16"
                    />
                </svg>
            </button>
        </div>

    )
}
