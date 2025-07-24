"use client"
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'
import AdminHeader from '@/app/components/__molecules/adminheader/AdminHeader'
import { axiosInstance } from '@/app/lib/axios-instance'
import { Company } from '@/app/types/types'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import Email from '../../../assets/images/email_3624711.png'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {
    const router = useRouter()
    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getCompanies()
    }, [])

    const token = getCookie("token")

    const getCompanies = async () => {
        try {

            const resp = await axiosInstance.get("/admin/companies", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

            if (resp.status === 200) {
                setCompanies(resp.data)
                setLoading(false)

            }
            if (resp.status === 401) {
                router.push('/')
            }
        } catch (error) {
            if (error instanceof AxiosError && error.status === 401) {
                router.push('/')
            }
        }
    }
    if (loading) return <LoadingOverlay />

    console.log(companies)
    return (
        <div>
            <AdminHeader />
            <div className="mt-20 w-full max-w-[1440px] px-[100px] mx-auto py-5">

                <div className="flex flex-col gap-5 items-center">
                    {companies ? companies.map((el: Company, index) => (
                        <div className="w-[50%]  p-5 rounded-2xl border-[1px] border-[#e5e7eb] shadow-2xl shadow-[#A155B9] max-[639px]:max-w-full max-[639px]:rounded-xl" key={index}>
                            <div className="flex gap-3 items-center">
                                <div className=" w-full flex items-center justify-between">

                                    <div className="flex gap-3">
                                        {el.avatar ?
                                            <Image src={el.avatar} alt='company-profile' width={30} height={30} />
                                            : null}
                                        <Link href={`/admin/companies/${el._id}`}>
                                            <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.fullName}</h1>
                                        </Link>

                                    </div>
                                    {el.status === "pending" ?
                                        <div className={`px-5 py-4 rounded-2xl bg-amber-400 text-white font-bold`}>{el.status}</div>
                                        :
                                        <div className={`px-5 py-4 text-white font-bold rounded-2xl ${el.status === "rejected" ? "bg-red-500" : 'bg-green-500'} `}>{el.status}</div>
                                    }

                                </div>
                            </div>
                            <div className="mt-1 flex flex-col gap-2">
                                <p className='text-gray-500 text-[13px] text-base leading-relaxed max-w-prose line-clamp-3 '>{el.description}</p>
                                <p className='flex gap-2 text-[13px] mt-2'><Image src='https://myjobs.ge/images/people.svg' alt='people' width={20} height={20} />დასაქმებული</p>
                                <p className='flex gap-2 text-[13px]'> <Image src={Email} alt='email' width={18} height={18} />{el.email}</p>
                                <p className='text-[#222220] flex gap-2 text-[13px] ' > <Image src='https://myjobs.ge/images/cases.svg' alt='vacancy-icon' width={20} height={20} />{el.vacansies?.length || 0} ვაკანსია</p>
                            </div>
                        </div>
                    )) : <h1>კომპანიები არ არის</h1>}
                </div>

                {/* {companies.map((el) => (
                    <div className="" key={el._id}>

                        <Link href={`/admin/companies/${el._id}`}>
                            {el.role}
                        </Link>
                    </div>
                ))} */}
            </div>
        </div>
    )
}
