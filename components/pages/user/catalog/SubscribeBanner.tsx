const SubscribeBanner = () => {
    return (
        <div className="bg-white px-8">
            <section className="w-full m-auto px-12 bg-orange-500">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 my-10 lg:grid-cols-2">
                        <div className="text-center text-white my-auto mx-4">
                        <h1 className="font-GT-Pressura-Regular font-bold text-3xl">WANT <span className="main-txt">DISCOUNT</span>?</h1>
                        <h2 className="font-GT-Pressura-Regular text-xl">Join our mail list for news & coupons</h2>
                        </div>
                        <div className="py-2 mx-4 lg:py-10">
                        <div className="rounded-full bg-white shadow flex w-full">
                            <input
                            type="text"
                            placeholder="Enter your email to join our mailing list"
                            className="w-full rounded-tl-full rounded-bl-full py-2 px-4" />
                            <button className="main-bg rounded-tr-full rounded-br-full hover:bg-blue-700 py-2 px-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SubscribeBanner;