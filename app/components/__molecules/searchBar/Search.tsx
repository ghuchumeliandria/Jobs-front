import Image from 'next/image'
import React from 'react'

export default function Search() {
    return (
        <div className="w-full max-w-[1032px] mx-auto mt-[105px]  bg-transparent h-[70px] py-2 rounded-full border-[1px] pl-8 pr-2 flex items-center border-[#a155b9]">

            <form className='w-full flex justify-between' >
                <div className="flex gap-2  items-center">
                    <label htmlFor="search">
                        <Image src="https://myjobs.ge/images/work_outline_purple.svg" alt='bag' width={25} height={20} />
                    </label>
                    <input type="text" name='search' id='search' placeholder='ძებნა' className='outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 ' />
                </div>
                <div className="flex gap-2  items-center pl-3 border-l-[1px]  border-[#e5e7eb]">
                    <label htmlFor="search">
                        <Image src="https://myjobs.ge/images/workspaces.svg" alt='bag' width={25} height={20} />
                    </label>
                    <input type="text" name='search' id='search' placeholder='კატეგორია' className='outline-none cursor-pointer text-[14px] w-full max-w-[240px] ' />
                </div>
                <div className="flex gap-2  items-center border-l-[1px]  pl-3 border-[#e5e7eb]">
                    <label htmlFor="search">
                        <Image src="https://myjobs.ge/images/place.svg" alt='bag' width={25} height={20} />
                    </label>
                    <input type="text" name='search' id='search' placeholder='მდებარეობა' className='outline-none cursor-pointer text-[14px] w-full max-w-[240px] pr-4 ' />
                </div>
                <div className="flex items-center gap-2">
                    <button type='button' className='p-[9px] bg-[#eeeeee] rounded-full cursor-pointer'><Image src="https://myjobs.ge/images/tune.svg" alt='search' width={22} height={22} /></button>
                    <button type='submit' className='p-4 bg-[#a155b9] rounded-full cursor-pointer'><Image src="https://myjobs.ge/images/search.svg" alt='search' width={18} height={18} /></button>
                </div>
            </form>

        </div>
    )
}
