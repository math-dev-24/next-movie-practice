import React from 'react';

const NotFound = () => {
    return (
        <div className="border-2 rounded-lg border-red-500 p-10 container mx-auto max-w-2xl my-10 flex flex-col items-center justify-center bg-white">
            <h1 className="text-2xl font-bold text-center">404 Not Found</h1>
            <p>La page que vous recherchez n&#39;existe pas.</p>
        </div>
    )
}

export default NotFound;