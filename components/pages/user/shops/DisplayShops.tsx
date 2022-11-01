import {useState} from 'react'
import { useAppDispatch } from '../../../../libs/store';
import GetShops from './GetShops';

const DisplayShops = () => {
    const [activeStatus, setActiveStatus] = useState<number>(1);
    

    return (
        <div className="bg-white">            
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">You can also view products based on shops</h2>               
                <div className="xl:w-full xl:mx-0 h-12 hidden sm:block bg-white my-5">
                    <ul className="flex">
                        <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "text-sm border-orange-500 pt-3 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 cursor-pointer"}>
                            <div className="flex items-center mb-3">
                                <span className="ml-1 font-normal">Most Recommended shops</span>
                            </div>
                            {activeStatus == 1 && <div className="w-full h-1 bg-orange-600" />}
                        </li>
                        <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "text-sm border-orange-500 pt-3 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 cursor-pointer"}>
                            <div className="flex items-center mb-3">
                                <span className="ml-1 font-normal">Top Rated Shops</span>
                            </div>
                            {activeStatus == 2 && <div className="w-full h-1 bg-orange-600" />}
                        </li>
                        <li onClick={() => setActiveStatus(4)} className={activeStatus == 4 ? "text-sm border-orange-500 pt-3 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 cursor-pointer"}>
                            <div className="flex items-center mb-3">
                                <span className="ml-1 font-normal">Based on Location</span>
                            </div>
                            {activeStatus == 4 && <div className="w-full h-1 bg-orange-600" />}
                        </li>
                    </ul>
                  
                </div>
                {
                    activeStatus === 1 ? (<GetShops />) : <></>
                
                }
            </div>
        </div>
    )
}


export default DisplayShops;