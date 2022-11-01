import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { AuthSelector, GetShopsFromApi } from "../../../../libs/store/Auth";
import { useEffect } from 'react';

const GetShops = () => {
    const { shops } = useAppSelector(AuthSelector);
    let treding: number = 0;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const gettingShops = async () => {
            await dispatch(GetShopsFromApi(true));
        }
        gettingShops().catch(error => console.log("Error while fetching shops"))
    }, []);

    const displayShops = () => {
        return shops.map((shop, index) => {
            return (
                treding <= 4 ? (
                    
                    <div className="group relative mr-8">
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                            <img src="https://i.imgur.com/wbc5iNE.jpg" alt="Front of men&#039;s Basic Tee in black." className="h-full w-full  object-center lg:h-full lg:w-full"/>
                        </div>
                        <div className="mt-4 flex justify-between">
                        <div>
                            <h3 className="text-lg text-gray-700">
                            <a href="#">
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {`${shop.firstName} ${shop.lastName}`}
                            </a>
                            </h3>
                            <p className="mt-1 text-md text-gray-500">Malawi</p>
                        </div>
                        </div>
                    </div>
                ) : <></>
            )
        })
    }

    return (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {
                
                displayShops()
            }
        </div>
    )
}

export default GetShops;