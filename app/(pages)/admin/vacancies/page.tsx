"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Vacancy } from '@/app/types/types'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Email from '../../../assets/images/email_3624711.png'

import { useState } from 'react'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
export default function page() {
    const [loading, setLoading] = useState(true)
    const [vacancies, setVacancies] = useState<Vacancy[]>([])
    const token = getCookie("token")
    const getVacancies = async () => {
        const resp = await axiosInstance.get("admin/vacancies", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (resp.status === 200) {
            setVacancies(resp.data)
            console.log(resp.data)
            setLoading(false)
        }
    }

    useEffect(() => {
        getVacancies()
    }, [])

    if (loading) return <LoadingOverlay />

    return (
        <div className="">

            <AdminHeader />
            <div className="mt-20 w-full max-w-[1440px] px-[100px] mx-auto py-5">
                <div className="flex flex-col gap-5 items-center">
                    {vacancies ? vacancies.map((el: Vacancy, index) => (
                        <div className="w-[50%]  p-5 rounded-2xl border-[1px] border-[#e5e7eb] shadow-2xl shadow-[#A155B9] max-[639px]:max-w-full max-[639px]:rounded-xl" key={index}>
                            <div className="flex gap-3 items-center">
                                <div className=" w-full flex items-center justify-between">

                                    <div className="flex gap-3">
                                        {el.company.avatar ?
                                            <Image src={el.company.avatar} alt='company-profile' width={30} height={30} />
                                            : null}
                                        <Link href={`/admin/vacancies/${el._id}`}>
                                            <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.name}</h1>
                                        </Link>

                                    </div>
                                    {el.status === "pending" ?
                                        <div className={`px-3 py-2 rounded-2xl bg-amber-400 text-white font-bold`}>{el.status}</div>
                                        :
                                        <div className={`px-3 py-2 text-white font-bold rounded-2xl ${el.status === "rejected" ? "bg-red-500" : 'bg-green-500'} `}>{el.status}</div>
                                    }

                                </div>
                            </div>
                            <div className="mt-1 flex flex-col gap-2">
                                <p className='text-gray-500 text-[13px] text-base leading-relaxed max-w-prose line-clamp-3 '>{el.description}</p>
                                <p className='flex gap-2 text-[13px] mt-2'><Image src='https://myjobs.ge/images/people.svg' alt='people' width={20} height={20} />დასაქმებული</p>
                                <p className='flex gap-2 text-[13px]'> <Image src={Email} alt='email' width={18} height={18} />{el.company.email}</p>
                            </div>
                        </div>
                    )) : <h1>კომპანიები არ არის</h1>}
                </div>
            </div>
        </div>

    )
}
