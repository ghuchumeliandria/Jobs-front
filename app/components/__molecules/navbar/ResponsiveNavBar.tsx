"use client"
import XSvg from '@/app/assets/svgs/XSvg';
import React, { useEffect, useState } from 'react'
import NavBarBtn from '../../__atoms/NavBarBtn/NavBarBtn';
import Link from 'next/link';
import Image from 'next/image';
import House from '../../../assets/images/house_2163350.png'
import RespHeaderProfite from '../../__atoms/headerProfile/RespHeaderProfite';
import { deleteCookie, getCookie } from 'cookies-next';
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany';
import Logout from '../../../assets/images/logout.png'

import { Company, User } from '@/app/types/types';
type Props = {
    setShowNavBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResponsiveNavBar({ setShowNavBar }: Props) {
    const [user, setUser] = useState<Company | User>()
    const token = getCookie("token")
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    useEffect(() => {
        if (token) {
            getCurrentUserOrCompany({ token, setUser })
        }
    }, [])



    return (
        <div className="fixed inset-0 bg-white  bg-opacity-80 flex flex-col pt-[60px] z-[9999]  pl-8 pr-4.5 overflow-y-scroll ">
            <button
                className="absolute cursor-pointer top-13 right-4 text-white text-2xl w-10 h-10 flex justify-center items-center rounded-full bg-[#a255b961] hover:bg-white hover:border-[1px] border-[#A155B9] transition-all duration-100"
                onClick={() => setShowNavBar(false)}
            >
                <XSvg />
            </button>
            <h1 className='mb-[30px] text-[#A155B9] text-[13px] font-semibold'>მენიუ</h1>
            <ul className="flex flex-col  text-white text-2xl border-b-[1px] border-[#e5e7eb] pb-8">
                <NavBarBtn text="ვაკანსიები" link='/vacancies' />
                <NavBarBtn text="კომპანიები" link='/vacancies' />
                <NavBarBtn text="ჩვენს შესახებ" link='/vacancies' />
                <NavBarBtn text="შეტყობინებები" link='/vacancies' />
                <NavBarBtn text="შენახული ვაკანსიები" link='/vacancies' />
                <NavBarBtn text="გაგზავნილი" link='/vacancies' />
            </ul>

            <div className="flex flex-col gap-2 mt-5">
                <ul>
                    <NavBarBtn text="ხშირად დასმული კითხვები" link='ravi' />
                    <NavBarBtn text="შეფასება" link='/ravi' />
                </ul>
                <h1>599 91 90 49</h1>
                <Link className='hover:text-[#A155B9]'
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=andriaghurchumelia4@gmail.com"
                    target="_blank">
                    andriaghurchumelia4@gmail.com</Link>
            </div>

            <div className="w-full mt-[200px] flex items-center gap-3 border-t-[1px] border-[#e5e7eb] pt-4">

                <Image src={House} alt='house' width={40} height={40} />
                <Link href="https://www.google.com/maps/place/Andria's+Bukhari/@41.7749021,44.7994434,17z/data=!3m1!4b1!4m6!3m5!1s0x40446d832ba5680b:0xf809f41f90df6f61!8m2!3d41.7749021!4d44.8020183!16s%2Fg%2F11vbr225sx?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" target='_blank'>
                    <h1 className='text-[#A155B9] hover:text-purple-800 font-semibold font-stretch-50%'>Andria'S Bukhari</h1>
                </Link>

            </div>
            <div className="pb-5">

                {user ?
                    <div className="">
                        <RespHeaderProfite user={user} />
                        <button className='cursor-pointer mt-10 flex gap-3 items-center text-[14px] hover:text-purple-800 ' onClick={() => { deleteCookie('token'), window.location.reload() }}><Image src={Logout} alt='logout' width={40} height={40} /> გამოსვლა</button>
                    </div>
                    :
                    <div className="flex justify-center mt-[100px]">

                        <Link href="/sign-in"><button className='flex cursor-pointer px-10 py-2 bg-transparent border-[1px] border-[#0000006a] font-semibold hover:bg-[#00000017] rounded-[10px] text-[15px]   '>შესვლა</button></Link>


                    </div>
                }
            </div>

        </div>
    )
}
