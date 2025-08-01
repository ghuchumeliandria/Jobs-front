"use client"
import { axiosInstance } from '@/app/lib/axios-instance'
import { Vacancy } from '@/app/types/types'
import { motion } from 'framer-motion'
import Email from '../../../assets/images/email_3624711.png'
import Money from '../../../assets/images/money_5409901.png'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import LoadingOverlay from '../../__atoms/loading/LOadingOverlay'
import Link from 'next/link'

export default function Vacancies() {

    const [vacancies, setVacancies] = useState<Vacancy[]>([])
    const [loading, setLoading] = useState(true)
    function getRandomItems<Vacancy>(arr: Vacancy[], num: number) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axiosInstance.get("vacancies", {})

                if (resp.status === 200) {
                    const randomData = getRandomItems(resp.data, 4) as Vacancy[]
                    setVacancies(randomData)

                    setLoading(false)
                }
            } catch (error) {
                console.log("error in fetching")
            }
        }
        fetchData()
    }, [])

    if (loading) return <LoadingOverlay />

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className=''
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {vacancies && vacancies.length > 0 ? vacancies.map((el: Vacancy, index) => (
                    <div className="w-full flex flex-col justify-between max-w-[295px] min-h-[253px] p-5 rounded-2xl border max-[639px]:max-w-full max-[639px]:rounded-xl border-[#e5e7eb] shadow-2xl shadow-[#A155B9]" key={index}>
                        <div className="">

                            <div className="flex gap-3 items-center">
                                {el.company.avatar ?
                                    <Image src={el.company.avatar} alt='company-profile' width={30} height={30} />
                                    : null}
                                <div className="">
                                    <Link href={`/vacancies/${el._id}`}>
                                        <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.name}</h1>
                                    </Link>
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
                                <Image src={Money} alt='cash-icon' width={20} height={20} />
                                    {el.sallery}$
                            </p>
                        </div>
                    </div>
                )) : (
                    <h1>ვაკანსიები არ არის</h1>
                )}
            </div>
        </motion.div>
    )
}
