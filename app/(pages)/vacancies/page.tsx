"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { Vacancy } from '@/app/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Email from '../../assets/images/email_3624711.png'
import Header from '@/app/components/__organisms/header/Header'


export default function page() {

    const [loading, setLoading] = useState(true)
    const [vacancies, setVacancies] = useState<Vacancy[]>([])
    useEffect(() => {
        const getVacancies = async () => {
            try {
                const resp = await axiosInstance.get("vacancies", {})

                if (resp.status === 200) {
                    setVacancies(resp.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log("error in fetching")
            }
        }
        getVacancies()
    }, [])

    return (
        <div className="">
            <Header />
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='mt-23 max-w-[1440px] w-full mx-auto px-[100px] max-[1300px]:px-[50px] max-[850px]:px-5'
            >
                <h1 className='text-[32px] font-semibold pb-3'>ყველა ვაკანსია</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                    {vacancies && vacancies.length > 0 ? vacancies.map((el: Vacancy, index) => (
                        <div className="w-full flex flex-col justify-between max-w-[295px] min-h-[253px] p-5 rounded-2xl border max-[639px]:max-w-full max-[639px]:rounded-xl border-[#e5e7eb] shadow-2xl shadow-[#A155B9]" key={index}>
                            <div className="">

                                <div className="flex gap-3 items-center">
                                    {el.company.avatar ?
                                        <Image src={el.company.avatar} alt='company-profile' width={30} height={30} />
                                        : null}
                                    <div className="">
                                        <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.company.fullName}</h1>
                                        <p className='text-[13px] text-violet-400'>{el.location}</p>
                                    </div>

                                </div>
                                <p className='text-gray-500 text-[13px] leading-relaxed max-w-prose line-clamp-3'>{el.description}</p>

                            </div>

                            <div className="mt-1 flex flex-col gap-2">
                                <p className='flex gap-2 text-[13px] mt-2'>
                                    <Image src='https://myjobs.ge/images/people.svg' alt='people' width={20} height={20} />
                                    {el.company.fullName}
                                </p>
                                <p className='flex gap-2 text-[13px]'>
                                    <Image src={Email} alt='email' width={18} height={18} />
                                    {el.company.email}
                                </p>
                                <p className='text-[#222220] flex gap-2 text-[13px]'>
                                    <Image src='https://myjobs.ge/images/cases.svg' alt='vacancy-icon' width={20} height={20} />
                                    ვაკანსია
                                </p>
                            </div>
                        </div>
                    )) : (
                        <h1>ვაკანსიები არ არის</h1>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
