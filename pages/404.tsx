import Link from "next/link";
import React from "react";

const Error = () => {
    return (
        <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
            <div className="w-full lg:w-1/2">
                <img className="hidden lg:block" src="404.jpg" alt="" />
                <img className="hidden md:block lg:hidden" src="/404.jpg" alt="" />
                <img className="md:hidden" src="404.jpg" alt="" />
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">Looks like you&apos;ve found the doorway to the great nothing</h1>
                <p className="py-4 text-base text-gray-800">The content you&apos;re looking for doesn&apos;t exist. Either it was removed, or you mistyped the link.</p>
                <p className="py-2 text-base text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                <p className="py-6">
                    <Link href="/" className="w-full lg:w-auto leading-4 my-4 focus:ring-offset-2 border rounded-md px-1 sm:px-16 py-5 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">Go back to Homepage</Link>
                </p>
            </div>
        </div>
    );
};

export default Error;
