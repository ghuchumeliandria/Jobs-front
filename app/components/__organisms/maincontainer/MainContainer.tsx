import React from 'react'
import Header from '../header/Header'
import Search from '../../__molecules/searchBar/Search'
import Daviti from '../../../assets/images/BTNDAVITI_pixian_ai.png'
import Image from 'next/image'
import PlaySvg from '@/app/assets/svgs/PlaySvg'
import Link from 'next/link'
import office from '../../../assets/images/office-building_4300059.png'
import Companies from '../getAllCompanies/Companies'
export default function MainContainer() {
    return (
        <div className='w-full'>
            <div className="w-full fixed shadow-[0_2px_10px_rgba(0,0,0,0.08)] top-0 bg-white py-5  z-30 "><Header /></div>
            <div className="w-full max-w-[1440px] pt-20 z-20 min-h-[200vh] px-[100px] mx-auto  max-[1058px]:px-[70px] max-[900px]:px-5 max-[450px]:px-3 transition-all duration-300 ">
                <Search />

                <div className="w-full px-16 py-9 flex flex-col gap-[82px] rounded-2xl relative mt-[100px] z-10" style={{
                    background: "linear-gradient(270deg, rgb(52, 111, 206) 0%, rgb(161, 85, 185) 100%)",
                }} >
                    <h1 className='text-[32px] text-white font-bold'>გამოსცადე ახალი შესაძლებლობები</h1>
                    <div className="flex gap-4">
                        <Link href={'/sign-up'}>
                            <button className='px-6 py-3 bg-white cursor-pointer rounded-full font-semibold '>ანგარიშის შექმნა</button>
                        </Link>

                        <button className='px-5 py-2 border-[2px] border-white text-white font-semibold rounded-full  h-full flex gap-2 '>ინსტრუქცია <PlaySvg /></button>
                    </div>
                    <Image src={Daviti} alt="daviti" width={220} height={140} className='absolute right-[120px] bottom-0  ' />
                </div>


                <div className="mt-28">
                    <h1 className='text-[28px] mb-[30px] text-black font-semibold flex gap-3 items-center '><Image src={office} alt='office' width={40} height={40} />კომპანიები</h1>
                    <Companies />
                </div>
            </div>
        </div>
    )
}
