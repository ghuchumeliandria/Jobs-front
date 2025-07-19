"use client"
import { GetCompanies } from '@/app/api/getCompanies.api'
import { Company } from '@/app/types/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Companies() {

    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetCompanies()
            if (data) setCompanies(data)
            setLoading(false)

        }
        fetchData()
    }, [])
    console.log(companies)
    if (loading) return <div className="absolute top-0 left-0 bottom-0 right-0 bg-black"><h1 className='text-white'>...Loading</h1></div>
    return (
        <div className='w-full flex flex-wrap  gap-4  '>
            {companies ? companies.map((el: Company, index) => (
                <div className="w-full max-w-[295px] p-5 rounded-2xl border-[1px] border-[#e5e7eb]" key={index}>
                    <div className="">
                        {el.avatar ?
                            <Image src={el.avatar} alt='company-profile' width={30} height={30} />
                            : null}
                    </div>
                </div>
            )) : <h1>ვაკანსიები არ არის</h1>}
        </div>
    )
}
