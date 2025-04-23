import React from "react";


const Loader = () => {
    return (
        <div className="w-full h-full border rounded border-gray-200 py-8 px-2 my-6 flex items-center justify-center">
                <div
                    className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    )
}

export default Loader;