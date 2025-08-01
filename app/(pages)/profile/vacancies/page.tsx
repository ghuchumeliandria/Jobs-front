"use client"

import { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useGetCurrentUserOrCompany } from '@/app/lib/getCurrentUserOrCompany'
import { useCompanyStore } from '@/app/zoostand/zoostand'
import { Company, User } from '@/app/types/types'
import Image from 'next/image'
import Money from '../../../assets/images/money_5409901.png'
import Link from 'next/link'
import Header from '@/app/components/__organisms/header/Header'
import LoadingOverlay from '@/app/components/__atoms/loading/LOadingOverlay'

export default function Page() {
    const [user, setUser] = useState<Company | User | null>(null)
    const { getCurrentUserOrCompany } = useGetCurrentUserOrCompany()
    const company = useCompanyStore((state) => state.company)
    console.log(company)
    useEffect(() => {
        const token = getCookie('token')
        if (token) {
            getCurrentUserOrCompany({ token, setUser })
        }
    }, [])

    if (!company) return <LoadingOverlay />

    return (
        <div>
            <Header />
            <h1 className='text-[32px] font-semibold mt-23 mb-5 text-center'>ვაკანსიები</h1>
            <div className="w-full max-w-[1200px] mx-auto border rounded-[10px] border-[#e5e7eb]">

                {company.vacansies.map((el, index) => (

                    <div key={index} className={`w-full flex flex-col  gap-3   hover:bg-[#f3c1f320] hover:border-l-[4px] hover:border-l-[#8b4b8b]   mx-auto  p-5 border-b max-[639px]:max-w-full  border-[#e5e7eb] `} >

                        <div className="">
                            {el.company.avatar ?
                                <Image src={el.company.avatar} alt='company-profile' width={40} height={30} />
                                : null}

                        </div>
                        <div className="flex w-full justify-between ">

                            <div className="">
                                <h2 className="font-medium text-[16px]">{el.company.fullName}</h2>
                                <h1 className="font-bold text-[20px]">{el.name}</h1>

                                <h1 className="flex items-center mt-2 gap-1 text-[13px] text-[#909090]"><Image src={'https://myjobs.ge/images/secondaryPlace.svg'} alt="location" width={20} height={20} />{el.location}</h1>
                            </div>

                            <div className=" flex flex-col justify-between items-end">
                                <h3 className="text-[13px] text-[#909090]">{el.createdAt.split('T')[0]}</h3>
                                {el?.sallery &&
                                    <h1 className='text-[14px] flex items-center gap-2'><Image src={Money} alt='money' width={20} height={20} className='' />
                                        {el?.sallery}$  - {el?.sallery + 200}$<span className='text-gray-500 text-[13px]'>/თვეში</span> </h1>
                                }
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-5">
                            <h1 className='text=[#909090] text-[20px]'>{el.resumes.length} რეზიუმე</h1>
                            <div className="">

                                <Link href={`/profile/vacancies/${el._id}/resumes`} className='p-4 rounded-[10px] bg-[#a155b9]  font-semibold text-white'>ყველა რეზიუმის ნახვა</Link>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
