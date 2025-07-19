"use client"
import LogoSvg from '@/app/assets/svgs/LogoSvg'
import React, { useState } from 'react'
import NavBar from '../../__molecules/navbar/NavBar'
import Link from 'next/link'
import PlusSvg from '@/app/assets/svgs/PlusSvg'
import BurgerSvg from '@/app/assets/svgs/BurgerSvg'
import ResponsiveNavBar from '../../__molecules/navbar/ResponsiveNavBar'

export default function Header() {

    const [showNavBar, setShowNavBar] = useState(false)

    return (
            <div className="max-w-[1440px] px-[100px] mx-auto flex z-20 justify-between items-center max-[1058px]:px-[70px] max-[900px]:px-5 max-[450px]:px-3 transition-all duration-300 ">
                <div className="flex gap-10 items-center">
                    <LogoSvg />
                    <NavBar />
                </div>

                <div className="flex gap-2 items-center">
                    <div onClick={() => setShowNavBar(true)} className="hidden max-[768px]:flex cursor-pointer w-[2rem] h-[2rem]  justify-center items-center"><BurgerSvg /></div>
                    <Link href="#"><button className='flex cursor-pointer px-4 py-2.5 bg-[#A155B919] font-semibold hover:bg-[#A155B935] rounded-[14px] items-center gap-2 text-[13px] text-[#A155B9] max-[1058px]:hidden '><PlusSvg />ვაკანსიის დამატება</button></Link>
                    <Link href="/sign-in"><button className='flex cursor-pointer px-5 py-2 bg-transparent border-[1px] border-[#0000006a] font-semibold hover:bg-[#00000017] rounded-[10px] text-[15px]  '>შესვლა</button></Link>
                </div>
                {showNavBar &&
                    <ResponsiveNavBar setShowNavBar={setShowNavBar} />
                }
            </div>
    )
}