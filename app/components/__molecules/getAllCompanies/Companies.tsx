"use client"
import { GetCompanies } from '@/app/api/getCompanies.api'
import { Company } from '@/app/types/types'
import Image from 'next/image'
import Email from '../../../assets/images/email_3624711.png'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import LoadingOverlay from '../../__atoms/loading/LOadingOverlay'

export default function Companies() {

    function getRandomItems<Companies>(arr: Companies[], num: number) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, num)
    }

    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetCompanies() as Company[];
            if (data) {
                const randomCompanies = getRandomItems(data, 4)
                setCompanies(randomCompanies)
            }
            setLoading(false)

        }
        fetchData()
    }, [])

    console.log(companies)

    if (loading) return <LoadingOverlay />
    return (

        <div className='w-full flex flex-wrap  gap-4  '>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className='w-full flex flex-wrap  gap-4 '
            >

                {companies ? companies.map((el: Company, index) => (
                    <div className="w-full max-w-[295px] p-5 rounded-2xl border-[1px] border-[#e5e7eb] shadow-2xl shadow-[#A155B9]" key={index}>
                        <div className="flex gap-3 items-center">
                            {el.avatar ?
                                <Image src={el.avatar} alt='company-profile' width={30} height={30} />
                                : null}
                            <div className="">
                                <h1 className='text-[17px] font-semibold hover:text-[#A155B9] cursor-pointer'>{el.fullName}</h1>

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
            </motion.div>
        </div>


    )

}
